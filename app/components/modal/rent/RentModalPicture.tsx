'use client';

import Heading from '../../Heading';

interface RentModalPictureProps {}

const RentModalPicture: React.FC<RentModalPictureProps> = ({}) => {
  return (
    <div>
      <Heading
        title='렌트하시는 방의 사진을 보내주세요 (5/6)'
        subtitle='사진은 미생 회원님의 핸드폰으로 찍어주신 사진으로도 충분합니다. 충분한 햇빛 또는 조명에서 가로 방향으로 촬영한 사진을 업로드해주시기 바랍니다.'
      />
    </div>
  );
};
export default RentModalPicture;
