'use client';

import axios from 'axios';
import useConfirmModal from '../hooks/useConfirmModal';
import Modal from './Modal';
import { ITypeAndId } from '@/types/MyPageTypes';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

interface ConfirmModalProps {
  typeAndId: ITypeAndId;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ typeAndId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const confirmModal = useConfirmModal();
  const handleDelete = async (typeAndId: ITypeAndId) => {
    setIsLoading(true);
    axios
      .delete(`/api/userListing/userListing/${typeAndId.type}/${typeAndId.id}`)
      .then((res) => {
        toast.success('리스팅이 삭제되었습니다!');
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
        confirmModal.onClose();
        location.reload();
      });
  };
  const bodyContent = (
    <div className='w-full flex flex-row justify-evenly gap-4'>
      <button
        onClick={() => {
          confirmModal.onClose();
        }}
        className='w-full flex justify-center items-center py-2 bg-neutral-200 text-neutral-500 rounded-xl cursor-pointer hover:opacity-80'
      >
        취소
      </button>
      <button
        disabled={isLoading}
        onClick={() => {
          handleDelete(typeAndId);
        }}
        className={`w-full flex justify-center items-center py-2 rounded-xl hover:opacity-80
        ${
          isLoading
            ? ' bg-neutral-500 text-neutral-700 cursor-not-allowed '
            : ' bg-red-200 text-red-700 cursor-pointer'
        }
        `}
      >
        리스팅 삭제
      </button>
    </div>
  );
  return (
    <Modal
      isOpen={confirmModal.isOpen}
      onClose={confirmModal.onClose}
      title={'리스팅을 삭제하시겠습니까?'}
      body={bodyContent}
      footer={''}
      mypage
    />
  );
};
export default ConfirmModal;
