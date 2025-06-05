'use client';

import { useCallback } from 'react';
import useBreakpoint, { Breakpoint } from './useBreakPoint';

const useMarginTop = () => {
  const {breakpoint} = useBreakpoint();

  const getMarginTop = useCallback((index: number): string => {
    if ([Breakpoint.lg, Breakpoint.xl, Breakpoint.xxl].includes(breakpoint)) {
      switch (index) {
        case 0:
          return 'mt-0';
        case 1:
          return 'mt-30';
        case 2:
          return 'mt-15';
        default:
          return 'mt-0';
      }
    }

    if ([Breakpoint.md].includes(breakpoint)) {
      switch (index) {
        case 0:
          return 'mt-0';
        case 1:
          return 'mt-30';
        default:
          return 'mt-0';
      }
    }

    return 'mt-0';
  }, [breakpoint]);
  return { getMarginTop };
};

export default useMarginTop;
