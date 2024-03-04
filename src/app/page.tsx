'use client';

import HeaderComponent from '@/components/HeaderComponent';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import { SlActionRedo, SlBubbles, SlLayers } from 'react-icons/sl';

export default function Home() {
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
      <main>테스트</main>
    </>
  );
}
