import Image from 'next/image';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface ImagePrewvieProps {
  preview: any;
  index: any;
  moveImage: any;
}

const ImagePreview: React.FC<ImagePrewvieProps> = ({
  preview,
  index,
  moveImage,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'image',
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      className='cursor-grab border-[1px] border-neutral-300 flex justify-center'
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Image src={preview} width={124} height={60} alt={'preview'} />
    </div>
  );
};

export default ImagePreview;
