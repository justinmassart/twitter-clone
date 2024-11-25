import useAuth from "./useAuth";

interface FetchOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

export default async function useFetchApi<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { useAuthToken } = useAuth();

  const response = await $fetch<T>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  });

  return response as T;
}
