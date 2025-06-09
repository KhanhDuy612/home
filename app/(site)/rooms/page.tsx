'use client';
import FeaturedProperties from '@/components/Room';
import useApiQuery from '@/hooks/useApiQuery';

export default function RoomListPage() {
  const { data: roomData } = useApiQuery<any>(`/items/rooms`,);
  if (!roomData || !roomData.data) {
    console.error('No room data found');
    return <div>No room data available</div>;
  }
  const rooms = roomData.data;
  return (
    <div>
      <FeaturedProperties data={rooms} />
    </div>
  );
}
