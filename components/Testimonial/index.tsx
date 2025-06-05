'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Miya Monroe',
    role: 'Buyer',
    quote:
      'Arcu laoreet malesuada nunc eget. Fermentum ut dui etiam aliquam habitant elit euismod erat praesent. Trincidunt semper interdum fames cras.',
    image: '/images/testimonial/testimonial.png',
  },
  {
    name: 'John Carter',
    role: 'Home Owner',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
    image: '/images/testimonial/testimonial.png',
  },
];

export default function Testimonial() {
  return (
    <section className="px-4 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
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
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-[#0f0d1d]">
                    What our clients say
                    <br />
                    about us
                  </h3>
                  <p className="mt-4 text-[#0f0d1d]/80 italic text-sm md:text-base">“{t.quote}”</p>
                  <p className="mt-4 font-semibold text-[#0f0d1d]">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
                <div className="flex justify-center">
                  <img
                    src={t.image}
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
