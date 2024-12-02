import type {
  TransformedTweet,
  TweetResponse,
  TweetsResponse,
} from "~/shared/types";
import useFetchApi from "./useFetchApi";

export default () => {
  const postTweet = (formData: {
    text: string;
    mediaFiles: [];
    replyTo?: string;
  }): Promise<{
    tweet: TransformedTweet;
  }> => {
    const form = new FormData();

    form.append("text", formData.text);

    if (formData.replyTo) {
      form.append("replyTo", formData.replyTo);
    }

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append("media_file_" + index, mediaFile);
    });

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    });
  };

  const getHomeTweets = (): Promise<TweetsResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi("/api/tweets", {
          method: "GET",
        });
        resolve(response as TweetsResponse);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getTweetById = (tweetId: string): Promise<TweetResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`, {
          method: "GET",
        });
        resolve(response as TweetResponse);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    postTweet,
    getHomeTweets,
    getTweetById,
  };
};
