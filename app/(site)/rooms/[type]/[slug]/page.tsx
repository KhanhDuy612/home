'use client';

import { useParams } from 'next/navigation';
import useApiQuery from '@/hooks/useApiQuery';
import RoomCardDetail from '@/components/Room/RoomCardDetail';

export default function RoomDetailPage() {
  const params = useParams();

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
      fields: '*,image.*,future_img.*',
    }
  )

  const room = roomData?.data;
  
  if (!room) {
    return <div className="p-4">Room not found</div>;
  }

  return (
    <div className="p-4">
      <RoomCardDetail room={room} />
    </div>
  );
}
