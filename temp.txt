'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Heading from '../../Heading';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface RentModalPictureProps {
  onChange: (value: string[]) => void;
  imageSrc: string[];
}

const RentModalPicture: React.FC<RentModalPictureProps> = ({
  onChange,
  imageSrc,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange([...imageSrc, result.info.secure_url]);
    },
    [imageSrc, onChange]
  );

  return (
    <div>
      <Heading
        title='렌트하시는 방의 사진을 보내주세요 (5/6)'
        subtitle='사진은 미생 회원님의 핸드폰으로 찍어주신 사진으로도 충분합니다. 충분한 햇빛 또는 조명에서 가로 방향으로 촬영한 사진을 업로드해주시기 바랍니다.'
      />
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset='lm12af8x'
        options={{ maxFiles: 10 }}
      >
        {({ open }) => {
          return (
            <div className='mt-4'>
              <div
                onClick={() => !open?.()}
                className={`relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600
              ${imageSrc.length == 0 ? 'block' : 'hidden'}
              `}
              >
                <TbPhotoPlus size={50} />
                <div className='font-semibold text-lg'>Click to upload</div>
              </div>
              <div
                className={`flex flex-row grid grid-cols-4 gap-2 
                ${imageSrc.length == 0 ? 'hidden' : 'block'}`}
              >
                {imageSrc.map((item) => (
                  <div key={item} className=''>
                    <Image
                      alt='Upload'
                      width={120}
                      height={60}
                      style={{ objectFit: 'contain' }}
                      src={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default RentModalPicture;
