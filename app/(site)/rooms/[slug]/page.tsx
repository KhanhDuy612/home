import { rooms } from '@/data/rooms';
import { notFound } from 'next/navigation';

type Props = { params: { slug: string } };

export default async function RoomDetail({ params }: Props) {
  const room = rooms.find(r => r.slug === params.slug);
  if (!room) return notFound();

  return (
    <main className="flex flex-col items-center min-h-screen py-8 bg-gray-50">
      <div className="w-full max-w-5xl p-6 bg-white shadow rounded-2xl">
        <h1 className="text-2xl font-bold">{room.title}</h1>
        <div className="mb-4 text-sm text-gray-500">{room.address}</div>
        <img
          src={room.image}
          alt={room.title}
          className="object-cover w-full mb-4 rounded-xl h-52"
        />

        <div className="mb-4">
          <h2 className="mb-1 font-semibold">Description</h2>
          <p className="text-sm text-gray-700">{room.description}</p>
        </div>

        <div className="mb-4">
          <h2 className="mb-1 font-semibold">Property details</h2>
          <div className="grid grid-cols-2 text-sm gap-x-4 gap-y-2">
            <div className="flex items-center justify-between py-1 border-b">
              <span>Total area</span>
              <span className="font-medium">{room.totalArea}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span>Elevator</span>
              <span className="font-medium">{room.elevator}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span>Bedrooms</span>
              <span className="font-medium">{room.bedrooms}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span>Parking</span>
              <span className="font-medium">{room.parking ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span>Bathrooms</span>
              <span className="font-medium">{room.bathrooms}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span>Wi-Fi</span>
              <span className="font-medium">{room.wifi ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span>Floor</span>
              <span className="font-medium">{room.floor}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span>Cable TV</span>
              <span className="font-medium">{room.cableTV ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center justify-between col-span-2 py-1 border-b">
              <span>Construction year</span>
              <span className="font-medium">{room.constructionYear}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-1 font-semibold">What's nearby</h2>
          {room.nearby.map(group => (
            <div key={group.type} className="mb-2">
              <div className="font-medium text-gray-900">{group.type}</div>
              <ul className="pl-3 text-sm text-gray-700">
                {group.places.map(place => (
                  <li key={place.name} className="flex justify-between">
                    <span>{place.name}</span>
                    <span>{place.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
