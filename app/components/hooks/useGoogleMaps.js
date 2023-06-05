// components/useGoogleMaps.js or hooks/useGoogleMaps.js
import { useEffect, useState } from 'react';

const useGoogleMaps = (apiKey, latitude, longitude) => {
  const [googleMaps, setGoogleMaps] = useState(null);
  const [nearbyStations, setNearbyStations] = useState(null);
  const [linesOneKm, setLinesOneKm] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onScriptLoad = () => {
        setGoogleMaps(window.google.maps);
      };

      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = onScriptLoad;
        window.initMap = onScriptLoad;
        document.body.appendChild(script);
      } else {
        onScriptLoad();
      }
    }
  }, [apiKey]);

  const getNearbySubwayStation = async (latitude, longitude) => {
    if (googleMaps) {
      const rentalUnitLocation = new googleMaps.LatLng(latitude, longitude);

      const service = new googleMaps.places.PlacesService(
        document.createElement('div')
      );
      const request = {
        location: rentalUnitLocation,
        radius: '1000',
        type: ['subway_station'],
      };

      service.nearbySearch(request, async (results, status) => {
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          const stationPromises = results.map(async (station) => {
            const stationLocation = new googleMaps.LatLng(
              station.geometry.location.lat(),
              station.geometry.location.lng()
            );
            const dist = googleMaps.geometry.spherical.computeDistanceBetween(
              rentalUnitLocation,
              stationLocation
            );
            const lines = await getSubwayLines(station.name);
            return {
              name: station.name,
              distance: dist,
              lines,
            };
          });

          const stationsArray = await Promise.all(stationPromises);

          let linesOneKm = [];

          const stationsMap = {};
          stationsArray.forEach((station) => {
            if (stationsMap[station.name]) {
              const existingStation = stationsMap[station.name];
              existingStation.distance =
                (existingStation.distance + station.distance) / 2;
            } else {
              stationsMap[station.name] = station;
            }
            if (station.lines !== undefined) {
              station.lines.forEach((line) => {
                if (!linesOneKm.includes(line)) {
                  linesOneKm.push(line);
                }
              });
            }
          });

          const uniqueStations = Object.values(stationsMap);
          setNearbyStations(uniqueStations);
          setLinesOneKm(linesOneKm);
        } else {
          console.error('Error fetching nearby subway stations:', status);
        }
      });
    }
  };

  return googleMaps;
};

export default useGoogleMaps;
