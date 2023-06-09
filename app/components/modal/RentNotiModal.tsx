import useRentNotiModal from '../hooks/useRentNotiModal';
import Modal from './Modal';
import { IoArrowDownCircleSharp } from 'react-icons/io5';

interface RentNotiModalProps {}

const RentNotiModal: React.FC<RentNotiModalProps> = ({}) => {
  const rentNotiModal = useRentNotiModal();

  const bodyContent = (
    <div className='h-[55vh] sm:h-auto overflow-scroll'>
      <div className='flex flex-col text-sm gap-2 font-light'>
        <p className='text-base'>
          회원님께{' '}
          <span className='font-semibold text-[#EC662A]'>더욱 좋은 서비스</span>
          를 제공해드리기 위하여, 아래 내용을 <u>반드시</u> 읽어봐주시기
          바랍니다.
        </p>
        <p className=''>
          1. 미생은{' '}
          <span className='font-semibold text-[#EC662A]'>현재 281개</span>의
          건물에서{' '}
          <span className='font-semibold text-[#EC662A]'>매주 월/목</span>{' '}
          리스팅을 전달받고 있습니다. 리싱 오피스들의 상황에 따라 업데이트
          반영이 다소 늦어질 수 있는 점 양해 부탁드립니다. 언제나 최신 리스팅을
          전달해 드리기 위해 노력하겠습니다!
        </p>
        <div>
          <p>
            2. 뉴욕의 리싱오피스들은 보통 입주 전 <u>최대 1달~1달 반까지</u>{' '}
            방을 홀드해줍니다.
          </p>
          <p className='pl-2'>
            2-1. 입주 날짜 전 2달 이상: <u>사전 조사 시작</u> &rarr; 예산에 맞는
            리스팅 발견 &rarr;{' '}
            <span className='font-semibold text-[#EC662A]'>
              미생에 미리 연락
            </span>{' '}
            후, 꼼꼼한 상담을 통해 최대한 <u>딜레이없이 서류 준비</u> 작업부터
            시작합니다.
          </p>
          <p className='pl-2'>
            2-2. 입주 날짜 전 2달 이내: 입주를 희망하시는 리스팅을 통해{' '}
            <span className='font-semibold text-[#EC662A]'>미생에 연락</span>{' '}
            &rarr; 더욱 <u>빠르고 효율적인 입주 프로세스</u>를 진행합니다.
          </p>
        </div>
        <p>
          3. 학생이신 경우, <u>합격통지서</u> 또는 <u>재학증명서/수강신청서</u>
          를 제출하여 신분을 증명합니다.
        </p>
        <p>
          4. 직장인이신 경우, 연 수입이 기재된 <u>Job offer</u>로 신분 증명이
          가능합니다.
        </p>
        <div>
          <p>5. 보증 회사 및 보증인</p>
          <p className='pl-2'>
            5-1. <u>학생</u> 또는 연수입이 <u>월세의 40배 미만</u>인 경우,{' '}
            <span className='font-semibold text-[#EC662A]'>반드시</span>{' '}
            보증회사 또는 보증인이 있으셔야 합니다. 해당 내용은 영주권 또는
            시민권이 있으신 분들께도 해당하는 내용입니다.
          </p>
          <p className='pl-2'>
            5-2. 보증회사 비용은 입주할 빌딩마다 사용해야 하는 보증회사가
            다르고, 신분 및 신용점수, 연 수입 등 여러 요소에 따라 다르지만{' '}
            <u>한 달 치 월세의 80~110%</u>로 생각하시면 도움이 됩니다.
          </p>
          <p className='pl-2'>
            5-3. 보증인은 입주할 빌딩마다 조건이 다르지만 보통{' '}
            <u>미국에 거주</u>하며 <u>월세의 80배를 연 수입</u>으로 증명할 수
            있어야 합니다.
          </p>
        </div>
      </div>
      <div className='absolute bottom-4 right-4 w-[28px] h-[28px] rounded-full'>
        <IoArrowDownCircleSharp size={28} color='#EC662A rounded-full' />
      </div>
    </div>
  );

  const footerContent = (
    <button
      onClick={rentNotiModal.onClose}
      className='w-full bg-[#EC662A] text-white rounded-lg py-2 hover:shadow-lg'
    >
      알겠습니다!
    </button>
  );
  return (
    <Modal
      isOpen={rentNotiModal.isOpen}
      onClose={rentNotiModal.onClose}
      title={'이런 부분은 알고 계셔야되요!'}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RentNotiModal;
