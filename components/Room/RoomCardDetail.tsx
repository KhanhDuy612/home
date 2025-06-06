
import { Room } from "./Room";



interface Props {
  room: Room;
}



export default function RoomCardDetail({ room }: Props) {
  return (
    <div className="max-w-4xl p-6 mx-auto bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">{room.title}</h1>
      <p className="text-gray-600">{room.address}</p>
      <img
        src={room.imageUrl}
        alt={room.title}
        className="object-cover w-full h-64 my-4 rounded"
      />
      <p className="mb-4 text-gray-700">{room.description}</p>

      <h2 className="mt-6 mb-2 text-lg font-semibold">Property Details</h2>
      <ul className="grid grid-cols-2 gap-2 text-sm text-gray-800">
        <li>Total area: {room.propertyDetails.totalArea}</li>
        <li>Bedrooms: {room.propertyDetails.bedrooms}</li>
        <li>Bathrooms: {room.propertyDetails.bathrooms}</li>
        <li>Floor: {room.propertyDetails.floor}</li>
        <li>Year: {room.propertyDetails.constructionYear}</li>
        <li>Elevator: {room.propertyDetails.elevator}</li>
        <li>Parking: {room.propertyDetails.parking ? 'Yes' : 'No'}</li>
        <li>Wi-Fi: {room.propertyDetails.wifi ? 'Yes' : 'No'}</li>
        <li>Cable TV: {room.propertyDetails.cableTV ? 'Yes' : 'No'}</li>
      </ul>

      <h2 className="mt-6 mb-2 text-lg font-semibold">What's Nearby</h2>
      {room.nearby.map((group) => (
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
      ))}
    </div>
  );
}
