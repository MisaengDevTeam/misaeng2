'use client';

import { resizeAdImage } from '@/app/lib/imageResizer';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import Heading from '../../Heading';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ImagePreview from '../../ImagePreview';

interface BuySellRegiPictureProps {
  onChange: (value: File[] | string[]) => void;
}

const BuySellRegiPicture: React.FC<BuySellRegiPictureProps> = ({
  onChange,
}) => {
  const [pictures, setPictures] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length < 12) {
        const fileList = Array.from(event.target.files);
        setPictures(fileList);

        const newPreviews = await Promise.all(
          fileList.map(async (file) => {
            const reader = new FileReader();
            const resizedFile = await resizeAdImage(file);
            return new Promise<string>((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(resizedFile);
            });
          })
        );
        setPreviews(newPreviews);
        onChange(newPreviews);
      } else {
        setPictures([]);
        setPreviews([]);
      }
    },
    [onChange]
  );

  const moveImage = useCallback(
    async (fromIndex: any, toIndex: any) => {
      const updatedPreviews = [...previews];
      const [removedPreview] = updatedPreviews.splice(fromIndex, 1);
      updatedPreviews.splice(toIndex, 0, removedPreview);

      const updatedPictures = [...pictures];
      const [removedPicture] = updatedPictures.splice(fromIndex, 1);
      updatedPictures.splice(toIndex, 0, removedPicture);

      setPreviews(updatedPreviews);
      setPictures(updatedPictures);
      onChange(updatedPreviews);
    },
    [previews, pictures, onChange]
  );

  return (
    <>
      <div className='flex flex-col items-center'>
        <label
          className={`bg-[#EC662A] w-[50%] text-center py-2 my-4 rounded-xl text-white cursor-pointer shadow-md border-[2px] border-[#EC662A] transition 
          ${`hover:bg-white hover:text-[#EC662A]`}`}
          htmlFor='file-input'
        >
          사진 업로드
        </label>
        {pictures.length > 0
          ? `총 ${pictures.length}개의 사진이 선택되었습니다. 드래그로 사진 순서를 변경하여 주시기 바랍니다. (사진 순서 변경은 모바일로 아직 불가능합니다.)`
          : `최대 12개의 사진까지 업로드가 가능합니다.`}
        <input
          ref={fileRef}
          id='file-input'
          type='file'
          accept='image/*'
          hidden
          multiple
          onChange={handleFileChange}
        />
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className='grid grid-cols-4 gap-2'>
          {previews.map((preview, index) => (
            <ImagePreview
              key={index}
              preview={preview}
              index={index}
              moveImage={moveImage}
            />
          ))}
        </div>
      </DndProvider>
    </>
  );
};
export default BuySellRegiPicture;
