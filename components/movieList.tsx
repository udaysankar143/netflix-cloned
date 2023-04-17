/* eslint-disable @next/next/no-img-element */
import { Movie } from "@/global";
import { isEmpty } from "lodash";
import React from "react";
import { BsPlayCircleFill, BsInfo } from "react-icons/bs";
import FavorButton from "./favorButton";
import Link from "next/link";
import useInfoStore from "@/ownhooks/useInfoStore";
import useNavstore from "@/ownhooks/useNavstore";
import useNoteStore from "@/ownhooks/useNoteStore";

type Props = {
  title: string;
  data: Movie[];
};
type movieProps = {
  movie: Movie;
};
const MovieList = ({ data, title }: Props) => {
  const { openPort } = useNavstore();
  if (isEmpty(data)) return null;

  const shortedData = data.slice(0, 4);
  const id = title === "Your Favorites" ? "favorites" : "movies";
  return (
    <div className="px-6 lg:px-12 mt-4 space-y-6">
      <div>
        <div className="flex justify-between items-center">
          <p className="text-white text-lg lg:text-2xl font-bold mb-4 lg:mb-4 hover:underline">
            {title}
          </p>
          <button
            onClick={() => openPort(id)}
            className="text-sm lg:text-base rounded-md p-1 px-2 font-bold hover:text-green-600 hover:font-bold">
            {data?.length > 4 && "Show All"}
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
          {shortedData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

export const MovieCard = ({ movie }: movieProps) => {
  const { openModal } = useInfoStore();
  const { openNote } = useNoteStore();

  return (
    <div className="group bg-zinc-900 relative h-[24vw] md:h-[12vw]">
      <img
        src={movie?.thumbnailUrl}
        alt="thumbnail"
        className="p-0 cursor-pointer rounded-md object-cover transition shadow-md md:h-[12vw] h-[24vw] w-full"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:opacity-100">
        <img
          src={movie?.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="cursor-pointer object-cover transition duration shadow-md rounded-t-md w-full h-[24vw] md:h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-2 lg:gap-4">
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
          <p className="text-green-400 font-semibold mt-4">
            <span>{movie?.title}</span>
          </p>
          <div className="flex flex-row mt-2 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              Duration: {movie?.duration}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-1 text-[10px] text-white lg:text-sm">
            <p>Genre: {movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
