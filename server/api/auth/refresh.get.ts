import { getRefreshTokenByToken } from "~/server/database/refreshTokens";
import { getUserById } from "~/server/database/users";
import { decodeRefreshToken } from "~/server/utils/jwt";
import useAuth from "~/components/composables/useAuth";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token");
  console.log("Received refresh token:", refreshToken);

  const { useAuthUser } = useAuth();

  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      }),
    );
  }

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "The refresh token is invalid.",
      }),
    );
  }

  const token = decodeRefreshToken(refreshToken);

  if (!token) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "The refresh token is expired.",
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
