import axios from 'axios';

export async function apiPatch<T = any>(url: string, data: any, config?: any): Promise<T> {
  const res = await axios.patch(url, data, config);
  return res.data;
}