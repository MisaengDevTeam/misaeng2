import { create } from 'zustand';

interface RentNotiModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentNotiModal = create<RentNotiModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentNotiModal;
