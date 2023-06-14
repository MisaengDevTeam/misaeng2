'use client';

import useBlogIndividualModal from '../hooks/useBlogIndividualModal';
import Modal from './Modal';

interface BlogIndividualModalProps {}

const BlogIndividualModal: React.FC<BlogIndividualModalProps> = ({}) => {
  const blogIndividualModal = useBlogIndividualModal();
  return (
    <Modal
      isOpen={blogIndividualModal.isOpen}
      onClose={blogIndividualModal.onClose}
      title={'f'}
      body={'f'}
      footer={'f'}
    />
  );
};
export default BlogIndividualModal;
