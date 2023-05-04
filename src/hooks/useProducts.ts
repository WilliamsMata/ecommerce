import { GetProducts } from "@/interfaces";
import useSWR, { SWRConfiguration } from "swr";

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config?: SWRConfiguration) => {
  // const { data, error, isLoading } = useSWR<GetProducts[]>(`/api${url}`, fetcher, config);
  const { data, error, isLoading } = useSWR<GetProducts[]>(
    `/api${url}`,
    fetcher,
    config
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
  };
};
