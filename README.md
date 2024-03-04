# 기본 페이지 구성

- `yarn dev`

## 1. 각파일 정리

### 1.1 http://localhost:3000/

#### 1.1 src/app/layout.tsx

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '전국 보건소 위치 안내',
  description: '전국 보건소 위치 안내',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

- global.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}
ul,
li {
  list-style: none;
}
a {
  color: #000;
  text-decoration: none;
}
html {
}
body {
}
```

#### 1.1 src/app/page.tsx

```tsx
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main>테스트</main>
    </>
  );
}
```

## HeaderComponent.tsx 진행

- header 역할인 경우 각 page에 배치되는 컴포넌트
- src/components/common 폴더생성
- src/components/common/HeaderComponent.tsx 생성

- /src/app/page.tsx
  : @ 은 /src 경로를 지칭한는 별칭(alias) 이다.
  : tsconfig.json 의 path 에 설정됨

```tsx
import Link from 'next/link';
import React from 'react';

const HeaderComponent = (): JSX.Element => {
  return (
    <>
      <header>
        <div>
          <Link href="/">로고</Link>
        </div>
      </header>
    </>
  );
};
```

## 프로젝트 관리를 위해서 src/styles 별도 관리

- /src/styles 폴더 생성
- /src/styles/global.css 를 이동
- app/layout.tsx

```tsx
import '@/styles/globals.css';
```

- src/styles/header.module.scss 파일생성

```scss
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  padding: 0 8px 0 12px;
  display: flex;
  justify-content: space-between;
  z-index: 999;
}

.flexitem {
  display: flex;
}

.box {
  padding: 6px;
  border-radius: 4px;
  box-shadow: 0 -2px 4px 0 rgb(136 136 136 / 30%);

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  &:hover {
    background-color: #40b6fd;
    color: #fff;
  }
  transition: background-color 0.2s ease;
}
```

## Next.js 의 Image 관련

```tsx
import Link from 'next/link';
import React from 'react';
import styles from '@/styles/header.module.scss';

const HeaderComponent = (): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.flexitem}>
          <Link href="/" className={styles.box}>
            <img
              src="/next.svg"
              width={110}
              height={20}
              alt="보건소 안내 서비스"
            />
          </Link>
        </div>
      </header>
    </>
  );
};
export default HeaderComponent;
```

- Next.js의 Image는 최적화 지원
  : 버전주의[참조](https://velog.io/@tunggary/Next.js-Image-Optimization)
  : 최적화의 여러가지 내용은 외부 이미지 불러들이기에서 참조
  : Next.js는 SSR 이므로 html 생성
  : 문제는 외부의 이밎를 불러오는 경우 html에 포함이 안됨
  : webp 확장자로 만들어준다 (최적화지원)
  : blur 효과
  : layout-shift 현상개선

## 페이지 생성

- /src/app/about 폴더 / page.tsx

```tsx
import React, { FC } from 'react';

const About: FC = () => {
  return <div>About page</div>;
};

export default About;
```

- /src/app/feedback 폴더 / page.tsx

```tsx
import React, { FC } from 'react';

const Feedback: FC = () => {
  return <div>Feedback page</div>;
};

export default Feedback;
```

- 각 페이지별 childe를 전달하기
  : src/components/common/HeaderComponent.tsx

```tsx
import Link from 'next/link';
import React from 'react';
import styles from '@/styles/header.module.scss';
import Image from 'next/image';
// React.ReactNode :  React 에서 만든 HTML 요소
// 여러개의 children 요소들을 받을 것이므로 배열로 받음
interface Props {
  rightElements?: React.ReactNode[];
}
const HeaderComponent: React.FC<Props> = ({ rightElements }): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.flexitem}>
          <Link href="/" className={styles.box}>
            <Image
              src={'/next.svg'}
              width={110}
              height={20}
              alt="보건소 안내 서비스"
              quality={75}
              priority
            />
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
```

- /src/app/about/page.tsx

```tsx
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import React from 'react';
import styles from '@/styles/header.module.scss';
const About = (): JSX.Element => {
  return (
    <>
      <HeaderComponent
        rightElements={[
          <Link key="feedback" href="/feedback" className={styles.box}>
            피드백
          </Link>,
          <Link key="about" href="/about" className={styles.box}>
            서비스소개
          </Link>,
        ]}
      />
      <main>서비스 소개입니다</main>
    </>
  );
};

export default About;
```

- /src/app/feedback/page.tsx

```tsx
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import React from 'react';
import styles from '@/styles/header.module.scss';
const Feedback = (): JSX.Element => {
  return (
    <>
      <HeaderComponent
        rightElements={[
          <Link key="feedback" href="/feedback" className={styles.box}>
            피드백
          </Link>,
          <Link key="about" href="/about" className={styles.box}>
            서비스소개
          </Link>,
        ]}
      />
      <main>여기는 피드백입니다.</main>
    </>
  );
};

export default Feedback;
```

- /src/app/page.tsx

```tsx
'use client';

import HeaderComponent from '@/components/HeaderComponent';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      <HeaderComponent
        rightElements={[
          <Link key={'feedback'} href={'/feedback'} className={styles.box}>
            피드백
          </Link>,
          <Link key={'about'} href={'/about'} className={styles.box}>
            서비스 소개
          </Link>,
        ]}
      />
      <main>테스트</main>
    </>
  );
}
```

## 아이콘 라이브러리 활용

- [사이트](https://react-icons.github.io/react-icons)
- [참조](https://2mojurmoyang.tistory.com/222)
- 설치 : `yarn add react-icons`
