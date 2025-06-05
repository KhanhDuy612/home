'use client';

import { useState, useEffect } from 'react';

export enum Breakpoint {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = '2xl',
}
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.sm);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setBreakpoint(Breakpoint.sm);
        setIsMobile(true);
      } else if (width < 768) {
        setBreakpoint(Breakpoint.md);
        setIsMobile(true);
      } else if (width < 1024) {
        setBreakpoint(Breakpoint.lg);
        setIsMobile(true);
      } else if (width < 1280) {
        setBreakpoint(Breakpoint.xl);
        setIsMobile(false);
      } else {
        setBreakpoint(Breakpoint.xxl);
        setIsMobile(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {breakpoint, isMobile};
};

export default useBreakpoint;
