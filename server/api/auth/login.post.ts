import { getUserByUsername } from "~/server/database/users";
import bcrypt from "bcrypt";
import { generateTokens, saveRefreshToken } from "~/server/utils/jwt";
import { createRefreshToken } from "~/server/database/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = getQuery(event);

  const { username, password } = body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "The username and password are required.",
      }),
    );
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage:
          "We do not have a user with this username in our database.",
      }),
    );
  }

  const passwordsAreMatching = await bcrypt.compare(password, user.password);

  if (!passwordsAreMatching) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "The password doesn’t match the user password.",
      }),
    );
  }

  const { accessToken, refreshToken } = generateTokens(user);

  const token = await createRefreshToken(refreshToken, user);

  saveRefreshToken(event, token);

  const { password: userPassword, id: UserId, ...safeUser } = user;

  return {
    access_token: accessToken,
    user: safeUser,
  };
});
