'use client';

import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

interface MapProps {
  initCoordinate: [number, number];
}

const Map: React.FC<MapProps> = ({ initCoordinate }) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      pitchWithRotate: false,
      center: initCoordinate,
      zoom: 12,
    });

    // Add marker
    const customMarker = document.createElement('div');
    customMarker.style.width = '140px';
    customMarker.style.height = '140px';
    customMarker.style.borderRadius = '50%';
    customMarker.style.background = 'rgb(236, 102, 42, 0.7)';

    map.current &&
      map.current.on('load', () => {
        const popUp = new Popup({ closeButton: false, anchor: 'left' }).setHTML(
          `<div class="popup">You click here: <br/>[${initCoordinate.toString()}]</div>`
        );

        new Marker(customMarker)
          .setLngLat(initCoordinate)
          .setPopup(popUp)
          .addTo(map.current);

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
  }, [initCoordinate]);
  return (
    <div className='w-full h-[300px]'>
      <div className='map-container rounded-lg' ref={mapContainer} />
    </div>
  );
};
export default Map;
