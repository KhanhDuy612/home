import Image from 'next/image';

interface NearbyProps {
  roomData: {
    title_education: { education: string; mile: number }[];
    title_medicine: { medicine: string; mile: number }[];
    title_food: { food: string; mile: number }[];
    title_culture: { culture: string; mile: number }[];
  };
}

export default function Nearby({ roomData }: NearbyProps) {
  return (
    <>
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
    </>
  );
}