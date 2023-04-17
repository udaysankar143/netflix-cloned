import useCurrentUser from "@/ownhooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const session: any = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const ProfileView = () => {
  const { data: user } = useCurrentUser();
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(user?.image);
  }, [user]);

  return (
    <div className="relative flex justify-center items-center h-screen w-full">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold drop-shadow-md text-white font-serif self-center">
          Welcome to
        </h1>
        <Image
          src={"/images/netflix_logo.svg"}
          alt="logo"
          height={40}
          width={300}
          className=""
        />
        <Image
          src={url ? url : "/images/user.png"}
          alt="pic"
          height={150}
          width={150}
          loading="lazy"
          className="p-0 rounded-md self-center mt-4 bg-neutral-300"
        />
        <h2 className="p-0 self-center text-neutral-300 mt-2">
          Account:{" "}
          <strong className="p-0 text-blue-700/80"> {user?.email}</strong>
        </h2>
        <Link
          className="px-10 py-3 bg-[rgb(255,255,255,0.5)] rounded-full animate-pulse mt-10 self-center font-bold focus:bg-white hover:animate-none hover:bg-white"
          href={"/"}>
          Continue
        </Link>
      </div>
    </div>
  );
};

export default ProfileView;
