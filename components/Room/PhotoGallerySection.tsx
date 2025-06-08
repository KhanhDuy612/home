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
        className="relative w-72 h-44 rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <Image
          src={useDirectusImage(images[0]?.directus_files_id)}
          alt={'Gallery cover'}
          fill
          className="object-cover group-hover:blur-md transition duration-200"
        />
        <div className="absolute inset-0  flex flex-col items-center justify-center">
          <div className="text-white flex flex-col items-center">
            <div className="font-bold text-lg">Show all</div>
            <div className="text-sm">{images.length} photos</div>
          </div>
        </div>
      </div>

      {/* Popup slider */}
      {open && (
        <div className="fixed z-50 inset-0 bg-black/80 flex items-center justify-center">
          <button
            className="absolute top-6 right-8 text-white text-4xl font-bold z-50"
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
                      className="rounded-lg w-full object-contain bg-slate-400"
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