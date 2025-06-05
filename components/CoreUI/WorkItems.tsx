'use client';

import ScrollFadeIn from '@/components/ScrollFadeIn/ScrollFadeIn';
import { chunk } from 'lodash';
import useMarginTop from '@/hooks/useMarginTop';
import 'react-toastify/dist/ReactToastify.css';
import { Work } from '../Artists/artist.interface';
import WorkItem from '../Artists/WorkItem';
import { useState, useRef } from 'react';

type WorkItemsProps = {
  works: Work[];
  title: string;
}

const priceRanges = [
  { label: "Up to $1000", min: 0, max: 1000 },
  { label: "$1000 - $10,000", min: 1000, max: 10000 },
  { label: "$10,000 - $50,000", min: 10000, max: 50000 },
  { label: "$50,000 and Up", min: 50000, max: Infinity },
];

export default function WorkItems({ works, title }: WorkItemsProps) {
  const { getMarginTop } = useMarginTop();
  const [selectedRange, setSelectedRange] = useState<{ min: number; max: number } | null>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleSelectRange = (range: { min: number; max: number } | null) => {
    setSelectedRange(range);
    if (detailsRef.current) {
      detailsRef.current.open = false; // đóng dropdown filter
    }
  };

  const filteredWorks = selectedRange
    ? works.filter(work => work.price >= selectedRange.min && work.price < selectedRange.max).sort((a, b) => a.price - b.price)
    : works;

  return (
    <section id="section_artist_works" className="text-gray-500">
      {works && works.length > 0 && (
        <ScrollFadeIn>
          <div className="flex justify-between">
            <h1 className="text-black title-section">{title}</h1>
            <div className="relative">
              <details className="dropdown" ref={detailsRef}>
                <summary className="cursor-pointer">Price</summary>
                <ul className="absolute right-0 z-10 p-2 text-black bg-white rounded shadow w-[200px]">
                  {priceRanges.map((range, idx) => (
                    <li
                      key={idx}
                      className="p-1 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectRange({ min: range.min, max: range.max })}
                    >
                      {range.label}
                    </li>
                  ))}
                  <li
                    className="p-1 text-red-500 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectRange(null)}
                  >
                    Clear Filter
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </ScrollFadeIn>
      )}

      <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorks.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No works found for the selected price range.
          </p>
        ) : (
          chunk(filteredWorks, Math.ceil(filteredWorks.length / 3)).map((column, colIndex) => (
            <div key={colIndex} className={`flex flex-col gap-4 ${getMarginTop(colIndex)}`}>
              {column.map((work) => (
                <div key={work.id} className="pb-10 mb-2">
                  <ScrollFadeIn>
                    <WorkItem workItem={work} />
                  </ScrollFadeIn>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
