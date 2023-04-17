import Banner from "@/components/banner";
import Footer from "@/components/footer";
import MoreInfo from "@/components/moreInfo";
import MovieList from "@/components/movieList";
import Navbar from "@/components/navbar";
import NotificationView from "@/components/notification";
import ShowCard from "@/components/showCard";
import useFetchfavorites from "@/ownhooks/useFetchfavorites";
import useFetchmovies from "@/ownhooks/useFetchmovies";
import useInfoStore from "@/ownhooks/useInfoStore";
import useNavstore from "@/ownhooks/useNavstore";
import useRandomOne from "@/ownhooks/useRandomOne";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { HiArrowLeft } from "react-icons/hi";
type Props = {
  user: { name: string; email: string; image: string };
};
export async function getServerSideProps(context: NextPageContext) {
  const session: any = await getSession(context);
  const user = session?.user;
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
export default function Home({ user }: Props) {
  const { data: randomOne } = useRandomOne();
  const { data: movies = [] } = useFetchmovies();
  const { data: favorites } = useFetchfavorites();
  const { isOpen, closeModal } = useInfoStore();
  const { id, isCheck, closePort } = useNavstore();

  if (id === "movies" && isCheck) {
    return (
      <main className="flex min-h-screen text-white flex-col relative overflow-x-hidden">
        <Head>
          <title>{id}</title>
        </Head>
        <MoreInfo visible={isOpen} onClose={closeModal} />
        <nav className="p-4 fixed flex bg-[rgb(255,255,255,0.1)] shadow-md w-full items-center z-10">
          <button onClick={() => closePort()} className="flex">
            <HiArrowLeft size={30} className="text-white cursor-pointer" />
            <h1 className="text-white text-xl lg:3xl font-light flex">back</h1>
          </button>
        </nav>
        <div className="pb-20 mt-20 px-5 lg:px-10">
          <h1 className="w-full text-lg lg:text-3xl text-white capitalize border-b-2 border-white/10 pb-2">
            {id}
          </h1>
          <ShowCard data={movies} />
        </div>
        <div className="p-0 hidden">
          <NotificationView />
        </div>
      </main>
    );
  }
  if (id === "favorites" && isCheck) {
    return (
      <main className="flex min-h-screen text-white flex-col relative overflow-x-hidden">
        <Head>
          <title>{id}</title>
        </Head>
        <MoreInfo visible={isOpen} onClose={closeModal} />
        <nav className="p-4 fixed flex bg-[rgb(255,255,255,0.1)] shadow-md w-full items-center z-10">
          <button onClick={() => closePort()} className="flex">
            <HiArrowLeft size={30} className="text-white cursor-pointer" />
            <h1 className="text-white text-xl lg:3xl font-light flex">back</h1>
          </button>
        </nav>
        <div className="pb-20 mt-20 px-5 lg:px-10">
          <h1 className="w-full text-lg lg:text-3xl text-white capitalize border-b-2 border-white/10 pb-2">
            {id}
          </h1>
          <ShowCard data={favorites} />
        </div>
        <div className="p-0 hidden">
          <NotificationView />
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen text-white flex-col relative overflow-hidden">
      <Head>
        <title>{"netflix-clone"}</title>
      </Head>
      <MoreInfo visible={isOpen} onClose={closeModal} />
      <Navbar user={user} />
      <Banner data={randomOne} />
      <div className="pb-20 mt-12 lg:mt-4">
        <MovieList title={"Trending Now"} data={movies} />
        <MovieList title={"Your Favorites"} data={favorites} />
      </div>
      <div>
        <NotificationView />
      </div>
      <Footer />
    </main>
  );
}
