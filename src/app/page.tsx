'use client';

import { getInfoList } from '@/apis/api';
import HeaderComponent from '@/components/common/HeaderComponent';
import MapSection from '@/components/map/MapSection';
import { useInfo } from '@/hooks/useInfo';
import { useMap } from '@/hooks/useMap';
import styles from '@/styles/header.module.scss';
import { Info } from '@/types/info';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { SlActionRedo, SlBubbles, SlLayers } from 'react-icons/sl';
// Next.js 13버전이상 처리
import { Suspense } from 'react';

export default function Home() {
  // 라우터 활용
  const router = useRouter();
  const { getMapOption } = useMap();
  // 현재 지도 좌표, zoom 정보 얻어오기
  const copyAndSaveInfo = useCallback(() => {
    const mapOptions = getMapOption();
    // console.log(mapOptions);
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;
    router.push(query);

    // query를 클립보드에 복사해서 보관
    copy(query);
  }, [router, getMapOption]);

  const { initializeInfo } = useInfo();

  // 페이지 준비가 되면 데이터 호출
  useEffect(() => {
    // 마커를 위한 데이터 호출
    const fetchInfoList = async () => {
      try {
        const res: Info[] = await getInfoList();
        // SWR 초기값 보관
        initializeInfo(res);
      } catch (error) {
        console.log('에러가 발생습니다.', error);
      }
    };

    fetchInfoList();
  }, []);

  return (
    <>
      <HeaderComponent
        rightElements={[
          <button
            key="share"
            className={styles.box}
            onClick={() => {
              // 현재 네이버의 좌표와 확대 비율을 보관해서 전달하도록 준비
              copyAndSaveInfo();
            }}
          >
            <SlActionRedo />
          </button>,

          <Link key={'feedback'} href={'/feedback'} className={styles.box}>
            <SlBubbles />
          </Link>,
          <Link key={'about'} href={'/about'} className={styles.box}>
            <SlLayers />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        {/* Next.js 13 이상 버전 처리 */}
        <Suspense fallback={<>Loading...</>}>
          <MapSection />
        </Suspense>
      </main>
    </>
  );
}
