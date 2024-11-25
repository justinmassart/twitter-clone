import useFetchApi from "./useFetchApi";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string | null;
}

export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");

  const setToken = (newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: User) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const login = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch<{
          user: User;
          access_token: string;
        }>("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });
        if (!data) {
          throw createError({
            statusCode: 400,
            statusMessage: "Login request returned nothing.",
          });
        }
        setToken(data.access_token);
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch<{
          access_token: string;
        }>("/api/auth/refresh");

        if (!data) {
          throw createError({
            statusCode: 400,
            statusMessage: "Refresh request didn’t return any data.",
          });
        }
        setToken(data.access_token);
        resolve(true);
      } catch (error) {}
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi<{
          user: {
            id: string;
            name: string;
            email: string;
            username: string;
            avatar: string | null;
          };
        }>("/api/auth/user");

        if (!data) {
          throw createError({
            statusCode: 400,
            statusMessage: "Refresh request didn’t return any data.",
          });
        }
        setUser(data.user);
        resolve(true);
      } catch (error) {}
    });
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken();
        await getUser();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    login,
    useAuthToken,
    useAuthUser,
    initAuth,
  };
};
