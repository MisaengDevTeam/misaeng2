'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
  body: React.ReactElement | string;
  footer: React.ReactElement | string;
  disabled?: boolean;
  actionLabel?: string;
  actionFunc?: () => void;
  loadingScreen?: React.ReactElement | string;
  separator?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
  separator,
  loadingScreen,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
  }, [disabled]);

  if (!isOpen) return null;

  return (
    <div className='fixed flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
      <div className='relative w-[90vw] md:w-3/6 lg:w-2/6 xl:2-2/5 my-6 mx-auto h:auto'>
        {/* MODAL CONTENT */}
        <div
          className={`translate duration-300 h-full 
        ${showModal ? `translate-y-0` : `translate-y-full`}
        ${showModal ? `opacity-100` : `opacity-0`}`}
        >
          <div className='relative flex flex-col w-full bg-white outline-none focus:outline-none translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg'>
            {/* HEADER */}
            <div className='relative flex justify-center items-center p-2 md:p-6 rounded-t-lg border-b'>
              <div className='text-lg font-semibold'>{title}</div>
              <button onClick={onClose} className='absolute right-6'>
                <IoMdClose size={24} />
              </button>
            </div>
            {/* BODY */}
            <div className='relative py-2 px-6 flex-auto'>{body}</div>
            {separator && (
              <div className='px-6'>
                <hr />
              </div>
            )}
            {/* FOOTER */}
            <div className='flex flex-col gap-4 px-6 pt-2 pb-4 md:p-6'>
              {footer}
            </div>
          </div>
        </div>
        {disabled && loadingScreen}
      </div>
    </div>
  );
};
export default Modal;
