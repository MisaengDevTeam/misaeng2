'use client';

import Heading from '../../Heading';

interface RentModalMapProps {}

const RentModalMap: React.FC<RentModalMapProps> = ({}) => {
  return (
    <div>
      <Heading
        title='방에 대한 주소 및 위치 정보를 알려주세요 (3/6)'
        subtitle='미생은 회원님의 자세한 위치 및 상세 주소 정보는 절대 공개하지 않습니다. 입력하신 위치정보는 대략적인 위치로 지도에 표시됩니다.'
      />
    </div>
  );
};
export default RentModalMap;
