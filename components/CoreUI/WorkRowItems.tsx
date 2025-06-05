'use client';

import ScrollFadeIn from '@/components/ScrollFadeIn/ScrollFadeIn';
import 'react-toastify/dist/ReactToastify.css';
import { Work } from '../Artists/artist.interface';
import WorkItem from '../Artists/WorkItem';
import { Suspense, useState } from 'react';
import PriceSelect from './PriceSelect';

type WorkItemsProps = {
  works: Work[];
  title: string;
};

export default function WorkRowItems({ works, title }: WorkItemsProps) {
  const [selectedRange, setSelectedRange] = useState<{ min: number; max: number } | null>(null);
  const filteredWorks = selectedRange
    ? works
        .filter(work => work.price >= selectedRange.min && work.price < selectedRange.max)
        .sort((a, b) => a.price - b.price)
    : works;

  return (
    <section id="section_artist_works" className="text-gray-500">
      {works && works.length > 0 && (
        <div className="flex items-center justify-between">
          <h1 className="text-black title-section">{title}</h1>
          <Suspense>
            <PriceSelect onChange={setSelectedRange} />
          </Suspense>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorks.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No works found for the selected price range.
          </p>
        ) : (
          filteredWorks.map(work => (
            <div key={work.id} className="flex items-end pb-10 mb-2">
              <ScrollFadeIn>
                <WorkItem workItem={work} />
              </ScrollFadeIn>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
