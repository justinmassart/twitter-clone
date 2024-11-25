import type { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { H3Event, setCookie } from "h3";

const generateAccessToken = (user: User) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user: User) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "4h",
  });
};

export const generateTokens = (user: User) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const decodeRefreshToken = (token: string) => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

export const decodeAccessToken = (token: string) => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    return null;
  }
};

export const saveRefreshToken = (event: H3Event, refreshToken: string) => {
  setCookie(event, "refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: true,
  });
};
