import HeaderComponent from '@/components/HeaderComponent';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import React, { FC } from 'react';
import { SlActionRedo, SlBubbles, SlLayers } from 'react-icons/sl';

const Feedback: FC = () => {
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
      <main>피드백페이지 입니다</main>
    </>
  );
};

export default Feedback;
