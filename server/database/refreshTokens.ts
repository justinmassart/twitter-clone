import { User } from "@prisma/client";
import { prisma } from "~/server/database/index";

const deleteUserExistingRefreshTokens = async (user: User) => {
  try {
    const result = await prisma.refreshToken.deleteMany({
      where: {
        userId: user.id,
      },
    });
    console.log(`Deleted ${result.count} refresh tokens for user ${user.id}`);
  } catch (error) {
    console.error(
      `Failed to delete refresh tokens for user ${user.id}:`,
      error,
    );
    throw error;
  }
};

export const createRefreshToken = async (refreshToken: string, user: User) => {
  await deleteUserExistingRefreshTokens(user);

  const finalRefreshToken = {
    token: refreshToken,
    userId: user.id,
  };

  return prisma.refreshToken.create({
    data: finalRefreshToken,
  });
};
