'use client';

import { useContext, useState } from 'react';
import { CartContext } from '@/app/context/CartContent';

import Image from 'next/image';
import Link from 'next/link';
import ScrollFadeIn from '../ScrollFadeIn/ScrollFadeIn';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const events = [
  {
    id: 1,
    title: 'ESTHER 2 II 2025',
    subtitle: 'NADEGE DAVID',
    date: '12 - 15 June 2025',
    description:
      'Esther II features groundbreaking work by emerging artists across disciplines. Galerie Quynh will present new media and installation works...',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/9-esther-ii-2025-new-york/',
    price: 100,
  },
  {
    id: 2,
    title: 'EXPO CHICAGO 2025',
    subtitle: 'BOOTH 326',
    date: '24 - 27 April 2025',
    description:
      "For EXPO CHICAGO, Galerie Quynh presents the first solo show in the United States of work by Vy Trịnh (b. 1996, Ho Chi Minh City, Vietnam). Expanding on the artist's...",
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/4a/4a947bcad8c0416fbab381a73b66e148/thumbnail_tny5379_20250423_0004_edited.jpg',
    link: '/art-fairs/8-expo-chicago-2025-booth-326/',
    price: 100,
  },
  {
    id: 3,
    title: 'ESTHER II 2025',
    subtitle: 'NEW YORK',
    date: '12 - 15 June 2025',
    description:
      'Esther II features groundbreaking work by emerging artists across disciplines. Galerie Quynh will present new media and installation works...',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/9-esther-ii-2025-new-york/',
    price: 100,
  },
  {
    id: 4,
    title: 'ART BASEL HONG KONG 2025',
    subtitle: 'HALL 1 BOOTH 1C20',
    date: '27 - 30 March 2025',
    description:
      'Galerie Quynh will showcase contemporary Southeast Asian artists working with abstract expressionism and new materiality.',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/10-art-basel-hong-kong-2025/',
    price: 100,
  },
  {
    id: 5,
    title: 'FRIEZE NEW YORK 2025',
    subtitle: 'FOCUS SECTION',
    date: '1 - 4 May 2025',
    description:
      'An exciting selection of conceptual works by emerging Vietnamese artists will be featured at Frieze New York.',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/11-frieze-new-york-2025/',
    price: 100,
  },
  {
    id: 6,
    title: 'THE ARMORY SHOW 2025',
    subtitle: 'BOOTH P3',
    date: '5 - 8 September 2025',
    description:
      'Galerie Quynh returns to The Armory Show with a strong lineup of multimedia artists pushing conceptual boundaries.',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/12-the-armory-show-2025/',
    price: 100,
  },
  {
    id: 7,
    title: 'ART JOG 2025',
    subtitle: 'SPECIAL PROJECTS',
    date: '10 - 20 July 2025',
    description:
      'Highlighting experimental art practices from Southeast Asia in immersive and site-specific installations.',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/13-art-jog-2025/',
    price: 100,
  },
  {
    id: 8,
    title: 'ASIA NOW PARIS 2025',
    subtitle: 'BOOTH 21',
    date: '16 - 19 October 2025',
    description:
      'A curated selection of powerful narratives and feminist themes in contemporary Vietnamese art.',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/14-asia-now-paris-2025/',
    price: 100,
  },
  {
    id: 9,
    title: 'SYDNEY CONTEMPORARY 2025',
    subtitle: 'CARRIAGEWORKS',
    date: '12 - 15 September 2025',
    description:
      'Exploring diasporic identity and cultural hybridity through contemporary lens-based media.',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/15-sydney-contemporary-2025/',
    price: 100,
  },
  {
    id: 10,
    title: 'WEST BUND ART & DESIGN 2025',
    subtitle: 'SHANGHAI',
    date: '7 - 10 November 2025',
    description:
      'Galerie Quynh brings minimalist sculptural works and performance documentation to Shanghai.',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0875/usr/images/events/main_image/items/7e/7e4e453b574641f8af1848b0ff8177b2/wt2502_the-inevitable-as-realized.jpg',
    link: '/art-fairs/16-west-bund-art-design-2025/',
    price: 100,
  },
];

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const handleAddToCart = (event: any) => {
    const item = {
      id: event.id,
      slug: event.slug,
      type: event.type,
      name: event.title,
      artist: event.subtitle,
      price: 100,
      image: event.imageUrl,
      quantity: 1,
      total: 100,
    };
    addToCart(item);
    setAddedItems(prev => [...prev, event.id]);

    // Show toast notification
    toast.success(`${event.title} added to cart!`, {
      position: 'top-right',
      autoClose: 3000, // auto close after 3 seconds
    });
  };

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="mb-8 text-3xl font-medium uppercase tracking-[2.9px]">Forthcoming</h2>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          {events.map((event, idx) => (
            <ScrollFadeIn key={idx}>
              <li>
                <div className="">
                  <div className="relative w-full h-60">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-semibold tracking-[2.465px]">{event.title}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-gray tracking-[1.6675px]">
                          {event.subtitle}
                        </p>
                        <p className="text-sm text-neutral-gray tracking-[1.6675px]">
                          ${event.price}
                        </p>
                        <p className="text-sm text-neutral-gray tracking-[1.6675px]">
                          {event.date}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleAddToCart(event)}
                          className="p-2 px-4 font-medium uppercase border rounded-sm cursor-pointer "
                          style={{ backgroundColor: '#F6C61A', color: '#472F00' }}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ScrollFadeIn>
          ))}
        </ul>
      </div>
      {/* Toast container */}
      <div>
        <ToastContainer style={{ marginTop: '100px' }} />
      </div>
    </section>
  );
}
