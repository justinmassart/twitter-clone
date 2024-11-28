import { getTweets } from "~/server/database/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const tweets = await getTweets({
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
  });

  return {
    tweets: tweets.map(tweetTransformer),
  };
});
