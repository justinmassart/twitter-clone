import type { MediaFile } from "@prisma/client";

export const mediaFileTransformer = (mediaFile: MediaFile) => {
  return {
    url: mediaFile.url,
  };
};
