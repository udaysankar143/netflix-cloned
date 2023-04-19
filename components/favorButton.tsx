import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/ownhooks/useCurrentUser";
import useFetchfavorites from "@/ownhooks/useFetchfavorites";
import { IoMdAdd } from "react-icons/io";
import { TiTick } from "react-icons/ti";
type Props = {
  movieId: string;
};
const FavorButton = ({ movieId }: Props) => {
  const { mutate: mutateFavorites } = useFetchfavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.put("/api/updateFavor", { movieId, currentUser });
    } else {
      response = await axios.post("/api/updateFavor", { movieId, currentUser });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <div className="text-white group-hover/item:text-neutral-300 w-6 lg:w-10">
        {!isFavorite ? (
          <IoMdAdd className="text-white w-6 h-6 lg:w-10 lg:h-10 hover:text-white/50 p-1" />
        ) : (
          <TiTick className="text-green-600 w-6 h-6 lg:w-10 lg:h-10 hover:text-white/50" />
        )}
      </div>
    </div>
  );
};

export default FavorButton;
