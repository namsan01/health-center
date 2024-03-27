import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '전국 보건소 위치 안내',
  description: '전국 보건소 위치 안내',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="8f762eaed0d7fffd365512e6c027eeb9739ee50d"
        />
        <meta
          name="google-site-verification"
          content="J3kl5yPvijVI-WopKTkM88UkxqCFQUV_ZPv99rIOjK8"
        />
        <link
          rel="canonical"
          href="https://health-center-namsan01.vercel.app"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
