import { Metadata, ResolvingMetadata } from 'next';
import instance from '@/axios/instance';

type Props = {
  params: { work_id: string };
};

async function getWorkDetail(work_id: string) {
  try {
    const params = {
      filter: {
        id: {
          _eq: work_id,
        },
      },
      fields: ['*', 'artist.*', 'cover_image.*'],
    };

    const response = await instance.get('/items/works', { params });
    const works = response.data.data;
    return works[0] || null;
  } catch (error) {
    console.error('Error fetching work detail:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const work_id = params.work_id;
  const workDetail = await getWorkDetail(work_id);

  // Nếu không lấy được thông tin, trả về metadata mặc định
  if (!workDetail) {
    return {
      title: 'Artwork | GALLERY ALEXANDRIA',
    };
  }

  // Lấy metadata cha từ layout.tsx
  const previousMetadata = await parent;

  // Xử lý description (loại bỏ HTML tags)
  const cleanDescription = workDetail.description
    ? workDetail.description.replace(/<[^>]*>|&[^;]+;/g, '').substring(0, 160) + '...'
    : `${workDetail?.material || ''} artwork by ${workDetail?.artist?.full_name || ''} at GALLERY ALEXANDRIA`;

  // URL của ảnh
  const DIRECTUS_URL =
    process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-cms-art-gallery.hcm57.vn/assets';
  // Xử lý URL hình ảnh - kiểm tra kiểu dữ liệu của images[0]
  let fallbackImageUrl = '';
  const ogImage = previousMetadata.openGraph?.images?.[0];
  if (ogImage && typeof ogImage === 'object' && 'url' in ogImage) {
    fallbackImageUrl = ogImage.url as string;
  } else if (typeof ogImage === 'string') {
    fallbackImageUrl = ogImage;
  }

  const imageUrl = workDetail.cover_image
    ? `${DIRECTUS_URL}/${workDetail.cover_image}`
    : fallbackImageUrl ||
      'https://test-cms-art-gallery.hcm57.vn/assets/811ee1c3-e3f4-468c-8876-b92f39c938d2';

  return {
    title: `${workDetail.title} | ${workDetail?.artist?.full_name || 'GALLERY ALEXANDRIA'}`,
    description: cleanDescription,
    openGraph: {
      title: `${workDetail.title} | ${workDetail?.artist?.full_name || 'GALLERY ALEXANDRIA'}`,
      description: cleanDescription,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: workDetail.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${workDetail.title} | ${workDetail?.artist?.full_name || 'GALLERY ALEXANDRIA'}`,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}
