import { create } from "zustand";

export interface NoteStoreInterface {
  movie: any;
  isOpen: boolean;
  openNote: (movie: any) => void;
  closeNote: () => void;
}

const useNoteStore = create<NoteStoreInterface>((set) => ({
  movie: undefined,
  isOpen: false,
  openNote: (movie: any) => set({ isOpen: true, movie }),
  closeNote: () => set({ isOpen: false, movie: undefined }),
}));

export default useNoteStore;
