import { Movie } from "@/global";
import useNoteStore from "@/ownhooks/useNoteStore";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {};
type noteProps = {
  note: Movie;
  setNote: (id: string) => void;
};

const NotificationView = (props: Props) => {
  const { movie, closeNote } = useNoteStore();
  const [localNote, setLocalNote] = useState<Movie[]>();

  const setNoteData = (id: string) => {
    const filtered = localNote?.filter((movie) => {
      return movie.id !== id;
    });
    localStorage.setItem("note", JSON.stringify(filtered));
    setLocalNote(JSON.parse(localStorage.getItem("note")!));
  };
  useEffect(() => {
    if (movie) {
      const store = JSON.parse(localStorage.getItem("note") || "[]");
      store.push(movie);
      localStorage.setItem("note", JSON.stringify(store));
      closeNote();
    }
    setLocalNote(JSON.parse(localStorage.getItem("note")!));
  }, [closeNote, movie]);

  return (
    <div className="z-50 fixed w-full bottom-0 right-0 lg:w-[35vw] pb-3">
      <div className="relative flex flex-col bg-transparent m-2 mx-4 lg:mx-6 gap-2">
        {localNote?.map((note, i) => (
          <Note key={i} note={note} setNote={setNoteData} />
        ))}
      </div>
    </div>
  );
};

export default NotificationView;

export const Note = ({ note, setNote }: noteProps) => {
  return (
    <div className="flex flex-row items-center px-5 py-2 bg-neutral-50 w-full rounded-md">
      <img
        src={note?.thumbnailUrl}
        alt="pic"
        className="h-12 w-16 object-cover lg:h-24 lg:w-40"
      />
      <div className="flex flex-col flex-grow pl-2">
        <h1 className="text-base font-semibold italic text-black">
          {"Thanks for watching..."}
        </h1>
        <div className="flex flex-row lg:flex-col items-baseline">
          <h1 className="text-lg text-green-600/80 font-bold pr-3">
            {note?.title}
          </h1>
          <p className="text-xs font-light text-black">
            {moment(note?.timestamp).fromNow()}
          </p>
        </div>
      </div>
      <div
        onClick={() => setNote(note?.id)}
        className="cursor-pointer bg-black/20 p-1 rounded hover:bg-black/50">
        <IoClose size={30} className="text-white w-6" />
      </div>
    </div>
  );
};
