'use client';

import { getInfoList } from '@/apis/api';
import HeaderComponent from '@/components/common/HeaderComponent';
import MapSection from '@/components/map/MapSection';
import { useInfo } from '@/hooks/useInfo';
import styles from '@/styles/header.module.scss';
import { Info } from '@/types/info';
import Link from 'next/link';
import { useEffect } from 'react';
import { SlActionRedo, SlBubbles, SlLayers } from 'react-icons/sl';

export default function Home() {
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
          <Link key={'share'} href={'/'} className={styles.box}>
            <SlActionRedo />
          </Link>,
          <Link key={'feedback'} href={'/feedback'} className={styles.box}>
            <SlBubbles />
          </Link>,
          <Link key={'about'} href={'/about'} className={styles.box}>
            <SlLayers />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </>
  );
}
