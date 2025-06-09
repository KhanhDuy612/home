'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useDirectusImage from '@/hooks/useDirectusImage';

interface PhotoGallerySectionProps {
  images: { id: string; directus_files_id: string; alt?: string }[];
}

export default function PhotoGallerySection({ images }: PhotoGallerySectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Section with blurred image and Show all button */}
      <div
        className="relative w-full overflow-hidden cursor-pointer h-44 rounded-xl group"
        onClick={() => setOpen(true)}
      >
        <Image
          src={useDirectusImage(images[0]?.directus_files_id)}
          alt={'Gallery cover'}
          fill
          className="object-cover transition duration-200 group-hover:blur-md"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-white">
            <div className="text-lg font-bold">Show all</div>
            <div className="text-sm">{images.length} photos</div>
          </div>
        </div>
      </div>

      {/* Popup slider */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            className="absolute z-50 text-4xl font-bold text-white top-6 right-8"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
          <div className="w-full max-w-2xl px-4">
            <Swiper spaceBetween={24} slidesPerView={1}>
              {images.map(img => (
                <SwiperSlide key={img.id}>
                  <div className="flex flex-col items-center">
                    <Image
                      src={useDirectusImage(img.directus_files_id)}
                      alt={img.alt || ''}
                      width={600}
                      height={400}
                      className="object-contain w-full rounded-lg bg-slate-400"
                      style={{ maxHeight: 400 }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}