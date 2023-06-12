import { create } from 'zustand';

interface BuySellIndividualModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBuySellIndividualModal = create<BuySellIndividualModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useBuySellIndividualModal;
