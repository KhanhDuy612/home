'use client';

import { useParams } from 'next/navigation';
import useApiQuery from '@/hooks/useApiQuery';
import RoomCardDetail from '@/components/Room/RoomCardDetail';

export default function RoomDetailPage() {
  const params = useParams();
  console.log('RoomDetailPage params:', params);
  

  const { data: roomData } = useApiQuery<any>(
    `/items/rooms`,
    {
      populate: '*',
      filter: {
        type: {
          _eq: params.type,
        },
        slug: {
          _eq: params.slug,
        },
      },
    }
  )

  const room = roomData?.data;
  console.log('Room data1111:', room);

  
  
  if (!room) {
    return <div className="p-4">Room not found</div>;
  }

  return (
    <div className="p-4">
      <RoomCardDetail room={room} />
    </div>
  );
}
