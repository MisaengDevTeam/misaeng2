'use client';
import ImagePreview from '../ImagePreview';
import { resizeAdImage } from '@/app/lib/imageResizer';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

interface PhoPicUploadProps {
  pictures: any;
  setPictures: ([]) => void;
  onChange: (value: File[] | string[]) => void;
}

const PhoPicUpload: React.FC<PhoPicUploadProps> = ({
  pictures,
  setPictures,
  onChange,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length < 13) {
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
    [onChange, setPictures]
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
    [previews, pictures, setPictures, onChange]
  );

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <label
          className={`w-full bg-[#EC662A] w-[50%] text-center py-2 my-4 rounded-xl text-white cursor-pointer shadow-md border-[2px] border-[#EC662A] transition 
          ${`hover:bg-white hover:text-[#EC662A]`}`}
          htmlFor='file-input'
        >
          Upload
        </label>
        {/* {pictures.length > 0
          ? `已选择${pictures.length}张照片, 可随意拖动调整照片顺序`
          : `最多可上传12张照片`} */}
        {pictures.length > 0
          ? `${pictures.length} pictures selected, change the order`
          : `Max 12 photos`}
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
        <div className='grid grid-cols-3 gap-2'>
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
    </div>
  );
};
export default PhoPicUpload;
