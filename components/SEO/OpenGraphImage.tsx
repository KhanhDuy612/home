'use client';

import React from 'react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

interface OpenGraphImageProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  type?: string;
}

/**
 * Component này có thể được sử dụng cho các trang client component trong App Router
 */
const OpenGraphImage: React.FC<OpenGraphImageProps> = ({
  title = 'GALLERY ALEXANDRIA',
  description = 'Gallery chuyên các tác phẩm nghệ thuật đương đại.',
  url,
  imageUrl = 'https://test-cms-art-gallery.hcm57.vn/assets/811ee1c3-e3f4-468c-8876-b92f39c938d2',
  type = 'website',
}) => {
  // Sử dụng hook để quản lý meta tags
  useDocumentMeta({
    title,
    description,
    url,
    imageUrl,
    type,
  });

  // Component này không cần render bất kỳ UI nào
  return null;
};

export default OpenGraphImage;
