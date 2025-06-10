'use client';
import Image from 'next/image';
import Link from 'next/link';
import BookingFormPopup from '../FormBooking';
import { useState } from 'react';
import useApiQuery from '@/hooks/useApiQuery';
import FadeInSection from '../Animation/FadeInSection';
import { Room } from './Room';

const badgeColor = (type: string) => {
  switch (type) {
    case 'available':
      return 'bg-[#8EDA53]';
    case 'reserved':
      return 'bg-[#53A1DA]';
    default:
      return 'bg-[#B3B3B3]';
  }
};

const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-homestay-cms.hcm57.vn/assets';

export default function FeaturedProperties({ data }: { data?: Room[] }) {
  const { data: apiData, refetch } = useApiQuery<Room[]>('/items/rooms');


  // Nếu có data truyền vào thì ưu tiên dùng, không thì lấy data từ API
  const mockRooms = data || apiData?.data;

  const [open, setOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  //   const { idRoom, setIdRoom } = useOrderContext();
  const handleOrderClick = (roomId: string) => {
    setSelectedRoomId(roomId);
    setOpen(true);
  };
  if (!mockRooms || mockRooms.length === 0) {
    return (
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto">
          <p className="text-center text-gray-500">No featured properties available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {mockRooms.map(room => (
            <FadeInSection key={room.id}>
              <div
                className="flex flex-col justify-between h-full transition bg-white shadow rounded-xl hover:shadow-lg"
              >
                <Link href={`/rooms/${room.type}/${room.slug}`} className="flex flex-col ">
                  <div className="relative mb-3 overflow-hidden">
                    <Image
                      src={`${DIRECTUS_URL}/${room.image?.id}`}
                      alt={room.title}
                      width={400}
                      height={200}
                      className="object-cover w-full transition-transform duration-300 ease-in-out rounded-tl-lg rounded-tr-lg h-50 hover:scale-105"
                      priority
                    />
                    {/* Nếu muốn hiện badge type: */}
                    {room.order && (
                      <span
                        className={`absolute top-3 left-3 px-4 py-1 capitalize rounded-lg text-sm font-semibold ${badgeColor(
                          room.order
                        )}`}
                      >
                        {room.order}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold uppercase">{room.title}</h2>
                    <p className="mb-2 text-sm text-gray-400">{room.address}</p>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="mb-2 text-xl font-bold">${room.price?.toLocaleString()}</div>
                      <div className="flex flex-wrap text-sm text-gray-600 gap-x-6 gap-y-2">
                        <div className="flex flex-col items-start space-y-1">
                          <div className="flex space-x-2 ">
                            <Image
                              src="/images/rooms/bedrooms.png"
                              alt="Bedrooms icon"
                              width={20}
                              height={20}
                            />
                            <p>{room.bedrooms}</p>
                          </div>
                          <p> Bedrooms</p>
                        </div>
                        <div className="flex flex-col items-start space-y-1">
                          <div className="flex space-x-2 ">
                            <Image
                              src="/images/rooms/bathrooms.png"
                              alt="Bathrooms icon"
                              width={20}
                              height={20}
                            />
                            <p>{room.bathrooms}</p>
                          </div>
                          <p> Bathrooms</p>
                        </div>
                        <div className="flex flex-col items-start space-y-1">
                          <div className="flex space-x-2 ">
                            <Image
                              src="/images/rooms/total.png"
                              alt="Total area icon"
                              width={20}
                              height={20}
                            />
                            <p>{room.total_area} </p>
                          </div>
                          <p>Total area</p>
                        </div>
                        <div className="flex flex-col items-start space-y-1">
                          <div className="flex space-x-2 ">
                            <Image
                              src="/images/rooms/garages.png"
                              alt="Garages icon"
                              width={20}
                              height={20}
                            />
                            <p>{room.garages}</p>
                          </div>
                          <p>Garages</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOrderClick(room.id)}
                    className={`px-4 py-1 mt-2 text-sm font-semibold text-white rounded-lg top-3 left-3 
                      ${room.order === 'available'
                        ? 'bg-green-400 hover:bg-green-500 cursor-pointer'
                        : 'bg-gray-400 cursor-not-allowed opacity-60'
                      }
                    `}
                    disabled={room.order !== 'available'}
                  >
                    Order
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
      <BookingFormPopup
        open={open}
        onClose={(shouldReload) => {
          setOpen(false);
          if (shouldReload && refetch) refetch();
        }}
        roomId={selectedRoomId}
        roomTitle={mockRooms.find(room => room.id === selectedRoomId)?.title || ''}
      />
    </section>
  );
}