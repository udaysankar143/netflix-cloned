import fetcher from "@/utils/fetcher";
import useSwr from "swr";

const useFetchfavorites = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/favorites", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useFetchfavorites;
