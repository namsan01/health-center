import { Coordinates } from './info';

// 네이버 지도 타입
export type NaverMap = naver.maps.Map;

// 마커타입
export type Marker = {
  map: NaverMap;
  coordinates: Coordinates;
  icon: ImageIcon;
  onClick: () => void;
};

export type ImageIcon = {
  url: string;
  size: naver.maps.Size;
  origin: naver.maps.Point;
  scaledSize: naver.maps.Size;
};
