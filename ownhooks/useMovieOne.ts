import fetcher from "@/utils/fetcher";
import useSwr from "swr";

const useMovieOne = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/${id}` : null, fetcher, {
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
export default useMovieOne;
