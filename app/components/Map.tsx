'use client';

import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapListing } from '@/types/RentTypes';
import axios from 'axios';

interface MarkerObject {
  marker: mapboxgl.Marker;
}
interface MapProps {
  initCoordinate: [number, number];
  showRange?: boolean;
  rentmain?: boolean;
  mapListings?: MapListing;
  hasnavi?: boolean;
  setSafeListings?: (buildingId: string) => void;
}

const MapComponent = memo<MapProps>(function MapComponent({
  initCoordinate,
  showRange,
  rentmain,
  mapListings,
  hasnavi,
  setSafeListings,
}) {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Store the markers here
  const popupsRef = useRef<mapboxgl.Popup[]>([]); // Store the popups here

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        center: initCoordinate,
        zoom: 12,
      });

      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, rentmain ? 'bottom-right' : 'top-right');
    }

    if (showRange && map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        center: initCoordinate,
        zoom: 12,
      });

      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, rentmain ? 'bottom-right' : 'top-right');
      // Add marker
      const customMarker = document.createElement('div');
      customMarker.style.width = '180px';
      customMarker.style.height = '180px';
      customMarker.style.borderRadius = '50%';
      customMarker.style.background = 'rgb(236, 102, 42, 0.7)';

      new Marker(customMarker).setLngLat(initCoordinate).addTo(map.current);

      map.current.flyTo({
        center: initCoordinate,
        essential: true,
        zoom: 13,
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
      const getBuildingData = async (buildingId: string) => {
        try {
          const response = await axios.post(`/api/rentListing/rentListing`, {
            buildingId,
          });
          setSafeListings?.(response.data.recentListings);
        } catch (error) {
        } finally {
        }
      };

      if (mapListings) {
        // Remove all the markers and popups
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        popupsRef.current.forEach((popup) => popup.remove());
        popupsRef.current = [];

        Object.values(mapListings).forEach((building) => {
          // CREATE A MARKER
          const customMarker = new Image();
          customMarker.src = '/assets/icon/bicon_32.png';
          customMarker.style.width = `20px`;
          customMarker.style.height = `20px`;
          customMarker.style.cursor = `pointer`;
          const marker = new mapboxgl.Marker(customMarker)
            .setLngLat(building.coordinate)
            .addTo(map.current);
          markersRef.current.push(marker);

          // CREATE A POPUP
          const alwaysVisiblePopup = new Popup({
            className: 'custom-popup',
            offset: [0, 0],
            closeButton: false,
            closeOnClick: false,
          }).setHTML(
            `${
              building.price.length != 1
                ? `<span>$${Math.round(
                    Math.min(...building.price) / 1000
                  )}k~</span><span>$${Math.round(
                    Math.max(...building.price) / 1000
                  )}k</span>`
                : `<span>$${Math.round(building.price[0] / 1000)}k</span>`
            }`
          );
          alwaysVisiblePopup.setLngLat(building.coordinate).addTo(map.current);
          popupsRef.current.push(alwaysVisiblePopup);

          // CREATE A CLICK TO VIEW BUILDING LISTING
          const getBuilding = async () => {
            map.current.flyTo({
              center: building.coordinate,
              essential: true,
              zoom: 15,
            });
            getBuildingData?.(building.buildingId);
          };
          marker.getElement().addEventListener('click', getBuilding);
          alwaysVisiblePopup
            .getElement()
            .addEventListener('click', getBuilding);
        });
      }
    }
  }, [
    hasnavi,
    initCoordinate,
    mapListings,
    rentmain,
    setSafeListings,
    showRange,
  ]);

  return (
    <div
      className={`w-full  ${rentmain ? 'h-[35vh] sm:h-[90vh]' : 'h-[300px]'}`}
    >
      <div className='map-container rounded-lg' ref={mapContainer} />
    </div>
  );
});

export default MapComponent;
