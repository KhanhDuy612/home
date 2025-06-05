// Route segment config
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'GALLERY ALEXANDRIA | CONTACT',
    description:
      'Introducing Alexandrianile Art Gallery, a distinguished hub for art enthusiasts seeking exquisite paintings that transcend boundaries. Nestled in the heart of creativity, Alexandrianile stands as a premier art destination, offering a curated collection of captivating artworks that showcase the intersection of tradition and innovation.',
    openGraph: {
      title: 'GALLERY ALEXANDRIA | CONTACT',
      description:
        'Introducing Alexandrianile Art Gallery, a distinguished hub for art enthusiasts seeking exquisite paintings that transcend boundaries. Nestled in the heart of creativity, Alexandrianile stands as a premier art destination, offering a curated collection of captivating artworks that showcase the intersection of tradition and innovation.',
      type: 'website',
      images: [
        {
          url: 'https://test-cms-art-gallery.hcm57.vn/assets/811ee1c3-e3f4-468c-8876-b92f39c938d2',
          width: 1200,
          height: 630,
          alt: 'GALLERY ALEXANDRIA | CONTACT',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GALLERY ALEXANDRIA | CONTACT',
      description:
        'Introducing Alexandrianile Art Gallery, a distinguished hub for art enthusiasts seeking exquisite paintings that transcend boundaries. Nestled in the heart of creativity, Alexandrianile stands as a premier art destination, offering a curated collection of captivating artworks that showcase the intersection of tradition and innovation.',
      images: ['https://test-cms-art-gallery.hcm57.vn/assets/811ee1c3-e3f4-468c-8876-b92f39c938d2'],
    },
  };
}
