import jwt from "jsonwebtoken";
import { H3Event, setCookie, getCookie } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    throw createError({ statusCode: 401, message: "No token provided." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
    };

    // Generate a new token with a refreshed expiration.
    const newToken = jwt.sign(
      { id: payload.id, username: payload.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION },
    );

    // Set the new token as an HTTP-only cookie.
    setCookie(event, "auth_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return { message: "Token refreshed successfully" };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 401,
      message: "Invalid or expired token.",
    });
  }
});
