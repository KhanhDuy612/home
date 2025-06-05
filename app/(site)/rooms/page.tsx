import Link from "next/link";
import { rooms } from "@/data/rooms";

const badgeColor = (type: string) =>
  type === "For sale"
    ? "bg-green-400 text-white"
    : "bg-purple-500 text-white";

export default function RoomsPage() {
  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <h1 className="mb-2 text-4xl font-bold text-center text-gray-900">
        Featured Properties
      </h1>
      <p className="max-w-xl mb-8 text-center text-gray-500">
        Explore all available rooms and discover your next home.
      </p>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {rooms.map((room) => (
          <Link
            href={`/rooms/${room.slug}`}
            key={room.id}
            className="flex flex-col p-4 transition bg-white shadow rounded-xl hover:shadow-lg"
          >
            <div className="relative mb-3">
              <img
                src={room.image}
                alt={room.title}
                className="object-cover w-full h-40 rounded-lg"
              />
              {/* <span
                className={`absolute top-3 left-3 px-4 py-1 rounded-lg text-sm font-semibold ${badgeColor(
                  room.type
                )}`}
              >
                {room.type}
              </span> */}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{room.title}</h2>
              <p className="mb-2 text-sm text-gray-400">{room.address}</p>
              <div className="mb-2 text-xl font-bold">${room.price.toLocaleString()}</div>
              <div className="flex flex-wrap text-sm text-gray-600 gap-x-6 gap-y-2">
                <div>
                  {room.bedrooms} Bedrooms
                </div>
                <div>
                  {room.bathrooms} Bathrooms
                </div>
                <div>
                  {room.area} Total area
                </div>
                <div>
                  {room.garages} Garages
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}