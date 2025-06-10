'use client';
import Image from 'next/image';
import { Room } from './Room';
import PhotoGallerySection from './PhotoGallerySection';
import { useState } from 'react';
import BookingFormPopup from '../FormBooking';
import PropertyDetails from './PropertyDetails';
import Nearby from './Nearby';
import { useEffect } from 'react';
import useApiQuery from '@/hooks/useApiQuery';

interface Props {
  room: Room;
}

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

export default function RoomCardDetail({ room }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Lấy lại dữ liệu phòng theo id
  const roomId = room[0]?.id;
  const { data: apiRoom, refetch } = useApiQuery<any[]>(`/items/rooms`, { filter: { id: { _eq: roomId } } });
  const roomData = apiRoom?.data?.[0] || room[0];

  const handleOrderClick = (roomId: string) => {
    setSelectedRoomId(roomId);
    setOpen(true);
  };

  // Khi đóng popup booking, nếu có reload thì refetch lại phòng
  const handleCloseBooking = (shouldReload?: boolean) => {
    setOpen(false);
    if (shouldReload) refetch();
  };

  if (!roomData) {
    return <div className="p-4 text-red-500">Room not found</div>;
  }
  return (
    <div className="mx-auto bg-white">
      <div className="container mx-auto">
        {roomData.order && (
          <span
            className={` px-4 py-1 rounded-lg text-lg font-semibold capitalize ${badgeColor(
              roomData.order
            )}`}
          >
            {roomData.order}
          </span>
        )}
        <div className="flex justify-between my-4">
          <div>
            <h1 className="text-2xl font-bold">{roomData.title}</h1>
            <p className="text-gray-600">{roomData.address}</p>
          </div>
          <div>
            <p className="font-semibold">${roomData.price}</p>
            {/* add order */}
            <button
              onClick={() => handleOrderClick(roomData.id)}
              className={`px-4 py-1 mt-2 text-sm font-semibold text-white rounded-lg top-3 left-3 
                      ${roomData.order === 'available'
                  ? 'bg-green-400 hover:bg-green-500 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed opacity-60'
                }
                    `}
              disabled={roomData.order !== 'available'}
            >
              Order
            </button>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row md:space-x-4">
          <div className="mt-4 md:mt-0 md:w-2/3">
            <div className="flex-col hidden col-span-2  md:flex">
              <Image
                width={800}
                height={400}
                src={`${DIRECTUS_URL}/${roomData.image?.id || roomData.image}`}
                alt={roomData.title}
                className="object-cover w-full h-[400px] rounded"
              />
            </div>
            {/* <div className="flex flex-col justify-between col-span-1 space-y-4">
            <PhotoGallerySection images={roomData.future_img} />
            <div className="">
              <iframe
                className="w-full rounded"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15594.198370054473!2d109.19989735!3d12.278730049999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1749396808763!5m2!1svi!2s"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div> */}
            <p className="my-4 text-gray-700">{roomData.description}</p>

            <PropertyDetails roomData={roomData} />

            <Nearby roomData={roomData} />
          </div>
          <div className="md:w-1/3">
            <div className="flex flex-col justify-between col-span-1 space-y-4">
              <PhotoGallerySection images={roomData.future_img} />
              <div className="">
                <iframe
                  className="w-full h-48 rounded"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15594.198370054473!2d109.19989735!3d12.278730049999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1749396808763!5m2!1svi!2s"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingFormPopup
        open={open}
        onClose={(shouldReload) => {
          setOpen(false);
          if (shouldReload && refetch) refetch();
        }}
        roomId={selectedRoomId}
        roomTitle={roomData.title}
      />
    </div>
  );
}
