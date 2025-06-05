// components/ScrollFadeIn.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [currentPosition, setCurrentPosition] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if(currentScrollY > lastScrollY.current + 100){
        setScrollDirection('down');
        lastScrollY.current = currentScrollY;
      } else if(currentScrollY < lastScrollY.current - 100){
        setScrollDirection('up');
        lastScrollY.current = currentScrollY;
      }
      setCurrentPosition(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollDirection, currentPosition };
};

export default useScrollDirection;
