import BannerSlider from '@/components/BannerSlider';
import ContactForm from '@/components/ContactForm';
import FeaturedProperties from '@/components/Room';
import RoomCardDetail from '@/components/Room/RoomCardDetail';
import Testimonial from '@/components/Testimonial';
import type { Metadata } from 'next';


export default function Home() {
  return (
    <main>
      <div className="-mx-4 md:-mx-6">
        <BannerSlider />
        <FeaturedProperties />
        <Testimonial />
        <ContactForm />
      </div>
    </main>
  );
}
