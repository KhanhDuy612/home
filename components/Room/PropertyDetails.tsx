import Image from 'next/image';

interface PropertyDetailsProps {
  roomData: {
    total_area: number;
    bedrooms: number;
    bathrooms: number;
    floor: number;
    elevator: string;
    parking: boolean;
    wifi: boolean;
    cableTV: boolean;
  };
}

export default function PropertyDetails({ roomData }: PropertyDetailsProps) {
  return (
    <>
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
    </>
  );
}