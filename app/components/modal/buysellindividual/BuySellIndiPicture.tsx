'use client';

import Slider from 'react-slick';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BuySellIndiPictureProps {
  pictures: string[];
}

const BuySellIndiPicture: React.FC<BuySellIndiPictureProps> = ({
  pictures,
}) => {
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
                sizes='200'
                className='object-contain fill h-full w-full'
                alt='buysell_image'
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default BuySellIndiPicture;
