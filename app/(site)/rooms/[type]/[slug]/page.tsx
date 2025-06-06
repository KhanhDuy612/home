import RoomCardDetail from '@/components/Room/RoomCardDetail';
import { mockRooms } from '@/data/mockRooms';

interface Props {
  params: {
    type: string;
    slug: string;
  };
}

async function fetchRoom(type: string, slug: string) {
  return mockRooms.find((r) => r.type === type && r.slug === slug);
}

export default async function RoomDetailPage({ params }: Props) {
  const { type, slug } = await params;

  const room = await fetchRoom(type, slug);

  if (!room) {
    return (
      <div className="mt-20 text-xl text-center text-red-500">
        Room not found.
      </div>
    );
  }

  return (
    <main className="p-4">
      <RoomCardDetail room={room} />
    </main>
  );
}