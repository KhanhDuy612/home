

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: 'Find a home that suits your lifestyle.',
    description:
      'Nec risus quis viverra libero tellus eget. Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu urna eget.',
    imageUrl: '/images/banner/banner3.jpg',
  },
  {
    title: 'Discover comfort in every corner.',
    description:
      'Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    imageUrl: '/images/banner/banner2.jpg',
  },
  {
    title: 'Your dream home awaits.',
    description:
      'Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur.',
    imageUrl: '/images/banner/banner1.jpg',
  },
];

export default function BannerSlider() {
  return (
    <Swiper
    modules={[Autoplay, EffectFade]}
    autoplay={{ delay: 4000, disableOnInteraction: false }}
    loop={true}
    effect="fade"
    fadeEffect={{ crossFade: true }}
    speed={1000}
    className="w-full h-[500px] rounded-xl overflow-hidden"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative flex items-center justify-center w-full h-full text-center text-white"
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10 px-4">
              <h1 className="mb-4 text-3xl font-bold md:text-5xl">{slide.title}</h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-white/80">
                {slide.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}