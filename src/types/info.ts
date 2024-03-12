// 위도 타입
type Lat = number;
// 경도 타입
type Lng = number;
// [위도 , 경도] 타입
export type Coordinates = [Lat, Lng];
// json 에서 온 데이터를 위한 타입정의
export type Info = {
  coordinates: Coordinates;
};
