'use client';
import { useOrderContext } from '@/app/context/OrderContext';
import Image from 'next/image';
import Link from 'next/link';
import BookingFormPopup from '../FormBooking';
import { useState } from 'react';
import useApiQuery from '@/hooks/useApiQuery';

const badgeColor = (type: string) =>
  type === 'For sale' ? 'bg-green-400 text-white' : 'bg-purple-500 text-white';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-homestay-cms.hcm57.vn/assets';

export default function FeaturedProperties({ data }: { data?: any }) {
   const { data: apiData, isLoading } = useApiQuery<any[]>('/items/rooms');

  // Nếu có data truyền vào thì ưu tiên dùng, không thì lấy data từ API
  const mockRooms = data || apiData?.data;

  console.log("Mock Rooms Data:", mockRooms);
  
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
        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {mockRooms.map(room => (
            <div key={room.id} className="transition bg-white shadow rounded-xl hover:shadow-lg">
              <Link href={`/rooms/${room.type}/${room.slug}`} className="flex flex-col ">
                <div className="relative mb-3">
                  <Image
                    src={`${DIRECTUS_URL}/${room.image?.id}`}
                    alt={room.title}
                    width={400}
                    height={160}
                    className="object-cover w-full h-40 rounded-tl-lg rounded-tr-lg"
                    priority
                  />
                  {/* Nếu muốn hiện badge type: */}
                  {room.order && (
                    <span
                      className={`absolute top-3 left-3 px-4 py-1 rounded-lg text-sm font-semibold ${badgeColor(
                        room.order
                      )}`}
                    >
                      {room.order}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{room.title}</h2>
                  <p className="mb-2 text-sm text-gray-400">{room.address}</p>
                  <div className="mb-2 text-xl font-bold">${room.price?.toLocaleString()}</div>
                  <div className="flex flex-wrap text-sm text-gray-600 gap-x-6 gap-y-2">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/bedrooms.png"
                        alt="Bedrooms icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/bathrooms.png"
                        alt="Bathrooms icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/total.png"
                        alt="Total area icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.totalArea} Total area</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/garages.png"
                        alt="Garages icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.garages} Garages</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <button
                  onClick={() => handleOrderClick(room.id)}
                  className="px-4 py-1 text-sm font-semibold text-white bg-green-400 rounded-lg top-3 left-3 "
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingFormPopup
        open={open}
        onClose={() => setOpen(false)}
        roomId={selectedRoomId}
      />
    </section>
  );
}
