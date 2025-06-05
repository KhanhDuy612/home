import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  const onRequest = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig<any>> => {
    try {
      const accessToken = process.env.NEXT_PUBLIC_DIRECTUS_API_TOKEN || '';
      config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      console.log('🚀 ~ file: interceptors.ts:18 ~ onRequest ~ error:', error);
    } finally {
      return config;
    }
  };

  const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const onResponseError = async (axiosError: AxiosError): Promise<AxiosError> => {
    try {
      return Promise.reject(axiosError);
    } catch (error) {
      return Promise.reject(axiosError);
    }
  };

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
