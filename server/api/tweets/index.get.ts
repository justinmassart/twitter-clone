import { getTweets } from "~/server/database/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event);

  const prismaQuery: any = {
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true,
          mediaFiles: true,
        },
      },
      replyTo: {
        include: {
          author: true,
          mediaFiles: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };

  if (q) {
    prismaQuery.where = {
      text: {
        contains: q,
        mode: "insensitive",
      },
    };
  }

  const tweets = await getTweets(prismaQuery);

  return {
    tweets: tweets.map(tweetTransformer),
  };
});
