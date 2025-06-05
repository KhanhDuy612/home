import useApiQuery from '@/hooks/useApiQuery';

export default function Head() {
  const { data } = useApiQuery<any>('/items/global');
  const headData = data?.data;
  const DIRECTUS_URL =
    process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-cms-art-gallery.hcm57.vn/assets';

  const imageUrl = headData?.logo 
    ? `${DIRECTUS_URL}/${headData.logo}`
    : "https://test-cms-art-gallery.hcm57.vn/assets/811ee1c3-e3f4-468c-8876-b92f39c938d2";

  return (
    <>
      <title>{headData?.siteName || "HOMESTAY"}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={`${headData?.metaDescription || "Welcome to our homestay – your cozy home away from home, where booking a room is simple and your perfect stay begins!"}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
      <meta property="og:title" content={headData?.siteName || "HOMESTAY"} />
      <meta property="og:description" content={headData?.metaDescription} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
      <meta name="twitter:title" content={headData?.siteName || "HOMESTAY"} />
      <meta name="twitter:description" content={headData?.metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="icon" href={`${DIRECTUS_URL}/${headData?.favicon}` || "/images/favicon.ico"} />
    </>
  );
}
