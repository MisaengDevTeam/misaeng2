'use client';

import MapComponent from '@/app/components/Map';
import Stars from '@/app/components/ReviewStars';
import Input from '@/app/components/inputs/Input';
import ReviewCategoryBox from '@/app/components/review/ReviewCategoryBox';
import { capitalizeFirstLetters } from '@/app/lib/addressFormatter';
import getDistanceBetweenCoordinates from '@/app/lib/distanceCoordinates';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { IoSearch } from 'react-icons/io5';

declare const window: any;

interface Station {
  name: string;
  distance: number;
  lines?: string[];
}

enum CREATE_REVIEW_STEP {
  LOCATION = 1,
  REVIEW,
}

const ReviewCreatePage = ({}) => {
  const addressRef = useRef<HTMLInputElement>(null);

  const [googleMaps, setGoogleMaps] = useState<any>(null);
  const [step, setStep] = useState(CREATE_REVIEW_STEP.LOCATION);
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinate, setCoordinate] = useState<[number, number]>([
    -73.9917399, 40.748456,
  ]);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      bid: null,
      buildingRate: 0,
      buildingReview: null,
      safeRate: 0,
      safeReview: null,
      transportationRate: 0,
      transportationReview: null,
      convenienceRate: 0,
      convenienceReview: null,
    },
  });

  const bid = watch('bid');
  const buildingRate = watch('buildingRate');
  const safeRate = watch('safeRate');
  const transportationRate = watch('transportationRate');
  const convenienceRate = watch('convenienceRate');

  const averageValue = useCallback((array: number[]): number => {
    if (array.length === 0) {
      throw new Error('Cannot compute the average of an empty array');
    }
    let sum = 0;
    for (let num of array) {
      sum += num;
    }
    return sum / array.length;
  }, []);

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

  useEffect(() => {
    const checkReview = async () => {
      console.log('check!');
    };
    checkReview();
  }, []);

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

          setCoordinate(newCoordinate);
          setCustomValue('bid', newBid);

          return { newCoordinate, newBid };
        })
        .then(({ newCoordinate, newBid }) => {
          googlePlace(newCoordinate[1], newCoordinate[0], newBid);
        })
        .catch((error) => {
          toast.error(`Address error`);
        })
        .finally(() => {});
    }

    return null;
  }, [googlePlace, setCustomValue]);

  const onBack = useCallback(() => {
    const newStep = step == 1 ? 1 : step - 1;
    setStep(newStep);
  }, [step]);

  const onNext = useCallback(() => {
    console.log(bid);
    const newStep = step == 2 ? 2 : step + 1;
    setStep(newStep);
  }, [bid, step]);

  const bodyContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div className='flex flex-col justify-center items-center w-full h-[92vh] gap-4 p-8'>
            <div className='flex flex-row gap-2'>
              <input
                ref={addressRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddress();
                  }
                }}
                className='w-[250px] h-[40px] border border-blac rounded-full pl-4 text-sm focus:outline-[#EC662A]'
              />
              <button
                onClick={handleAddress}
                className='flex justify-center items-center w-[40px] h-[40px] bg-[#EC662A] rounded-full'
              >
                <IoSearch color='#FFF' />
              </button>
            </div>
            <div className='w-[300px] h-auto border-dashed border-2 border-[#EC662A] rounded-3xl overflow-hidden'>
              <MapComponent initCoordinate={coordinate} showRange />
            </div>
            <div
              onClick={onNext}
              className='flex justify-center rounded-full w-[180px] border border-[#EC662A] mt-2 py-2 bg-[#EC662A] text-lg text-white cursor-pointer hover:shadow-lg'
            >
              NEXT
            </div>
          </div>
        );

      case 2:
        return (
          <div className='flex flex-col justify-center items-center w-full h-[90vh] p-8 sm:mb-6'>
            <div className='flex flex-col items-center w-full max-w-[768px] gap-4'>
              <div className='flex flex-col justify-center items-center'>
                {'회원님의 추천 점수: '}
                {averageValue([
                  parseInt(buildingRate),
                  parseInt(safeRate),
                  parseInt(transportationRate),
                  parseInt(convenienceRate),
                ])}

                <Stars
                  value={averageValue([
                    parseInt(buildingRate),
                    parseInt(safeRate),
                    parseInt(transportationRate),
                    parseInt(convenienceRate),
                  ])}
                />
              </div>
              <div className='flex flex-col w-full justify-evenly'>
                <ReviewCategoryBox
                  title={'건물'}
                  catRate={buildingRate}
                  onChange={(value) => {
                    setCustomValue('buildingRate', value);
                  }}
                />
                <ReviewCategoryBox
                  title={'안전'}
                  catRate={safeRate}
                  onChange={(value) => {
                    setCustomValue('safeRate', value);
                  }}
                />
                <ReviewCategoryBox
                  title={'교통'}
                  catRate={transportationRate}
                  onChange={(value) => {
                    setCustomValue('transportationRate', value);
                  }}
                />
                <ReviewCategoryBox
                  title={'편의'}
                  catRate={convenienceRate}
                  onChange={(value) => {
                    setCustomValue('convenienceRate', value);
                  }}
                />
              </div>
              <div className='flex justify-center rounded-xl w-[180px] border border-[#EC662A] mt-2 py-1 bg-[#EC662A] text-white cursor-pointer hover:shadow-lg font-light'>
                리뷰 저장하기
              </div>
            </div>
          </div>
        );
    }
  }, [
    averageValue,
    buildingRate,
    convenienceRate,
    coordinate,
    handleAddress,
    onNext,
    safeRate,
    setCustomValue,
    step,
    transportationRate,
  ]);

  if (!currentUser)
    return (
      <div className='flex flex-col justify-center items-center w-full h-[50vh]'>
        리뷰작성을 위해 로그인하여 주시기 바랍니다.
      </div>
    );

  return bodyContent;
};
export default ReviewCreatePage;
