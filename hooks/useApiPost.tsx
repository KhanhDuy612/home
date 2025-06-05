'use client';

import instance from '@/axios/instance';
import { useMutation } from '@tanstack/react-query';

type PostOptions<T> = {
  path: string;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
};

export default function useApiPost<T = any>({ path, onSuccess, onError }: PostOptions<T>) {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await instance.post(path, data);
      return res.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
}
