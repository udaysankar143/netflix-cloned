import useNavstore from "@/ownhooks/useNavstore";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";

type Props = {
  user: { name: string; email: string; image: string };
};

const Navbar = ({ user }: Props) => {
  const { openPort } = useNavstore();
  const [selectAccount, setSelectAccount] = useState(true);
  const [showbg, setShowbg] = useState(false);
  const [count, setcount] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 120) {
        setShowbg(true);
      } else {
        setShowbg(false);
      }
    };
    const getcount = JSON.parse(localStorage.getItem("note")!)?.length || 0;
    setcount(getcount);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showbg]);
  return (
    <main
      className={`fixed z-20 flex w-full ${
        !showbg ? "bg-transparent" : "bg-zinc-900"
      }  justify-between p-4 lg:px-10 items-center`}>
      <div className="flex flex-row gap-2 lg:gap-4">
        <Link href={"/"} className="p-0 hover:animate-pulse">
          <Image
            src={"/images/netflix_logo.svg"}
            alt="logo"
            height={40}
            width={100}
            className="h-[40px]"
            priority
          />
        </Link>
        <div className=" flex-row items-center hidden md:flex">
          <button onClick={() => openPort("home")} className="navitem">
            Home
          </button>
          <button onClick={() => openPort("movies")} className="navitem">
            Movies
          </button>
          <button onClick={() => openPort("favorites")} className="navitem">
            Favorites
          </button>
          <button onClick={() => openPort("home")} className="navitem">
            Languages
          </button>
        </div>
        <select
          onChange={(e) => openPort(e.target.value)}
          className="md:hidden bg-transparent outline-none cursor-pointer">
          <option value={"home"} className="text-black">
            Home
          </option>
          <option value={"movies"} className="text-black">
            Movies
          </option>
          <option value={"favorites"} className="text-black">
            Favorites
          </option>
          <option value={"languages"} className="text-black">
            Languages
          </option>
        </select>
      </div>
      <div className="flex flex-row items-center gap-4 text-white">
        <div className="p-[6px] bg-[rgb(255,255,255,0.1)] rounded-full hover:before:content-['Search'] flex flex-row text-sm gap-2 font-bold active:text-white transition cursor-pointer">
          <FaSearch size={20} />
        </div>
        <div className="relative cursor-pointer">
          {count > 0 && (
            <GoPrimitiveDot
              size={20}
              className="absolute text-red-500 -right-3 -top-3 hover:animate-pulse"
            />
          )}
          <FaBell size={20} title="Notifications" />
        </div>
        <div
          onClick={() => setSelectAccount(!selectAccount)}
          className="flex items-center cursor-pointer">
          <Image
            src={user?.image ? user?.image : "/images/user.png"}
            alt="pic"
            height={36}
            width={36}
            className="rounded-xl h-8 w-8 lg:h-10 lg:w-10 bg-white"
          />
          <FaChevronDown
            size={20}
            className={`mx-1 transition h-4 w-4 ${
              selectAccount ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        <div
          className={`absolute transition flex flex-col top-16 right-8 bg-neutral-100/20 p-2 gap-2 ${
            selectAccount ? "hidden" : ""
          } `}>
          <h1 className="font-bold text-xs lg:text-base">Hi!, {user?.name}</h1>
          <h2
            onClick={() => signOut()}
            className="p-0 self-center text-sm lg:text-base font-light hover:underline cursor-pointer">
            SignOut
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
