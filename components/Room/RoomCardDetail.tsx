
"use client";
import Image from "next/image";
import { Room } from "./Room";
import PhotoGallerySection from "./PhotoGallerySection";



interface Props {
  room: Room;
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-homestay-cms.hcm57.vn/assets';


export default function RoomCardDetail({ room }: Props) {
  const roomData = room[0];

  if (!roomData) {
    return <div className="p-4 text-red-500">Room not found</div>;
  }
  return (
    <div className="p-6 mx-auto bg-white">
      <div className="container">
        <div>
          <div>
            <h1 className="text-2xl font-bold">{roomData.title}</h1>
            <p className="text-gray-600">{roomData.address}</p>
          </div>
          <div>
            <p>{roomData.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <Image
              width={800}
              height={400}
              src={`${DIRECTUS_URL}/${roomData.image?.id || roomData.image}`}
              alt={roomData.title}
              className="object-cover w-full h-[400px] rounded"
            />
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 w-72">
            <PhotoGallerySection images={roomData.future_img} />
            <div className="">
              <iframe
                className=" "
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15594.198370054473!2d109.19989735!3d12.278730049999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1749396808763!5m2!1svi!2s"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
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
        <h3 className="font-medium">Education</h3>
        <ul className="ml-4 text-sm text-gray-700 list-disc">
          {roomData.title_education.map((group, index) => (
            <li key={index} className="mb-2">
              {group.education} – {group.mile} mile
            </li>
          ))}
        </ul>
        <h3 className="font-medium">Health & Medicine </h3>
        <ul className="ml-4 text-sm text-gray-700 list-disc">
          {roomData.title_medicine.map((group, index) => (
            <li key={index} className="mb-2">
              {group.medicine} – {group.mile} mile
            </li>
          ))}
        </ul>
        <h3 className="font-medium">Food</h3>
        <ul className="ml-4 text-sm text-gray-700 list-disc">
          {roomData.title_food.map((group, index) => (
            <li key={index} className="mb-2">
              {group.food} – {group.mile} mile
            </li>
          ))}
        </ul>
        <h3 className="font-medium">Culture</h3>
        <ul className="ml-4 text-sm text-gray-700">
          {roomData.title_culture.map((group, index) => (
            <li key={index} className="mb-2">
              {group.culture} – {group.mile} mile
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
