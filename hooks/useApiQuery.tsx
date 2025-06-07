'use client';

import instance from '@/axios/instance';
import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

export type ApiResponse<T> = {
  data: T;
};

export default function useApiQuery<T>(path: string, paramsObject?: any) {
  const key = ['directus', path, paramsObject];

  const query = qs.stringify(
    {
      fields: '*.*',
      ...paramsObject,
    },
    {
      encodeValuesOnly: true,
    }
  );

  const useRewardQuery = useQuery({
    queryKey: key,
    queryFn: async () => {
      console.log(`[useApiQuery] GET ${path}?${query}`); // ✅ debug URL
      const response = await instance.get(`${path}?${query}`);
      return response.data as ApiResponse<T>;
    },
    refetchOnMount: false,
  });

  return useRewardQuery;
}
