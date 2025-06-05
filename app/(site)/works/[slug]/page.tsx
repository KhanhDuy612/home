import dynamic from 'next/dynamic';

// Sử dụng dynamic import với ssr: true nhưng không cần 'use client' ở top-level
const ArtistWorkDetail = dynamic(
  () => import('@/components/Artists/ArtistWorkDetail/ArtistWorkDetail'),
  {
    ssr: true,
  }
);

export default function WorkDetailPage() {
  return <ArtistWorkDetail />;
}
