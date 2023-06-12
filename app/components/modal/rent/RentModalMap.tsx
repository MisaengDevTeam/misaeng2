'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import Heading from '../../Heading';
import Map from '../../Map';
import Input from '../../inputs/Input';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import Button from '../../Button';
import { capitalizeFirstLetters } from '@/app/lib/addressFormatter';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import getDistanceBetweenCoordinates from '@/app/lib/distanceCoordinates';

declare const window: any;

interface Station {
  name: string;
  distance: number;
  lines?: string[];
}

interface RentModalMapProps {
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  bid: string;
  coordinate: [number, number];
}

const RentModalMap: React.FC<RentModalMapProps> = ({
  onChange,
  register,
  errors,
  bid,
  coordinate,
}) => {
  const [googleMaps, setGoogleMaps] = useState<any>(null);
  const [initCoordinate, setInitCoordinate] = useState<[number, number]>([
    -74.0085514, 40.7127543,
  ]);
  const [address, setAddress] = useState<string | null>(null);
  const [isGood, setIsGood] = useState<boolean>(false);

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
  }, [address, bid, googleMaps]);

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
    if (address) {
      axios
        .post(`/api/geocode`, { address })
        .then((res) => {
          const newCoordinate: [number, number] = [
            res.data.mapResult.features[0].geometry.coordinates[0],
            res.data.mapResult.features[0].geometry.coordinates[1],
          ];
          const newBid = res.data.newBuilding.id;

          setInitCoordinate(newCoordinate);
          onChange('coordinate', newCoordinate);
          onChange('bid', newBid);
          setIsGood(true);

          return { newCoordinate, newBid };
        })
        .then(({ newCoordinate, newBid }) => {
          googlePlace(newCoordinate[1], newCoordinate[0], newBid);
        })
        .catch((error) => {
          toast.error(`Address error`);
        })
        .finally(() => {
          setIsGood(false);
        });
    }

    return null;
  }, [address, googlePlace, onChange]);

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
              label={'도로명 주소'}
              register={register}
              errors={errors}
              length={40}
              rentmap
              onEnter={(e) => {
                if (e.key === 'Enter') {
                  handleAddress();
                }
              }}
              onChange={(e) => {
                setAddress(
                  encodeURIComponent(
                    capitalizeFirstLetters(e.currentTarget.value)
                  )
                );
              }}
            />
          </div>
          <div className='w-[20%] h-[60px]'>
            <Button onClick={() => handleAddress()} label={'검색'} />
          </div>
        </div>
        <div className='flex items-center justify-center h-full bg-neutral-400 rounded-lg'>
          <Map initCoordinate={initCoordinate} showRange />
        </div>
      </div>
    </div>
  );
};
export default RentModalMap;
