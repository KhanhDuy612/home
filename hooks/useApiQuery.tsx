'use client';

import instance from '@/axios/instance';
import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

export type ApiResponse<T> = {
  data: T;
};

export default function useApiQuery<T>(
  path: string,
  paramsObject?: Record<string, any>,
  options?: { refetchOnMount?: boolean }
) {
  // Deep memo hóa paramsObject, tránh refetch không cần thiết
  const key = ['directus', path, JSON.stringify(paramsObject ?? {})];

  // Cho phép custom fields qua paramsObject nếu muốn  
  const query = qs.stringify(
    {
      fields: '*.*',
      ...paramsObject,
    },
    {
      encodeValuesOnly: true,
    }
  );

  const queryResult = useQuery<ApiResponse<T>>({
    queryKey: key,
    queryFn: async () => {
      // Đảm bảo path không trùng // hoặc thiếu /
      const url = path.startsWith('/') ? path : `/${path}`;
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[useApiQuery] GET ${url}?${query}`);
      }
      const response = await instance.get(`${url}?${query}`);
      return response.data as ApiResponse<T>;
    },
    refetchOnMount: options?.refetchOnMount ?? false,
  });

  return queryResult;
}