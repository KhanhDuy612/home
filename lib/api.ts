export async function getPageSections() {
  const res = await fetch(
    'https://test-homestay-cms.hcm57.vn/items/page_sections?sort=order',
    {
      headers: {
        Authorization: 'Bearer UySGG1SgDsJ5HCMg8O3Q6botOcFb2ZQa',
      },
      next: { revalidate: 60 },
    }
  );
  const json = await res.json();
  console.log('Page sections:', json);

  return json?.data || [];
}

export async function getDataForSection(type: string) {
  const map: Record<string, string> = {
    featured: 'rooms',
    testimonial: 'global',
    contact: 'contact',
  };

  const collection = map[type];
  if (!collection) return null;

  const res = await fetch(`https://test-homestay-cms.hcm57.vn/items/${collection}`,
    {
      headers: {
        Authorization: 'Bearer UySGG1SgDsJ5HCMg8O3Q6botOcFb2ZQa',
      },
    }
  );
  const json = await res.json();
  console.log(`Data for section ${type}:`, json);
  
  return json?.data || null;
}
