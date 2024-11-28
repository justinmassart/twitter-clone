import { prisma } from ".";
import { Prisma } from "@prisma/client";

export const createMediaFile = (mediaFile: Prisma.MediaFileCreateInput) => {
  return prisma.mediaFile.create({
    data: mediaFile,
  });
};
