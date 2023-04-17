import React from "react";
import { FaInstagram } from "react-icons/fa";
import { TbBrandDisney } from "react-icons/tb";
import {
  FcEditImage,
  FcFilmReel,
  FcHome,
  FcLike,
  FcStart,
} from "react-icons/fc";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import {
  SiMongodb,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col items-center mx-auto border-t-2 border-white/20 p-10 w-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-5">
        <div className=" flex flex-col">
          <h1 className="font-bold italic text-lg">Options</h1>
          <span className="options">
            <FcHome />
            <p>Home</p>
          </span>
          <span className="options">
            <FcFilmReel />
            <p>Movies</p>
          </span>
          <span className="options">
            <FcLike />
            <p>Favorites</p>
          </span>
          <span className="options">
            <FcEditImage />
            <p>Languages</p>
          </span>
        </div>
        <div className=" flex-col hidden lg:flex">
          <h1 className="font-bold italic text-lg">Our Dealers</h1>
          <span className="options">
            <TbBrandDisney />
            <p>Disney</p>
          </span>
          <span className="options">
            <p>Picture</p>
          </span>
          <span className="options">
            <p>Marvels</p>
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold italic text-lg">Our Channels</h1>
          <span className="options">
            <FcStart />
            <p>Youtube</p>
          </span>
          <span className="options">
            <BsTwitter className="p-0 text-blue-500" />
            <p>Twitter</p>
          </span>
          <span className="options">
            <BsFacebook className="p-0 text-blue-600" />
            <p>Facebook</p>
          </span>
          <span className="options">
            <FaInstagram className="p-0 text-red-400" />
            <p>Instagram</p>
          </span>
        </div>
      </div>
      <div className="pt-4 items-center gap-3 mr-auto">
        <h1 className="pr-1 italic text-xs lg:text-lg">Designed By using :</h1>
        <div className="flex flex-row gap-3 pt-2">
          <SiNextdotjs size={30} />
          <SiTypescript size={30} />
          <SiVercel size={30} />
          <SiTailwindcss size={30} />
          <SiMongodb size={30} />
          <SiReact size={30} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
