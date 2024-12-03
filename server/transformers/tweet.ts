import type { TransformedTweet } from "~/shared/types";
import { mediaFileTransformer } from "./mediaFiles";
import human from "human-time";
import { userTransformer } from "./user";

export const tweetTransformer = (tweet: any): TransformedTweet => {
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: tweet.mediaFiles
      ? tweet.mediaFiles.map(mediaFileTransformer)
      : [],
    author: userTransformer(tweet.author),
    replies: tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    repliesCount: tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: human(tweet.createdAt),
  };
};
