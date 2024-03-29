import styles from '@/styles/header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

// React,ReactNode : React에서 만든 HTML 요소
// 여러개의 children 요소들을 받을것이므로 배열로 받음
interface Props {
  rightElements?: ReactNode[];
}

const HeaderComponent: FC<Props> = ({ rightElements }): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.flexitem}>
          <Link href="/" className={styles.box}>
            <Image
              src={'/logo.png'}
              width={40}
              height={20}
              quality={75}
              priority
              alt="보건소 안내 서비스"
            />
            <h2>Health-center</h2>
          </Link>
        </div>

        {rightElements && (
          <div className={styles.flexitem}>{rightElements}</div>
        )}
      </header>
    </>
  );
};
export default HeaderComponent;
