'use client';
import { rooms } from '@/data/rooms';
import Image from 'next/image';
import Link from 'next/link';

const badgeColor = (type: string) =>
  type === 'For sale' ? 'bg-green-400 text-white' : 'bg-purple-500 text-white';

export default function FeaturedProperties() {
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
      {rooms.map(room => (
        <Link
          href={`/rooms/${room.slug}`}
          key={room.id}
          className="flex flex-col p-4 transition bg-white shadow rounded-xl hover:shadow-lg"
        >
          <div className="relative mb-3">
            <Image
              src={room.image}
              alt={room.title}
              width={400}
              height={160}
              className="object-cover w-full h-40 rounded-lg"
              priority
            />
            {/* Nếu muốn hiện badge type:
            {room.type && (
              <span
                className={`absolute top-3 left-3 px-4 py-1 rounded-lg text-sm font-semibold ${badgeColor(
                  room.type
                )}`}
              >
                {room.type}
              </span>
            )} */}
          </div>
          <div>
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
                <span>{room.area} Total area</span>
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
      ))}
    </div>
  );
}