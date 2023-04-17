import useSwr from "swr";
import fetcher from "@/utils/fetcher";

const useRandomOne = () => {
  const { data, error, isLoading } = useSwr("/api/randomMovie", fetcher, {
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

export default useRandomOne;
