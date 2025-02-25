import { prisma } from ".";

export const createRefreshToken = async (refreshToken: {
  token: string;
  userId: string;
}) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  });
};

export const getRefreshTokenByToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const removeRefreshToken = (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token: token,
    },
  });
};
