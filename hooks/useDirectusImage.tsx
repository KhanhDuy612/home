const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL ||
  'https://test-homestay-cms.hcm57.vn/assets';

export default function useDirectusImage(imageId?: string) {
  if (!imageId) return '';
  return `${DIRECTUS_URL}/${imageId}`;
}