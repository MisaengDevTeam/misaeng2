'use Client';

import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';
import Modal from './Modal';

interface RoommateIndividualModalProps {}

const RoommateIndividualModal: React.FC<
  RoommateIndividualModalProps
> = ({}) => {
  const roommateIndividualModal = useRoommateIndividualModal();

  return (
    <Modal
      isOpen={roommateIndividualModal.isOpen}
      onClose={roommateIndividualModal.onClose}
      title={'f'}
      body={'f'}
      footer={'f'}
    />
  );
};
export default RoommateIndividualModal;
