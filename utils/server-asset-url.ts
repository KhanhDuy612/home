// Helper function to generate asset URLs in server components
export const getServerAssetUrl = (filename?: string): string => {
  if (!filename) return '';
  // Use environment variables with fallback values
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-cms-art-gallery.hcm57.vn/assets';
  return `${baseUrl}/${filename}`;
};
