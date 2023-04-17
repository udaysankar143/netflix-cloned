import { create } from "zustand";

export interface ModalNavInterface {
  id: string;
  isCheck: boolean;
  openPort: (id: string) => void;
  closePort: () => void;
}

const useNavstore = create<ModalNavInterface>((set) => ({
  id: "",
  isCheck: false,
  openPort: (id: string) => set({ isCheck: true, id }),
  closePort: () => set({ isCheck: false, id: "" }),
}));

export default useNavstore;
