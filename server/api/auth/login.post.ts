import { getUserByUsername } from "~/server/database/users";
import bcrypt from "bcrypt";
import { generateTokens, saveRefreshToken } from "~/server/utils/jwt";
import { createRefreshToken } from "~/server/database/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Request body is missing.",
      }),
    );
  }

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

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // FIX: create userTransformer

  saveRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: user,
  };
});
