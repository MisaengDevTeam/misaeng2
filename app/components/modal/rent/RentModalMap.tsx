'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import Heading from '../../Heading';
import Map from '../../Map';
import Input from '../../inputs/Input';
import { MouseEvent, useCallback, useState } from 'react';
import Button from '../../Button';
import { capitalizeFirstLetters } from '@/app/lib/addressFormatter';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface RentModalMapProps {
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

// const searchGeocoding = async () => {
//   const modifiedAddress = capitalizeFirstLetters(`${address.street} ${address.city} ${address.state.toUpperCase()} ${address.zip}`)

//   const response = await fetch(`${API.BASE_URL}${API.THRID_API_GEOCODE}${encodeURIComponent(modifiedAddress)}`)
//   if (!response.ok) {
//     throw new Error('An error occurred while fetching the data')
//   }
//   const data = await response.json()

//   setViewport({...viewport, latitude: data.features[0].geometry.coordinates[1], longitude: data.features[0].geometry.coordinates[0]})

//   return data
// }

const RentModalMap: React.FC<RentModalMapProps> = ({
  onChange,
  register,
  errors,
}) => {
  const [coordinate, setCoordinate] = useState<[number, number]>([
    -73.948529, 40.7653643,
  ]);
  const [address, setAddress] = useState<string | null>(null);

  const handleAddress = useCallback(() => {
    // console.log(address);
    if (address) {
      axios
        .post(`/api/geocode`, { address })
        .then((res) => {
          setCoordinate([
            res.data.features[0].geometry.coordinates[0],
            res.data.features[0].geometry.coordinates[1],
          ]);
        })
        .catch((error) => {
          toast.error(`Address error`);
        })
        .finally(() => {});
    }
    return null;
  }, [address]);

  return (
    <div>
      <Heading
        title='방에 대한 주소 및 위치 정보를 알려주세요 (3/6)'
        subtitle='미생은 회원님의 자세한 위치 및 상세 주소 정보는 절대 공개하지 않습니다. 입력하신 위치정보는 대략적인 위치로 지도에 표시됩니다.'
      />
      <div className='w-full h-[360px] flex flex-col mt-2 gap-2'>
        <div className='flex flex-row w-full h-[60px] gap-2'>
          <div className='w-[80%]'>
            <Input
              id={'map'}
              label={'주소를 입력해주세요'}
              register={register}
              errors={errors}
              length={40}
              rentmap
              onChange={(e) =>
                setAddress(
                  encodeURIComponent(
                    capitalizeFirstLetters(e.currentTarget.value)
                  )
                )
              }
            />
          </div>
          <div className='w-[20%] h-[60px]'>
            <Button onClick={() => handleAddress()} label={'검색'} />
          </div>
        </div>
        <div className='flex items-center justify-center h-full bg-neutral-400 rounded-lg'>
          <Map coordinate={coordinate} />
        </div>
      </div>
    </div>
  );
};
export default RentModalMap;
