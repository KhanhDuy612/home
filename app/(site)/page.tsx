import BannerSlider from '@/components/BannerSlider';
import ContactForm from '@/components/ContactForm';
import Room from '@/components/FeaturedProperties';
import Testimonial from '@/components/Testimonial';
import type { Metadata } from 'next';

// Function to fetch global metadata from API
async function getGlobalData() {
  try {
    const apiBase =
      process.env.NEXT_PUBLIC_DIRECTUS_API_URL?.replace(/\/+$/, '') ||
      'https://test-cms-art-gallery.hcm57.vn/api';
    const token = process.env.NEXT_PUBLIC_DIRECTUS_API_TOKEN;

    const res = await fetch(`${apiBase}/items/global`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) throw new Error(`Failed: ${res.status}`);

    const json = await res.json();
    return json?.data;
  } catch (error) {
    console.error('Error fetching global metadata:', error);
    return null;
  }
}

// Generate metadata for home page
export async function generateMetadata(): Promise<Metadata> {
  const globalData = await getGlobalData();
  const DIRECTUS_URL =
    process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-cms-art-gallery.hcm57.vn/assets';

  const siteName = globalData?.siteName || 'GALLERY ALEXANDRIA';
  const description =
    globalData?.metaDescription ||
    'Introducing Alexandrianile Art Gallery, a distinguished hub for art enthusiasts seeking exquisite paintings that transcend boundaries. Nestled in the heart of creativity, Alexandrianile stands as a premier art destination, offering a curated collection of captivating artworks that showcase the intersection of tradition and innovation.';

  const imageUrl = globalData?.logo
    ? `${DIRECTUS_URL}/${globalData.logo}`
    : 'https://test-cms-art-gallery.hcm57.vn/assets/811ee1c3-e3f4-468c-8876-b92f39c938d2';

  return {
    title: siteName,
    description: description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      siteName: siteName,
      title: siteName,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: description,
      images: [imageUrl],
    },
  };
}

export default function Home() {
  return (
    <main>
      <div className="-mx-4 md:-mx-6">
        <BannerSlider />
        <Room />
        <Testimonial />
        <ContactForm />
      </div>
    </main>
  );
}
