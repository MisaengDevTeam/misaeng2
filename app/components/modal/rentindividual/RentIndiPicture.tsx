'use client';

import Slider from 'react-slick';
import Image from 'next/image';

interface RentIndiPictureProps {
  pictures: string[];
}

const RentIndiPicture: React.FC<RentIndiPictureProps> = ({ pictures }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
  };
  return (
    <div className='mb-10'>
      <Slider {...sliderSettings}>
        {pictures.map((image) => (
          <div
            className='aspect-[4/3] relative w-full bg-[url("/assets/images/logo/logo_square.png")] bg-no-repeat bg-center border-[1px] border-[#EC662A] '
            key={image}
          >
            {image && (
              <Image
                src={image}
                fill
                className='object-contain fill h-full w-full'
                alt='rent_image'
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default RentIndiPicture;
