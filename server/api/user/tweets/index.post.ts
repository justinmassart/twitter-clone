import formidable from "formidable";
import { createMediaFile } from "~/server/database/mediaFiles";
import { createTweet } from "~/server/database/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

interface FormType {
  fields: any;
  files: any;
}

interface TweetData {
  text: string;
  author: {
    connect: {
      id: string;
    };
  };
  replyTo?: {
    connect: {
      id: string;
    };
  };
}

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response as FormType;
  const userId = event.context?.auth?.user?.id;

  const tweetData: TweetData = {
    text: fields.text[0],
    author: {
      connect: {
        id: userId,
      },
    },
  };

  const replyTo = fields.replyTo;

  if (replyTo && replyTo !== "null") {
    let replyToId;

    if (Array.isArray(replyTo)) {
      replyToId = replyTo[0];
    } else if (typeof replyTo === "object") {
      replyToId = replyTo.id;
    } else {
      replyToId = replyTo;
    }

    tweetData.replyTo = {
      connect: {
        id: replyToId,
      },
    };
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key];

    let filepath;
    if (Array.isArray(file)) {
      filepath = file[0]?.filepath;
    } else {
      filepath = file.filepath;
    }

    const cloudinaryResource = await uploadToCloudinary(filepath);

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      user: {
        connect: {
          id: userId,
        },
      },
      tweet: {
        connect: {
          id: tweet.id,
        },
      },
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
