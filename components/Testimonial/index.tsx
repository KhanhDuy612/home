'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import useApiQuery from '@/hooks/useApiQuery';
import Image from 'next/image';
import useDirectusImage from '@/hooks/useDirectusImage';

export default function Testimonial(data: any) {
  const { data: apiData, isLoading } = useApiQuery<any[]>('/items/testimonial');

  const testimonials = data.data || apiData?.data;
  return (
    <section className="px-4 py-16" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#0f0d1d]">
                    {t.title}
                  </h3>
                  <p className="mt-4 text-[#0f0d1d]/80 italic text-sm md:text-base">“{t.quote}”</p>
                  <p className="mt-4 font-semibold text-[#0f0d1d]">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
                <div className="flex justify-center">
                  <Image
                    width={250}
                    height={250}
                    src={useDirectusImage(t.image.id)}
                    alt={t.name}
                    className="rounded-md w-[250px] h-[250px] object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
