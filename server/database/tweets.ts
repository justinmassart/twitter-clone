import { prisma } from ".";
import { Prisma } from "@prisma/client";

export const createTweet = (tweetData: Prisma.TweetCreateInput) => {
  return prisma.tweet.create({
    data: tweetData,
    include: {
      author: true,
    },
  });
};

export const getTweets = (params: {} = {}) => {
  return prisma.tweet.findMany({
    ...params,
  });
};

export const getTweetById = (tweetId: string, params: any = {}) => {
  return prisma.tweet.findUnique({
    ...params,
    where: {
      ...params.where,
      id: tweetId,
    },
  });
};
