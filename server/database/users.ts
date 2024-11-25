import { prisma } from ".";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export const createUser = (userData: Prisma.UserCreateInput) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return prisma.user.create({
    data: finalUserData,
    omit: {
      id: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
