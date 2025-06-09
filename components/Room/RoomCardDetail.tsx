'use client';
import Image from 'next/image';
import { Room } from './Room';
import PhotoGallerySection from './PhotoGallerySection';

interface Props {
  room: Room;
}

const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-homestay-cms.hcm57.vn/assets';

export default function RoomCardDetail({ room }: Props) {
  const roomData = room[0];

  if (!roomData) {
    return <div className="p-4 text-red-500">Room not found</div>;
  }
  return (
    <div className="mx-auto bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{roomData.title}</h1>
            <p className="text-gray-600">{roomData.address}</p>
          </div>
          <div>
            <p className="font-semibold">{roomData.price}</p>
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

            <h2 className="mt-6 mb-2 text-lg font-semibold">Property Details</h2>
            <ul className="grid grid-cols-1 text-sm gap-y-2 gap-x-4 text-gray747 md:grid-cols-2">
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/area.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Total area:
                </p>
                <p className="text-black">{roomData.total_area} sq.ft</p>
              </li>
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/double-bed.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Bedrooms:
                </p>
                <p className="text-black">{roomData.bedrooms} </p>
              </li>
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/bath-tub.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Bathrooms:
                </p>
                <p className="text-black">{roomData.bathrooms} </p>
              </li>
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/stairs.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Floor:
                </p>
                <p className="text-black">{roomData.floor} </p>
              </li>
              {/* <li className='flex justify-between pb-2 border-b'>
            <p>
              <Image
                src="/images/rooms/area.png"
                alt="Icon"
                width={24}
                height={24}
                className="inline-block mr-2"
              />
              Year:
            </p>
            <p className='text-black'>{roomData.constructionYear} </p>
          </li> */}
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/elevator.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Elevator:
                </p>
                <p className="text-black">{roomData.elevator} </p>
              </li>
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/parking-sign.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Parking:
                </p>
                <p className="text-black">{roomData.parking ? 'Yes' : 'No'} </p>
              </li>
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/wifi.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Wi-Fi:
                </p>
                <p className="text-black">{roomData.wifi ? 'Yes' : 'No'} </p>
              </li>
              <li className="flex justify-between pb-2 border-b">
                <p>
                  <Image
                    src="/images/rooms/tv.png"
                    alt="Icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Cable TV:
                </p>
                <p className="text-black">{roomData.cableTV ? 'Yes' : 'No'} </p>
              </li>
            </ul>

            <h2 className="mt-6 mb-2 text-lg font-semibold">What's Nearby</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="pb-2 font-medium border-b">
                  <Image
                    src="/images/rooms/edu.png"
                    alt="Nearby icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Education
                </h3>
                <ul className="text-sm text-gray-700">
                  {roomData.title_education.map((group, index) => (
                    <li key={index} className="flex justify-between mb-2">
                      <p>{group.education}</p>
                      <p>{group.mile} mile</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="pb-2 font-medium border-b">
                  <Image
                    src="/images/rooms/health.png"
                    alt="Nearby icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Health & Medicine
                </h3>
                <ul className="text-sm text-gray-700">
                  {roomData.title_medicine.map((group, index) => (
                    <li key={index} className="flex justify-between mb-2">
                      <p>{group.medicine}</p>
                      <p>{group.mile} mile</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="pb-2 font-medium border-b">
                  <Image
                    src="/images/rooms/food.png"
                    alt="Nearby icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Food
                </h3>
                <ul className="text-sm text-gray-700">
                  {roomData.title_food.map((group, index) => (
                    <li key={index} className="flex justify-between mb-2">
                      <p>{group.food}</p>
                      <p>{group.mile} mile</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="pb-2 font-medium border-b">
                  <Image
                    src="/images/rooms/bank.png"
                    alt="Nearby icon"
                    width={24}
                    height={24}
                    className="inline-block mr-2"
                  />
                  Culture
                </h3>
                <ul className="text-sm text-gray-700">
                  {roomData.title_culture.map((group, index) => (
                    <li key={index} className="flex justify-between mb-2">
                      <p>{group.culture}</p>
                      <p>{group.mile} mile</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
    </div>
  );
}
