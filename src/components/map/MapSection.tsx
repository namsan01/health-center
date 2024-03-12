import React from 'react';
import Map from './Map';
import { useMap } from '@/hooks/useMap';
import Markers from '../home/Markers';
import { NaverMap } from '@/types/Map';

const MapSection = () => {
  const { initializeMap } = useMap();
  const onLoadMap = (map?: NaverMap) => {
    initializeMap(map);
  };
  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};

export default MapSection;
