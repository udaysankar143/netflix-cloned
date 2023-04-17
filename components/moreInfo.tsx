import React, { useCallback, useEffect, useState } from "react";
import FavorButton from "./favorButton";
import { IoClose } from "react-icons/io5";
import useInfoStore from "@/ownhooks/useInfoStore";
import { BsPlayCircleFill } from "react-icons/bs";
import Link from "next/link";

type Props = {
  visible?: boolean;
  onClose: () => void;
};

const MoreInfo = ({ visible, onClose }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { movie: data } = useInfoStore();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center fixed inset-0">
      <div className="relative mx-auto w-[60%] h-[60vh] lg:h-[80vh] rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative w-full flex-auto bg-zinc-900 drop-shadow-md`}>
          <div className="relative w-full">
            <img
              alt=""
              src={data?.thumbnailUrl}
              className="w-full brightness-[60%] object-cover h-[20vh] mx-auto lg:h-[50vh]"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <IoClose className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-5 lg:left-10">
              <p className="text-white text-2xl md:text-4xl h-full lg:text-5xl font-bold mb-2 lg:mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-2 lg:gap-4 items-center">
                <Link
                  href={`/playStation/${data?.id}`}
                  className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 rounded-full flex justify-center items-center transition">
                  <BsPlayCircleFill className="text-white w-6 h-6 lg:w-10 lg:h-10 hover:text-white/50" />
                </Link>
                <FavorButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-12 py-4 lg:py-8 flex flex-col">
            <div className="flex flex-col mb-2 lg:mb-6">
              <p className="text-white text-base lg:text-lg font-light">
                Duration:{" "}
                <strong className="text-green-600/80 font-bold pl-2">
                  {data?.duration}
                </strong>
              </p>
              <p className="text-white text-base lg:text-lg font-light">
                Type:{" "}
                <strong className="text-green-600/80 font-bold pl-2">
                  {data?.genre}
                </strong>
              </p>
            </div>
            <h1 className="text-neutral-200 italic">Description:</h1>
            <p className="text-white text-sm lg:text-lg font-serif">
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
