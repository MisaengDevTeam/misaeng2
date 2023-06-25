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
  rentindividual?: boolean;
  blogindividual?: boolean;
  mypage?: boolean;
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
  rentindividual,
  blogindividual,
  mypage,
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
    <div className='fixed flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-900/70'>
      <div
        className={`relative mx-auto h:auto w-[90vw]
        ${
          blogindividual
            ? 'md:w-4/6 lg:w-3/6 xl:w-3/6 my-6'
            : 'md:w-3/6 lg:w-2/6 xl:2-2/5 my-6'
        }`}
      >
        {/* MODAL CONTENT */}
        <div
          className={`translate duration-300 
          ${rentindividual ? 'h-[80vh] sm:h-[85vh]' : 'h-full'}
        ${showModal ? `translate-y-0` : `translate-y-full`}
        ${showModal ? `opacity-100` : `opacity-0`}`}
        >
          <div className='relative flex flex-col w-full bg-white outline-none focus:outline-none translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg'>
            {/* HEADER */}
            <div
              className={`relative flex items-center rounded-t-lg border-b h-[5%] sm:h-auto truncate
            ${
              rentindividual
                ? 'justify-start p-5 md:p-4 '
                : 'justify-center p-2 md:p-6 '
            }
            `}
            >
              <div
                className={`text-lg font-semibold truncate
              ${
                rentindividual
                  ? 'w-[85%] pl-1 text-start'
                  : 'w-full text-center'
              }
              `}
              >
                {title}
              </div>
              <button onClick={onClose} className='absolute right-6'>
                <IoMdClose size={24} />
              </button>
            </div>
            {/* BODY */}
            <div
              className={`relative flex-auto 
              ${blogindividual ? 'sm:px-8 h-[65%]' : 'sm:px-6 h-[70%]'}
              ${rentindividual ? 'py-2 px-2' : 'p-4 sm:p-6'}
            `}
            >
              {body}
            </div>
            {separator && (
              <div className='px-6'>
                <hr />
              </div>
            )}
            {/* FOOTER */}
            {!mypage && (
              <div
                className={`flex flex-col gap-4 h-[15%] 
            ${
              rentindividual
                ? 'mb-2 px-1 sm:mb-2 sm:px-2'
                : 'mb-4 px-4 sm:px-6 sm:mb-6'
            }
            ${blogindividual ? 'sm:px-8' : 'sm:px-0'}
            `}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
        {disabled && <div className='h-50'>loadingScreen</div>}
      </div>
    </div>
  );
};
export default Modal;
