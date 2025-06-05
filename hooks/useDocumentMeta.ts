'use client';

import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  type?: string;
}

const DEFAULT_META = {
  title: 'GALLERY ALEXANDRIA',
  description: 'Gallery chuyên các tác phẩm nghệ thuật đương đại.',
  imageUrl: 'https://test-cms-art-gallery.hcm57.vn/assets/811ee1c3-e3f4-468c-8876-b92f39c938d2',
  type: 'website',
} as const;

/**
 * Hook quản lý các thẻ meta trong document head
 * Sử dụng cho client components trong Next.js App Router
 */
export default function useDocumentMeta({
  title = DEFAULT_META.title,
  description = DEFAULT_META.description,
  url,
  imageUrl = DEFAULT_META.imageUrl,
  type = DEFAULT_META.type,
}: MetaTagsProps): void {
  useEffect(() => {
    if (typeof window === 'undefined' || !document.head) return;

    const currentUrl = url || window.location.href;

    // Update document title
    document.title = title;

    // Define meta tags to be updated
    const metaTags = [
      // Open Graph tags
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: currentUrl },
      { property: 'og:image', content: imageUrl },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ];

    // Track created meta tags
    const createdTags: Element[] = [];

    // Update or create meta tags
    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);

      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) metaTag.setAttribute('property', property);
        if (name) metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
        createdTags.push(metaTag);
      }

      metaTag.setAttribute('content', content);
    });

    // Cleanup function
    return () => {
      if (typeof window === 'undefined' || !document.head) return;

      // Only remove tags that we created
      createdTags.forEach(tag => {
        try {
          if (tag && tag.parentNode === document.head) {
            document.head.removeChild(tag);
          }
        } catch (error) {
          console.warn('Failed to remove meta tag:', error);
        }
      });
    };
  }, [title, description, url, imageUrl, type]);
}
