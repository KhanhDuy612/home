'use client';
import { useOrderContext } from '@/app/context/OrderContext';
import { mockRooms } from '@/data/mockRooms';
import Image from 'next/image';
import Link from 'next/link';
import BookingFormPopup from '../FormBooking';
import { useState } from 'react';
import useApiQuery from '@/hooks/useApiQuery';

const badgeColor = (type: string) =>
  type === 'For sale' ? 'bg-green-400 text-white' : 'bg-purple-500 text-white';

export default function FeaturedProperties() {
    // filter: { id: { _eq: 2 } }
    const { data } = useApiQuery<any>('/items/rooms',{ populate: '*' });

    console.log('Data from API:', data);
    
  const [open, setOpen] = useState(false);
//   const { idRoom, setIdRoom } = useOrderContext();
  const handleOrderClick = (roomId: string) => {
    setOpen(true);
    // setIdRoom(roomId);
    console.log(`Order clicked for room ID: ${roomId}`);
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
                    src={room.imageUrl}
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
                  <div className="mb-2 text-xl font-bold">
                    ${room.propertyDetails.price?.toLocaleString()}
                  </div>
                  <div className="flex flex-wrap text-sm text-gray-600 gap-x-6 gap-y-2">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/bedrooms.png"
                        alt="Bedrooms icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.propertyDetails.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/bathrooms.png"
                        alt="Bathrooms icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.propertyDetails.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/total.png"
                        alt="Total area icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.propertyDetails.totalArea} Total area</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/rooms/garages.png"
                        alt="Garages icon"
                        width={20}
                        height={20}
                      />
                      <span>{room.propertyDetails.garages} Garages</span>
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
      {/* <BookingFormPopup idRoom={idRoom} open={open} onClose={() => setOpen(false)} /> */}
    </section>
  );
}
