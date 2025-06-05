'use client';

import { useCallback, useMemo, useState } from 'react';
import useBreakpoint, { Breakpoint } from './useBreakPoint';
import { chunk } from 'lodash';

const useChunkColumn = <T>() => {
  const {breakpoint} = useBreakpoint();
  const chunkColumn = useCallback(
    (items: T[]) => {
      const itemsArray = items || [];
      let columns: number;
      
      switch (breakpoint) {
        case Breakpoint.sm:
          columns = 1;
          break;
        case Breakpoint.md:
          columns = 2;
          break;
        default:
          columns = 3;
      }

      // Create empty columns
      const columnChunks: T[][] = Array.from({ length: columns }, () => []);
      
      // Distribute items vertically into columns
      itemsArray.forEach((item, index) => {
        const columnIndex = index % columns;
        columnChunks[columnIndex].push(item);
      });
      
      return columnChunks;
    },
    [breakpoint]
  );

  return { chunkColumn };
};

export default useChunkColumn;
