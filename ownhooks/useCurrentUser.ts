import fetcher from "@/utils/fetcher";
import useSwr from "swr";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr(
    "/api/currentUser",
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
