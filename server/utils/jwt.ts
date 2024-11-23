import { RefreshToken, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { H3Event } from "h3";

const generateAccessToken = (user: User) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessToken, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user: User) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtRefreshToken, {
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

export const saveRefreshToken = (
  event: H3Event,
  refreshToken: RefreshToken,
) => {
  setCookie(event, "refresh_token", refreshToken.token, {
    httpOnly: true,
    sameSite: true,
  });
};
