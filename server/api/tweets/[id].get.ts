import { getTweetById } from "~/server/database/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as Record<string, string>;

  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          author: true,
          mediaFiles: true,
          replyTo: {
            include: {
              author: true,
            },
          },
          replies: {
            include: {
              author: true,
              mediaFiles: true,
              replyTo: {
                include: {
                  author: true,
                },
              },
              replies: true,
            },
          },
        },
      },
    },
  });

  return {
    tweet: tweetTransformer(tweet),
  };
});
