import { prisma } from ".";
import { Prisma } from "@prisma/client";

export const createTweet = (tweetData: Prisma.TweetCreateInput) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};

export const getTweets = (params: {} = {}) => {
  return prisma.tweet.findMany({
    ...params,
  });
};
