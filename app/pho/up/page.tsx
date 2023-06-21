'use client';

import MapComponent from '@/app/components/Map';
import axios from 'axios';
import toast from 'react-hot-toast';
import getDistanceBetweenCoordinates from '@/app/lib/distanceCoordinates';
import PhoPicUpload from '@/app/components/pho/PhoPicUpload';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import validateInput from '@/app/lib/validateInput';

declare const window: any;

interface Station {
  name: string;
  distance: number;
  lines?: string[];
}

enum PHO_UP_STEP {
  LOCATION = 1,
  REVIEW,
}

interface pageProps {}

const PhoUpPage = ({}) => {
  const addressRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<number>(PHO_UP_STEP.LOCATION);
  const [googleMaps, setGoogleMaps] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [picAddress, setPicAddress] = useState<string | null>(null);
  const [bid, setBid] = useState<string | null>(null);
  const [pictures, setPictures] = useState<File[] | string[]>([]);
  const [coordinate, setCoordinate] = useState<[number, number]>([
    -73.9917399, 40.748456,
  ]);

  const { data: session } = useSession();
  const currentUser = session?.user;
  const currentUserId = currentUser?.id.toString();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      imageSrc: null,
      buildingId: null,
      unit: null,
    },
  });

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const imageSrc = watch('imageSrc');
  const unit = watch('unit');

  useEffect(() => {
    const onScriptLoad = () => {
      setGoogleMaps(window.google.maps);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=initMap`;

      script.async = true;
      script.defer = true;
      script.onload = onScriptLoad;
      window.initMap = onScriptLoad;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    } else {
      onScriptLoad();
    }
  }, [googleMaps]);

  const googlePlace = useCallback(
    (latitude: number, longitude: number, newBid: string) => {
      if (!googleMaps) return;
      const rentalUnitLocation = new googleMaps.LatLng(latitude, longitude);
      var request = {
        location: rentalUnitLocation,
        radius: 1000,
        type: 'subway_station',
      };
      const service = new googleMaps.places.PlacesService(
        document.createElement('div')
      );

      service.nearbySearch(request, async (results: any, status: any) => {
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          const stationPromises = results.map(async (station: any) => {
            const name = station.name;

            const distance = getDistanceBetweenCoordinates(
              station.geometry.location.lat(),
              station.geometry.location.lng(),
              latitude,
              longitude
            );

            let lines;
            try {
              lines = await axios.post(`/api/subway`, { name: station.name });
            } catch (error) {
              console.error(
                `Error fetching subway lines for station ${name}:`,
                error
              );

              return null;
            }

            return {
              name,
              distance,
              lines: lines.data,
            };
          });

          const stationsArray = await Promise.all(stationPromises);

          let linesOneKm: any[] = [];

          const stationsMap: Record<string, Station> = {};
          stationsArray.forEach((station) => {
            if (stationsMap[station.name]) {
              const existingStation = stationsMap[station.name];
              existingStation.distance =
                (existingStation.distance + station.distance) / 2;
            } else {
              stationsMap[station.name] = station;
            }
            if (station.lines !== undefined) {
              station.lines.forEach((line: string) => {
                if (!linesOneKm.includes(line)) {
                  linesOneKm.push(line);
                }
              });
            }
          });

          const uniqueStations = Object.values(stationsMap);

          axios
            .post(`/api/building`, { newBid, uniqueStations })
            .catch((error) => console.log(error));
        }
      });
    },
    [googleMaps]
  );

  const handleAddress = useCallback(async () => {
    setIsLoading(true);
    if (addressRef.current?.value) {
      const address = addressRef.current?.value;
      axios
        .post(`/api/geocode`, { address })
        .then((res) => {
          const newCoordinate: [number, number] = [
            res.data.mapResult.features[0].geometry.coordinates[0],
            res.data.mapResult.features[0].geometry.coordinates[1],
          ];
          const newBid = res.data.newBuilding.id;
          setCustomValue('buildingId', newBid.toString());
          setBid(newBid.toString());
          setCoordinate(newCoordinate);
          setPicAddress(res.data.mapResult.features[0].place_name);
          return { newCoordinate, newBid };
        })
        .then(({ newCoordinate, newBid }) => {
          googlePlace(newCoordinate[1], newCoordinate[0], newBid);
        })
        .catch((error) => {
          toast.error(`Address error`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return null;
  }, [googlePlace, setCustomValue]);

  const onBack = useCallback(() => {
    const newStep = step == 1 ? 1 : step - 1;
    setStep(newStep);
  }, [step]);

  const onNext = useCallback(() => {
    if (step == 1 && validateInput([picAddress, unit])) {
      toast.error('카테고리를 선택해주세요');
      return null;
    }

    const newStep = step == 2 ? 2 : step + 1;
    setStep(newStep);
  }, [picAddress, step, unit]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      const pictureURL: string[] = await Promise.all(
        imageSrc.map(async (pic: string) => {
          const resPic = await fetch(pic);
          const blobPic = await resPic.blob();

          const url = await axios.post(`/api/phoup/${bid}/${unit}`);

          const response = await fetch(url.data.signedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: blobPic,
          });

          const resultPicture = response.url.split('?')[0];

          return resultPicture;
        })
      );

      axios
        .post(`/api/phoupRegister`, { ...data, imageSrc: pictureURL })
        .then((response) => {
          toast.success(`Pictures have been added!`);
          reset();
        })
        .catch((error) => {
          toast.error(`Something went wrong`);
          console.log(error);
        })
        .finally(() => {
          location.reload();
        });
    },
    [bid, imageSrc, reset, unit]
  );

  const bodyContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div className='flex flex-col justify-start items-center w-full h-[92vh] gap-4 p-8'>
            <div className='flex flex-row gap-2'>
              <input
                ref={addressRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddress();
                  }
                }}
                className='w-[250px] h-[40px] border border-neutral-300 rounded-full pl-4 text-sm focus:outline-[#EC662A]'
                placeholder='Street Address'
              />
              <button
                disabled={isLoading}
                onClick={handleAddress}
                className={`flex justify-center items-center w-[40px] h-[40px] rounded-full
          ${
            isLoading
              ? 'cursor-not-allowed bg-neutral-300'
              : 'cursor-pointer bg-[#EC662A]'
          }
          `}
              >
                <IoSearch color='#FFF' />
              </button>
            </div>
            <div className='flex gap-4 items-center'>
              <label htmlFor='pic_up_unit'>Unit #</label>
              <input
                id='pic_up_unit'
                onChange={(e) =>
                  setCustomValue('unit', e.currentTarget.value.toUpperCase())
                }
                className='w-[220px] border border-neutral-300 focus:outline-[#EC662A] py-2 pl-4 rounded-full text-sm'
                placeholder='Unit #'
              />
            </div>

            <div className='w-[300px] h-auto border-dashed border-2 border-[#EC662A] rounded-3xl overflow-hidden'>
              <MapComponent initCoordinate={coordinate} showRange />
            </div>
            {picAddress && (
              <div className='flex flex-col items-center'>
                <div>You are about to pose: </div>
                <div>{`${picAddress}`}</div>
              </div>
            )}
            <button
              disabled={isLoading}
              onClick={() => {
                // if (!bid) {
                //   toast.error('주소를 검색해주세요');
                // } else {
                onNext();
                // }
              }}
              className={`flex justify-center rounded-full w-[180px] border mt-2 py-2 text-lg text-white hover:shadow-lg
        ${
          isLoading
            ? 'cursor-not-allowed border-neutral-300 bg-neutral-300'
            : 'cursor-pointer border-[#EC662A] bg-[#EC662A]'
        }
        `}
            >
              NEXT
            </button>
          </div>
        );
      case 2:
        return (
          <div className='flex flex-col justify-start items-center w-full h-[92vh] gap-4 p-8'>
            <div className='flex flex-col items-center w-[90vw] max-w-[360px]'>
              <PhoPicUpload
                onChange={(value) => {
                  setCustomValue('imageSrc', value);
                }}
                pictures={pictures}
                setPictures={setPictures}
              />
              <button
                onClick={handleSubmit(onSubmit)}
                className='bg-[#EC662A] w-[50%] text-center py-2 my-4 rounded-xl text-white cursor-pointer shadow-md border-[2px] border-[#EC662A] transition'
              >
                SAVE & SUBMIT
              </button>
            </div>
          </div>
        );
    }
  }, [
    coordinate,
    handleAddress,
    handleSubmit,
    isLoading,
    onNext,
    onSubmit,
    picAddress,
    pictures,
    setCustomValue,
    step,
  ]);

  if (!currentUser) {
    return (
      <div className='w-full h-[80vh] flex flex-col justify-center items-center gap-8'>
        <div className='text-4xl font-bold'>404 Error</div>
        <div className='text-lg'>No page available</div>
      </div>
    );
  }
  if (
    currentUserId == process.env.NEXT_PUBLIC_PICTURE_UPLOAD_SIMON ||
    currentUserId == process.env.NEXT_PUBLIC_PICTURE_UPLOAD_RAINIE
  ) {
    return bodyContent;
  }

  return (
    <div className='w-full h-[80vh] flex flex-col justify-center items-center gap-8'>
      <div className='text-4xl font-bold'>404 Error</div>
      <div className='text-lg'>No page available</div>
    </div>
  );
};
export default PhoUpPage;
