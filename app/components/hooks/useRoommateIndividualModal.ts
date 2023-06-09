import { create } from 'zustand';

interface RoommateIndividualModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRoommateIndividualModal = create<RoommateIndividualModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useRoommateIndividualModal;
