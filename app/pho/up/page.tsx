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
import Image from 'next/image';
import LoadingScreen from '@/app/components/LoadingScreen';
import useLoginModal from '@/app/components/hooks/useLoginModal';
import { ADDRESS_BOOK } from '@/types/AddressBook';

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
  const unitRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<number>(PHO_UP_STEP.LOCATION);
  const [googleMaps, setGoogleMaps] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [picAddress, setPicAddress] = useState<string | null>(null);
  const [bid, setBid] = useState<string | null>(null);
  const [pictures, setPictures] = useState<File[] | string[]>([]);
  const [savedPictures, setSavedPictures] = useState<string[] | null>(null);
  const [coordinate, setCoordinate] = useState<[number, number]>([
    -73.9917399, 40.748456,
  ]);

  const { data: session } = useSession();
  const currentUser = session?.user;
  const currentUserId = currentUser?.id.toString();

  const loginModal = useLoginModal();

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

  const onCheck = useCallback(async (bid: string, unit: string) => {
    setIsLoading(true);
    axios
      .post(`/api/pholookup`, { bid, unit })
      .then((res) => {
        setSavedPictures(res.data.buildingPic);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
          setIsLoading(false);
          location.reload();
        });
    },
    [bid, imageSrc, reset, unit]
  );

  let bodyContent;

  if (step == 1) {
    bodyContent = (
      <div className='flex flex-col justify-start items-center w-full h-[92vh] gap-4 p-8'>
        <div
          className={`flex flex-row gap-2
        ${savedPictures ? 'hidden' : 'block'}
        `}
        >
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
        <div
          className={`flex gap-4 items-center
        ${savedPictures ? 'hidden' : 'block'}
        `}
        >
          <label htmlFor='pic_up_unit'>Unit #</label>
          <input
            ref={unitRef}
            id='pic_up_unit'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                async () => {
                  if (bid && unit) {
                    onCheck(bid, unit);
                  } else {
                    toast.error(`Address or Unit is empty`);
                  }
                };
              }
            }}
            onChange={(e) =>
              setCustomValue('unit', e.currentTarget.value.toLowerCase())
            }
            className='w-[220px] border border-neutral-300 focus:outline-[#EC662A] py-2 pl-4 rounded-full text-sm'
            placeholder='Unit #'
          />
        </div>

        <div
          className={`w-[300px] h-auto border-dashed border-2 border-[#EC662A] rounded-3xl overflow-hidden
        ${savedPictures ? 'hidden' : 'block'}
        `}
        >
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
          onClick={async () => {
            if (bid && unit) {
              onCheck(bid, unit);
            } else {
              toast.error(`Address or Unit is empty`);
            }
          }}
          className={`flex justify-center rounded-full w-[180px] border mt-2 py-2 text-lg text-white hover:shadow-lg
          ${savedPictures ? 'hidden' : 'block'}
    ${
      isLoading
        ? 'cursor-not-allowed border-neutral-300 bg-neutral-300'
        : 'cursor-pointer border-[#EC662A] bg-[#EC662A]'
    }
    `}
        >
          CHECK
        </button>
        <div
          className={`gap-1
        ${
          savedPictures?.length != 0
            ? 'grid grid-cols-4'
            : 'flex w-full justify-center'
        }
        `}
        >
          {savedPictures?.length != 0 ? (
            savedPictures?.map((item: string) => (
              <Image
                key={savedPictures.indexOf(item)}
                width={60}
                height={45}
                src={item}
                alt={'pic'}
              />
            ))
          ) : (
            <div className='flex flex-col items-center'>
              <div>NO PICTURES YET</div>
              <div>YOU ARE GOOD TO GO</div>
            </div>
          )}
        </div>
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
        <div className='mt-8 h-[20vh] overflow-scroll'>
          <h1 className='w-full text-center text-xl font-bold'>ADDRESS BOOK</h1>
          <table>
            <tr>
              <th>Building Name</th>
              <th>Address</th>
            </tr>
            {Object.entries(ADDRESS_BOOK).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                {value == 'NONE' ? <td></td> : <td>{value}</td>}
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
  if (step == 2) {
    bodyContent = (
      <div className='flex flex-col justify-start items-center w-full h-[92vh] gap-4 p-8'>
        <div className='flex flex-col items-center w-[90vw] max-w-[360px]'>
          <PhoPicUpload
            onChange={(value) => {
              setCustomValue('imageSrc', value);
            }}
            isLoading={isLoading}
            pictures={pictures}
            setPictures={setPictures}
          />
          <button
            onClick={handleSubmit(onSubmit)}
            className={`w-[50%] text-center py-2 my-4 rounded-xl text-white shadow-md border-[2px] transition
            ${
              isLoading
                ? 'cursor-not-allowed border-neutral-300 bg-neutral-300'
                : 'cursor-pointer border-[#EC662A] bg-[#EC662A]'
            }
            `}
          >
            SAVE & SUBMIT
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className='w-full h-[80vh] flex flex-col justify-center items-center gap-8'>
        <Image
          onClick={loginModal.onOpen}
          width={120}
          height={90}
          src={'/assets/images/logo/logo_square.png'}
          alt={'logo'}
        />
        <div className='text-4xl font-bold'>404 Error</div>
        <div className='text-lg'>No page available</div>
        <div></div>
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
