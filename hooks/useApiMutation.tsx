'use client';

import instance from '@/axios/instance';
import { useMutation } from '@tanstack/react-query';

const DIRECTUS_API_URL = process.env.NEXT_PUBLIC_DIRECTUS_API_URL || 'https://test-cms-art-gallery.hcm57.vn';
const DIRECTUS_API_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_API_TOKEN;

export default function useApiMutation<T = any>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await instance.request<T>({
        url: path,
        method,
        data: payload,
      });
      return response.data;
    },
  });
}
