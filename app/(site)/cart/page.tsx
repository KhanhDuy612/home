'use client';

import dynamic from 'next/dynamic';

const ViewCart = dynamic(() => import('@/components/ViewCart'), {
  ssr: true
});

export default function Cart() {
  return (
    <>
      <ViewCart />
    </>
  );
}
