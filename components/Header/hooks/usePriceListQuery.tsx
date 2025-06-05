'use client';

import instance from '@/axios/instance';
import { useQuery } from '@tanstack/react-query';
import { IPriceList } from '../header.interface';

export default function usePriceListQuery() {
  const key = ['strapi', 'price_list'];

  const useRewardQuery = useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await instance.get('/items/price_list', { params: { filter: { id: { _eq: 1 } } } });
      const items = response.data.data as IPriceList[];
      return items?.[0] || null;
    },
    refetchOnMount: false,
  });

  return useRewardQuery;
}
