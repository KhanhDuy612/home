'use client';

import dynamic from 'next/dynamic';

const Products = dynamic(() => import('@/components/Products'), {
  ssr: true,
});

export default function Works() {
  return (
    <>
      <Products />
    </>
  );
}
