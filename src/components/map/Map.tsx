'use client';
import { INITIAL_CENTER, INITIAL_MINZOOM, INITIAL_ZOOM } from '@/hooks/useMap';
import { NaverMap } from '@/types/Map';
import { Coordinates } from '@/types/info';
import Script from 'next/script';
import React, { useEffect, useRef } from 'react';

// 환경변수 사용
const MAP_KEY = process.env.NEXT_PUBLIC_NCP_CLIENT_ID;

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  // jsx 요소인 id = "map" 을 찾아서 보관
  // TS 를 활용하기 위한 naver Type 정의
  // 관례상 일반적으로  types 폴더를 만들고 Type 파일들을 배치
  const mapRef = useRef<naver.maps.Map | null>(null);

  const initializeMap = (): void => {
    // console.log('로딩완료시 최초로 보여줄 위치, 위도/경도');
    //https://navermaps.github.io/maps.js.ncp/docs/tutorial-3-Using-TypeScript.html
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: INITIAL_MINZOOM,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    const mapObject = new naver.maps.Map('map', mapOptions);
    mapRef.current = mapObject;
    // 만약 Props 로 OnLoad 기능을 전달한 경우 지도에 대한 부가처리
    if (onLoad) {
      onLoad(mapObject);
    }
  };

  useEffect(() => {
    // cleanup 함수
    // 컴포넌트 삭제될때
    return () => {
      // 지도 제거하기
      mapRef.current?.destroy();
    };
  }, []);
  return (
    <>
      {/* Next.js 에서 외부 자바스크립트 참조시 next/script */}
      {/* https://nextjs.org/docs/app/building-your-application/optimizing/scripts */}
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${MAP_KEY}`}
        onReady={initializeMap}
      />
      {/* 지도가 출력될 div : 전체 화면 활용 */}
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </>
  );
};

export default Map;
