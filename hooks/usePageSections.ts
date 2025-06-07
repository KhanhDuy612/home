'use client';

import useApiQuery from '@/hooks/useApiQuery';

export function usePageSections() {
  return useApiQuery<any[]>('/items/page_sections', { sort: 'order' });
}

export function useDataForSection(type: string) {
  const map: Record<string, string> = {
    featured: 'rooms',
    testimonial: 'global',
    contact: 'contact',
  };
  const collection = map[type];
  if (!collection) return { data: null };
  return useApiQuery<any[]>(`/items/${collection}`);
}