import { create } from 'zustand';

interface RentIndividualModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentIndividualModal = create<RentIndividualModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentIndividualModal;
