import axios from 'axios';
import { setupInterceptorsTo } from './interceptor';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DIRECTUS_API_URL || 'https://test-cms-art-gallery.hcm57.vn',
});

setupInterceptorsTo(instance);

export default instance;
