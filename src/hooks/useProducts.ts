import useSWR, { SWRConfiguration } from "swr";

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export const useProducts = <T>(url: string, config?: SWRConfiguration) => {
  // const { data, error, isLoading } = useSWR<GetProducts[]>(`/api${url}`, fetcher, config);
  const { data, error, isLoading } = useSWR<T>(`/api${url}`, fetcher, config);

  return {
    data,
    isLoading,
    isError: error,
  };
};
