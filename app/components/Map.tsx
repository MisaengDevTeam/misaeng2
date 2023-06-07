'use client';

import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { MapListing } from '@/types/RentTypes';

interface MarkerObject {
  marker: mapboxgl.Marker;
  // popup: mapboxgl.Popup;
}
interface MapProps {
  initCoordinate: [number, number];
  showRange?: boolean;
  rentmain?: boolean;
  mapListings?: MapListing;
  hasnavi?: boolean;
}

const Map: React.FC<MapProps> = ({
  initCoordinate,
  showRange,
  rentmain,
  mapListings,
  hasnavi,
}) => {
  const mapContainer = useRef<any>(null);
  const mapInstance = useRef(null);

  const map = useRef<mapboxgl.Map | any>(null);
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';

  const [markers, setMarkers] = useState<Record<string, MarkerObject>>({});

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      pitchWithRotate: false,
      center: initCoordinate,
      zoom: 12,
    });

    if (showRange) {
      // Add marker
      const customMarker = document.createElement('div');
      customMarker.style.width = '140px';
      customMarker.style.height = '140px';
      customMarker.style.borderRadius = '50%';
      customMarker.style.background = 'rgb(236, 102, 42, 0.7)';

      map.current &&
        map.current.on('load', () => {
          new Marker(customMarker).setLngLat(initCoordinate).addTo(map.current);

          map.current.flyTo({
            center: initCoordinate,
            essential: true,
            zoom: 13,
          });
        });

      // Update the size of the custom marker based on the zoom level
      const updateMarkerSize = () => {
        const zoom = map.current.getZoom();
        const size = 140 * (1 / Math.pow(2, 13.5 - zoom));
        customMarker.style.width = `${size}px`;
        customMarker.style.height = `${size}px`;
      };

      // Set initial marker size
      updateMarkerSize();

      // Add zoom event listener to update marker size on zoom
      map.current.on('zoom', updateMarkerSize);
    }

    if (rentmain) {
      if (mapListings) {
        Object.values(mapListings).forEach((building) => {
          const customMarker = new Image();
          customMarker.src = '/assets/icon/bicon_32.png';
          customMarker.style.width = `20px`;
          customMarker.style.height = `20px`;

          new mapboxgl.Marker(customMarker)
            .setLngLat(building.coordinate) // Set the marker's coordinates
            .addTo(map.current);
        });
      }
    }
  }, [hasnavi, initCoordinate, mapListings, rentmain, showRange]);

  // useEffect(() => {
  //   if (mapInstance.current && initCoordinate.length > 0) {
  //     Object.values(markers).forEach((markerObj) => {
  //       const { marker, popup } = markerObj;

  //       if (
  //         marker.getLngLat().lat === initCoordinate[1] &&
  //         marker.getLngLat().lng === initCoordinate[0]
  //       ) {
  //         marker.getElement().style.width = '32px';
  //         marker.getElement().style.height = '32px';
  //         marker.getElement().style.zIndex = '10000';

  //         // popup.getElement()?.lastChild['style'].backgroundColor = 'white';
  //         // popup.getElement().lastChild['style'].color = '#EC662A';
  //         // popup.getElement().lastChild.lastChild['style'].fontSize = '12px';
  //         // popup.getElement().lastChild['style'].padding = '2px 8px';
  //       } else {
  //         marker.getElement().style.width = '24px';
  //         marker.getElement().style.height = '24px';
  //         marker.getElement().style.zIndex = '0';

  //         // popup.getElement().lastChild['style'].backgroundColor = '#EC662A';
  //         // popup.getElement().lastChild['style'].color = 'white';
  //         // popup.getElement().lastChild.lastChild['style'].fontSize = '10px';
  //         // popup.getElement().lastChild['style'].padding = '';
  //       }
  //     });
  //   }
  // }, [initCoordinate, markers]);
  return (
    <div className={`w-full  ${rentmain ? 'h-[70vh]' : 'h-[300px]'}`}>
      <div className='map-container rounded-lg' ref={mapContainer} />
    </div>
  );
};
export default Map;
