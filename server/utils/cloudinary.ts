import { v2 as _cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

const cloudinary = () => {
  const config = useRuntimeConfig();

  _cloudinary.config({
    cloud_name: config.cldCloudName,
    api_key: config.cldApiKey,
    api_secret: config.cldApiSecret,
  });

  return _cloudinary;
};

export const uploadToCloudinary = (
  image: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary()
      .uploader.upload(image, (error: any, data: UploadApiResponse) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
