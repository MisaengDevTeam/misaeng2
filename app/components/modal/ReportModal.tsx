'use client';

import { useRef, useState } from 'react';
import { reportReason } from '@/types/ReportTypes';
import useReportModal from '../hooks/useReportModal';
import SelectComp from '../inputs/SelectComp';
import Textarea from '../inputs/Textarea';
import Modal from './Modal';
import emailjs from '@emailjs/browser';

interface ReportModalProps {}

const ReportModal: React.FC<ReportModalProps> = ({}) => {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reportModal = useReportModal();

  const currentTime = new Date();
  const currentTimeString = currentTime.toString();

  const sendContactEmail = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (form.current !== null) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_REPORT_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
        .then(
          (result) => {
            console.log(result.text);
            setSent(true);
            // setIsLoading(false);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      console.error('form.current is null');
    }
  };

  const bodyContent = sent ? (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center py-8 gap-4'>
        <div className='w-[85px] h-auto flex flex-col mb-4'>
          <div className='flex flex-row justify-center'>
            <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
            <div className='w-[100%]'></div>
            <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
          </div>
          <div className='w-[100%] h-[42px] border-b-2 border-l-2 border-r-2 border-[#EC662A] rounded-b-full mt-4'></div>
        </div>
        <div className='flex flex-col text-center gap-4'>
          <div>게시글을 신고하였습니다</div>
          <div>
            게시글에 대한 검토 및 조치는
            <br />
            48시간내에 완료됩니다
          </div>
          <div>
            더욱 클린한 미국생활 커뮤니티를
            <br /> 유지하는데 최선을 다하겠습니다
          </div>
          <div>감사합니다 !</div>
        </div>
      </div>
    </div>
  ) : (
    <form
      ref={form}
      onSubmit={sendContactEmail}
      className='flex flex-col gap-4'
    >
      <div className='flex flex-col gap-2'>
        <p className='text-lg font-semibold'>신고 사유</p>
        <SelectComp
          placeholder={'신고 사유'}
          options={reportReason}
          onChange={() => {}}
          name={'report_reason'}
          small
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='report_text' className='text-lg font-semibold'>
          신고내용
        </label>
        <Textarea
          id={'report_text'}
          name={'report_text'}
          onChange={() => {}}
          small
        />
      </div>
      <input
        readOnly
        className='hidden'
        name={'report_listing'}
        value={window.location.href}
      />
      <input
        readOnly
        className='hidden'
        name={'report_time'}
        value={currentTimeString}
      />
      <button
        type='submit'
        disabled={isLoading}
        className={`w-full h-full py-4 text-white rounded-lg text-lg font-semibold hover:shadow-xl
        ${
          isLoading
            ? 'bg-neutral-300 cursor-not-allowed'
            : 'bg-[#EC662A] cursor-pointer'
        }
        `}
      >
        신고하기
      </button>
    </form>
  );

  return (
    <Modal
      isOpen={reportModal.isOpen}
      onClose={reportModal.onClose}
      title={'게시글 신고하기'}
      body={bodyContent}
      footer={''}
    />
  );
};
export default ReportModal;
