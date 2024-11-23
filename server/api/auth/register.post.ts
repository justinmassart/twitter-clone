export default defineEventHandler(async (event) => {
  const body = getQuery(event);

  const { username, email, password, confirmPassword, name } = body as {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };

  if (!username || !email || !password || !confirmPassword || !name) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: "One or many parameters are missing.",
      }),
    );
  }

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    typeof name !== "string"
  ) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: "One or many parameters have the wrong type.",
      }),
    );
  }

  return {
    body: body,
  };
});
