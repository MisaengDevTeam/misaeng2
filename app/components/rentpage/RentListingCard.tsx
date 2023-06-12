import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';

interface RentListingCardProps {
  rentIndividualOpen: () => void;
  list: any;
}

const RentListingCard: React.FC<RentListingCardProps> = ({
  rentIndividualOpen,
  list,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(
    (rentId: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        rentlisting: rentId,
      };

      if (params?.get('rentlisting') == rentId) {
        delete updatedQuery.category;
      }

      const url = QueryString.stringifyUrl(
        {
          url: '/rent/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  return (
    <div
      onClick={() => {
        rentIndividualOpen();
        handleClick((list as any)._id);
      }}
      key={list.imageSrc[0]}
      className='p-1 rounded-lg border-[1px] border-neutral-300 cursor-pointer group hover:border-[#EC662A]'
    >
      <div className='w-full relative overflow-hidden rounded-lg'>
        <div className='relative '>
          <Image
            src={
              list.imageSrc[0] != ''
                ? list.imageSrc[0]
                : '/assets/images/logo/logo_square.png'
            }
            width={0}
            height={0}
            sizes='100%'
            className='aspect-square h-auto rounded-lg object-cover w-full group-hover:scale-110 transition'
            alt='thumbnail'
          />
        </div>
      </div>
      <div className='flex flex-col px-2 mt-1 gap-0'>
        <div className='flex flex-row justify-between'>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            {list.category}
          </div>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            $ {list.price.toLocaleString()}
          </div>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            {list.bedCount}
          </div>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            {list.bathCount}
          </div>
        </div>
        <div className='text-[12px] md:text-sm xl:text-[14px] text-end'>
          입주 가능일: {list.moveDate}
        </div>
      </div>
    </div>
  );
};
export default RentListingCard;
