import { create } from 'zustand';

interface ReportModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReportModal = create<ReportModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReportModal;
