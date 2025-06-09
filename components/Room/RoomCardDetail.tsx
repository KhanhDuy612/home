'use client';
import Image from 'next/image';
import { Room } from './Room';
import PhotoGallerySection from './PhotoGallerySection';
import { useState } from 'react';
import BookingFormPopup from '../FormBooking';
import PropertyDetails from './PropertyDetails';
import Nearby from './Nearby';

interface Props {
  room: Room;
}

const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-homestay-cms.hcm57.vn/assets';

export default function RoomCardDetail({ room }: Props) {
  const roomData = room[0];
  const [open, setOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const badgeColor = (type: string) =>
    roomData.order === 'Booked' ? 'bg-green-400 text-white' : 'bg-purple-500 text-white';

  const handleOrderClick = (roomId: string) => {
    setSelectedRoomId(roomId);
    setOpen(true);
  };
  if (!roomData) {
    return <div className="p-4 text-red-500">Room not found</div>;
  }
  return (
    <div className="mx-auto bg-white">
      <div className="container mx-auto">
        {roomData.order && (
          <span
            className={` px-4 py-1 rounded-lg text-lg font-semibold ${badgeColor(
              roomData.order
            )}`}
          >
            {roomData.order}
          </span>
        )}
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{roomData.title}</h1>
            <p className="text-gray-600">{roomData.address}</p>
          </div>
          <div>
            <p className="font-semibold">${roomData.price}</p>
            {/* add order */}
            <button
              onClick={() => handleOrderClick(roomData.id)}
              className="px-4 py-1 mt-2 text-sm font-semibold text-white bg-green-400 rounded-lg top-3 left-3 "
            >
              Order
            </button>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row md:space-x-4">
          <div className="mt-4 md:mt-0 md:w-2/3">
            <div className="flex flex-col col-span-2">
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
                  className="w-full rounded"
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
        onClose={() => setOpen(false)}
        roomId={selectedRoomId}
        roomTitle={roomData.title}
      />
    </div>
  );
}
