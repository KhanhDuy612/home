'use client';

import instance from '@/axios/instance';
import { useQuery } from '@tanstack/react-query';

export type ApiResponse<T> = {
  data: T;
};

export default function useApiQuery<T>(path: string, paramsObject?: any) {
  const key = ['strapi', path, paramsObject];
  const useRewardQuery = useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await instance.get(path, { params: paramsObject });
      return response.data as ApiResponse<T>;
    },
    refetchOnMount: false,
  });

  return useRewardQuery;
}
