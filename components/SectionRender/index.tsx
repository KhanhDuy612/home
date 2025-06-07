'use client';

import { useDataForSection } from '@/hooks/usePageSections';
import FeaturedProperties from '../Room';
import Testimonial from '../Testimonial';
import ContactForm from '../ContactForm';

export default function SectionRenderer({ section }: { section: any }) {
  switch (section.section_type) {
    case 'featured': {
      const { data } = useDataForSection('featured');
      if (!data?.data) return null;
      return <FeaturedProperties key={section.id} data={data.data} />;
    }
    case 'testimonial': {
      const { data } = useDataForSection('testimonial');
      if (!data?.data) return null;
      return <Testimonial key={section.id} data={data.data} />;
    }
    case 'contact':
      return <ContactForm key={section.id} />;
    default:
      return null;
  }
}