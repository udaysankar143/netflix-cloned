import { Movie } from "@/global";
import useInfoStore from "@/ownhooks/useInfoStore";
import useNoteStore from "@/ownhooks/useNoteStore";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import { ImInfo } from "react-icons/im";

type Props = {
  data: Movie;
};

const Banner = ({ data }: Props) => {
  const { openModal } = useInfoStore();
  const { openNote } = useNoteStore();
  return (
    <div className="relative h-[50vw] w-full">
      <video
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        className="w-full h-[60vw] md:h-[50vw] object-cover brightness-[60%] transition duration-500"></video>
      <div className="absolute top-[50%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-[rgb(255,255,255,0.8)] text-[10px] md:text-lg mt-3 md:mt-8 w-[90%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3 lg:gap-8">
          <Link
            onClick={() =>
              openNote({ ...data, timestamp: new Date().getTime() })
            }
            href={`/playStation/${data?.id}`}
            className="bg-white rounded text-black  p-2 md:p-4 text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-white/30 transition border-2 border-solid border-[rgb(255,255,255,0.3)]">
            <BsFillPlayFill className="h-4 w-4 lg:h-6 lg:w-6" />
            Play
          </Link>
          <button
            onClick={() => openModal(data)}
            className="bg-white/10 text-white rounded  p-2 md:p-4 text-xs gap-1 lg:text-lg font-semibold flex flex-row items-center hover:bg-white/30 transition border-2 border-solid border-[rgb(255,255,255,0.3)]">
            <ImInfo />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
