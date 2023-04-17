import fetcher from "@/utils/fetcher";
import useSwr from "swr";

const useFetchmovies = () => {
  const { data, error, isLoading } = useSwr("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
  };
};
export default useFetchmovies;
