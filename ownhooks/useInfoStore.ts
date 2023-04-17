import { create } from "zustand";

export interface ModalStoreInterface {
  movie: any;
  isOpen: boolean;
  openModal: (movie: any) => void;
  closeModal: () => void;
}

const useInfoStore = create<ModalStoreInterface>((set) => ({
  movie: undefined,
  isOpen: false,
  openModal: (movie: any) => set({ isOpen: true, movie }),
  closeModal: () => set({ isOpen: false, movie: undefined }),
}));

export default useInfoStore;
