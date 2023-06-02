'use client';

import Heading from '../../Heading';

interface RentModalContactProps {}

const RentModalContact: React.FC<RentModalContactProps> = ({}) => {
  return (
    <div>
      <Heading
        title='선호하시는 연락방식을 입력하여 주세요 (6/6)'
        subtitle='최소한 한 가지 이상의 연락 방식은 입력해 주시기 바랍니다. 원치 않는 연락 방식은 해당 항목은 비워두시기 바랍니다. 다양한 연락방식은 회원님의 리스팅에 대한 접근성을 높여 더 많은 연락을 받으실 수 있습니다.'
      />
    </div>
  );
};
export default RentModalContact;
