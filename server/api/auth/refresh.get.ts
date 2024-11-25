import { getRefreshTokenByToken } from "~/server/database/refreshTokens";
import { getUserById } from "~/server/database/users";
import { decodeRefreshToken, generateTokens } from "~/server/utils/jwt";
import { getCookie } from "h3";

interface TokenPayload {
  userId: string;
}

function isTokenPayload(token: any): token is TokenPayload {
  return (token as TokenPayload).userId !== undefined;
}

export default defineEventHandler(async (event) => {
  const refreshTokenCookie = getCookie(event, "refresh_token");

  if (!refreshTokenCookie) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      }),
    );
  }

  const rToken = await getRefreshTokenByToken(refreshTokenCookie);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "The refresh token is invalid.",
      }),
    );
  }

  const token = decodeRefreshToken(refreshTokenCookie);

  if (!token || !isTokenPayload(token)) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "The refresh token is expired or invalid.",
      }),
    );
  }

  try {
    const user = await getUserById(token.userId);

    if (!user) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          statusMessage: "No user found.",
        }),
      );
    }

    const { accessToken } = generateTokens(user);

    return {
      access_token: accessToken,
    };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something when wrong...",
      }),
    );
  }
});
