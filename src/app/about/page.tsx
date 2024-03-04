import HeaderComponent from '@/components/HeaderComponent';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import React, { FC } from 'react';
import { SlActionRedo, SlBubbles, SlLayers } from 'react-icons/sl';

const About: FC = () => {
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
      <main>서비스 소개입니다</main>
    </>
  );
};

export default About;
