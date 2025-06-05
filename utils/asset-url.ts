const getAssetUrl = (filename: string) => {
  return `${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL}/${filename}`;
};

export default getAssetUrl;
