import type { TransformedTweet, TweetsResponse } from "~/shared/types";
import useFetchApi from "./useFetchApi";

export default () => {
  const postTweet = (formData: { text: string; mediaFiles: [] }) => {
    const form = new FormData();

    form.append("text", formData.text);

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

  return {
    postTweet,
    getHomeTweets,
  };
};
