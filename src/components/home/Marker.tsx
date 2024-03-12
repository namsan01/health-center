'use client';

import { Marker } from '@/types/Map';
import React, { useEffect } from 'react';

const Marker = ({ map, coordinates, icon }: Marker) => {
  // 컴포넌트 배치시 기본출력 처리
  useEffect(() => {
    //https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html
    let marker: naver.maps.Marker | null = null;
    if (map) {
      // 마커출력
      marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(...coordinates),
        map: map,
        icon: icon,
      });
    }
    // 컴포넌트 제거될때 실행할 cleanup 함수
    return () => {
      marker?.setMap(null);
    };
  }, [map]);
  return null;
};

export default Marker;
