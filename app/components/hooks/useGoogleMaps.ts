import getDistanceBetweenCoordinates from '@/app/lib/distanceCoordinates';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import prisma from '@/app/lib/prismaDb';

declare const window: any;

interface Station {
  name: string;
  distance: number;
  lines?: string[];
}

const useGoogleMaps = async (
  longitude: number,
  latitude: number,
  bid: string | null,
  address: string | null
) => {
  const [googleMaps, setGoogleMaps] = useState<any>(null);

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
  }, [address, bid]);

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
        const lines = await axios.post(`/api/subway`, { name: station.name });

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
        .post(`/api/building`, { bid, uniqueStations })
        .then((res) => console.log(res));
    }
  });
};

// return rentalUnitLocation;

export default useGoogleMaps;
