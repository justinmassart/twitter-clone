import useFetchApi from "./useFetchApi";
import { jwtDecode } from "jwt-decode";

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
  const useAuthLoading = () => useState("auth_loading", () => true);

  const setToken = (newToken: string | null) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: User | null) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setLoading = (newLoading: boolean) => {
    const authLoading = useAuthLoading();
    authLoading.value = newLoading;
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

  const register = ({
    username,
    email,
    password,
    confirmPassword,
    name,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await $fetch("/api/auth/register", {
          method: "POST",
          body: {
            username,
            email,
            password,
            confirmPassword,
            name,
          },
        });
        if (!user) {
          throw createError({
            statusCode: 400,
            statusMessage: "Register request returned nothing.",
          });
        }
        await login({
          username,
          password,
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi("/api/auth/logout", {
          method: "POST",
        });
        setToken(null);
        setUser(null);
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
      } catch (error) {
        reject(error);
      }
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

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value || typeof authToken.value !== "string") {
      return;
    }

    const decodedToken: {
      exp: number;
      iat: number;
      user: User;
    } = jwtDecode(authToken.value);

    if (!decodedToken) {
      return;
    }

    const newRefreshTime = decodedToken?.exp - 60000;

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        await refreshToken();
        await getUser();
        reRefreshAccessToken();
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  return {
    register,
    login,
    logout,
    useAuthToken,
    useAuthUser,
    useAuthLoading,
    initAuth,
  };
};
