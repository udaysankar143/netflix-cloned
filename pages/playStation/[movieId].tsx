import useMovieOne from "@/ownhooks/useMovieOne";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiArrowLeft } from "react-icons/hi";

const PlayStation = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data: movie, isLoading } = useMovieOne(movieId as string);

  return (
    <div className="h-screen w-screen bg-transparent">
      <nav className="p-4 fixed flex flex-row gap-2 w-full items-center z-10">
        <Link href={"/"}>
          <HiArrowLeft size={30} className="text-white cursor-pointer" />
        </Link>

        <h1 className="text-white text-xl lg:3xl font-light flex">
          Watching:{" "}
          <p className="font-bold px-2">
            {isLoading ? "Loading..." : movie?.title}
          </p>
        </h1>
      </nav>

      <video
        poster={movie?.thumbnailUrl}
        src={movie?.videoUrl}
        autoPlay
        controls
        className="h-full w-full"
      />
    </div>
  );
};

export default PlayStation;
