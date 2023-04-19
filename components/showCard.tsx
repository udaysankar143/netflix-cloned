import { Movie } from "@/global";
import Link from "next/link";
import React from "react";
import { BsPlayCircleFill, BsInfo } from "react-icons/bs";
import FavorButton from "./favorButton";
import useInfoStore from "@/ownhooks/useInfoStore";
import useNoteStore from "@/ownhooks/useNoteStore";

type Props = {
  data: Movie[];
};
type movieProps = {
  movie: Movie;
};
const ShowCard = ({ data }: Props) => {
  return (
    <div className="px-5 lg:px-10 py-5 lg:py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
      {data?.map((movie) => (
        <CardItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default ShowCard;

export const CardItem = ({ movie }: movieProps) => {
  const { openNote } = useNoteStore();
  const { openModal } = useInfoStore();
  return (
    <div className="flex flex-col border-white/10 border-2 border-solid rounded shadow-md">
      <img
        src={movie.thumbnailUrl}
        alt="pic"
        className="h-full w-full rounded-t"
      />
      <div className="flex flex-row items-center gap-2 lg:gap-4 p-2 lg:p-4 rounded-b opacity-80">
        <Link
          onClick={() =>
            openNote({ ...movie, timestamp: new Date().getTime() })
          }
          href={`/playStation/${movie?.id}`}
          className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 rounded-full flex justify-center items-center transition">
          <BsPlayCircleFill className="text-white w-6 h-6 lg:w-10 lg:h-10 hover:text-white/50" />
        </Link>
        <div className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 rounded-full flex justify-center items-center transition">
          <FavorButton movieId={movie?.id} />
        </div>
        <div
          onClick={() => openModal(movie)}
          className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
          <BsInfo className="text-white group-hover/item:text-neutral-300 w-6 lg:w-10" />
        </div>
      </div>
    </div>
  );
};
