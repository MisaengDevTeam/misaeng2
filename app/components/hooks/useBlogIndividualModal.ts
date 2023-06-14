import { create } from 'zustand';

interface BlogIndividualModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBlogIndividualModal = create<BlogIndividualModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBlogIndividualModal;
