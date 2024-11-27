import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { getUserById } from "../database/users";
import type { JwtPayload } from "jsonwebtoken";

function isJwtPayload(decoded: string | JwtPayload): decoded is JwtPayload {
  return (decoded as JwtPayload).userId !== undefined;
}

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/auth/user"];

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(<string>event.node.req.url);
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.node.req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }),
    );
  }

  const decoded = decodeAccessToken(token);

  if (!decoded || !isJwtPayload(decoded)) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }),
    );
  }

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);

    if (!user) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "No user found",
        }),
      );
    }

    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
