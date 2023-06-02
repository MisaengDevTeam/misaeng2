'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

interface MapProps {
  coordinate: [number, number];
}

const Map: React.FC<MapProps> = ({ coordinate }) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: coordinate,
      zoom: 13,
    });
  }, [coordinate]);
  return (
    <div className='w-full h-[300px]'>
      <div className='map-container rounded-lg' ref={mapContainer} />
    </div>
  );
};
export default Map;
