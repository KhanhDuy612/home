
"use client";
import Image from "next/image";
import { Room } from "./Room";



interface Props {
  room: Room;
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-homestay-cms.hcm57.vn/assets';


export default function RoomCardDetail({ room }: Props) {
  console.log('RoomCardDetail props2222:', room);
  const roomData = room[0] || room;
  console.log("rooom 23123:", room.address);
  
  if (!roomData) {
    return <div className="p-4 text-red-500">Room not found</div>;
  }
  return (
    <div className="max-w-4xl p-6 mx-auto bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">{roomData.title}</h1>
      <p className="text-gray-600">{roomData.address}</p>
      <Image
        width={800}
        height={400}
        src={`${DIRECTUS_URL}/${roomData.image?.id || roomData.image}`}
        alt={roomData.title}
        className="object-cover w-full h-64 my-4 rounded"
      />
      <p className="mb-4 text-gray-700">{roomData.description}</p>

      <h2 className="mt-6 mb-2 text-lg font-semibold">Property Details</h2>
      <ul className="grid grid-cols-2 gap-2 text-sm text-gray-800">
        <li>Total area: {roomData.total_area}</li>
        <li>Bedrooms: {roomData.bedrooms}</li>
        <li>Bathrooms: {roomData.bathrooms}</li>
        <li>Floor: {roomData.floor}</li>
        <li>Year: {roomData.constructionYear}</li>
        <li>Elevator: {roomData.elevator}</li>
        <li>Parking: {roomData.parking ? 'Yes' : 'No'}</li>
        <li>Wi-Fi: {roomData.wifi ? 'Yes' : 'No'}</li>
        <li>Cable TV: {roomData.cableTV ? 'Yes' : 'No'}</li>
      </ul>

      <h2 className="mt-6 mb-2 text-lg font-semibold">What's Nearby</h2>
      {/* {room.title_education.map((group) => (
        <div key={group.category} className="mb-2">
          <h3 className="font-medium">{group.category}</h3>
          <ul className="ml-4 text-sm text-gray-700 list-disc">
            {group.places.map((place) => (
              <li key={place.name}>
                {place.name} – {place.distance}
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
}
