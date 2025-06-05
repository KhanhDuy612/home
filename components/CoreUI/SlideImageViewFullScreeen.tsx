'use client';

import { useState, useMemo, useEffect } from 'react';
import type { DirectusFile } from '@/components/Exhibitions/exhibition.interface';
import CloseButton from '@/components/CoreUI/CloseButton';

type Props = {
  files: DirectusFile[];
  initIndex: number;
  onClose: () => void;
};

export default function SlideImageViewFullScreeen({
  files,
  initIndex,
  onClose,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(initIndex);
  const maxIndex = useMemo(
    () => files.length - 1,
    [files]
  );

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setSelectedIndex(prev => {
          const newIndex = prev + 1 > files.length - 1 ? 0 : prev + 1;
          return newIndex;
        });
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex(prev => {
          const newIndex = prev - 1 < 0 ? files.length - 1 : prev - 1;
          return newIndex;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [files.length, selectedIndex]); // Added selectedIndex to dependencies

  const isAtStart = useMemo(() => selectedIndex === 0, [selectedIndex]);
  const isAtEnd = useMemo(() => selectedIndex === maxIndex, [selectedIndex, maxIndex]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-white">
      <CloseButton onClick={onClose} />
      <div className="flex items-center justify-center w-full h-full">
        <img
          key={files[selectedIndex].id}
          src={files[selectedIndex].directus_files_id}
          alt={`Installation view ${selectedIndex + 1}`}
          className="object-contain w-full h-auto max-w-[80wh] max-h-[80vh] cursor-pointer"
          suppressHydrationWarning
        />
      </div>
      {!isAtStart && (
        <button
          onClick={() => setSelectedIndex(selectedIndex - 1)}
          className="absolute top-1/2 left-0 z-10 px-3 h-24 bg-white/80 hover:bg-white mb-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      {!isAtEnd && (
        <button
          onClick={() => setSelectedIndex(selectedIndex + 1)}
          className="absolute top-1/2 right-0 z-10 h-24 p-2 shadow-md bg-white/80 hover:bg-white mb-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
