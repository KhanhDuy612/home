import instance from '@/axios/instance';

export async function apiPost<T = any>(path: string, data?: any, config?: any): Promise<T> {
  const url = path.startsWith('/') ? path : `/${path}`;
  const response = await instance.post(url, data, config);
  return response.data as T;
}

export async function apiPatch<T = any>(path: string, data?: any, config?: any): Promise<T> {
  const url = path.startsWith('/') ? path : `/${path}`;
  const response = await instance.patch(url, data, config);
  return response.data as T;
}