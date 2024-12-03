import { removeRefreshToken } from "~/server/database/refreshTokens";
import { deleteSavedCookie } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    const refreshTokenCookie = getCookie(event, "refresh_token");
    if (!refreshTokenCookie) {
      return;
    }
    await removeRefreshToken(refreshTokenCookie);
  } catch (error) {
    console.log(error);
  }

  deleteSavedCookie(event, "refresh_token");

  return {
    message: "Done",
  };
});
