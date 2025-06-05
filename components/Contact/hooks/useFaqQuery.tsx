'use client';

import instance from '@/axios/instance';
import { useQuery } from '@tanstack/react-query';
import { FaqCategory } from '../faq.interface';

export default function useFaqQuery() {
  const key = ['strapi', 'faq_category'];


  const getPrams = () => {
    return {
        fields: ['*', 'faqs.*']
    };
  };

  const useRewardQuery = useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await instance.get('/items/faq_category', { params: getPrams() });
      const items = response.data.data as FaqCategory[];
      return items || [];
    },
    refetchOnMount: false
  });

  return useRewardQuery;
}
