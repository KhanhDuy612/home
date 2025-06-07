'use client';

import { usePageSections } from '@/hooks/usePageSections';
import SectionRenderer from '../SectionRender';

export default function HomePage() {
  const { data: sections, isLoading } = usePageSections();

  if (isLoading) return <div>Loading sections...</div>;
  if (!sections?.data) return <div>No sections found.</div>;

  return (
    <>
      {sections.data.map((section: any) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}