'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useHeaderState from './useHeaderState';

const useResetSubHeader = () => {
  const pathname = usePathname();
  const { reset } = useHeaderState();

  useEffect(() => {
    reset();
  }, [pathname, reset]);
};

export default useResetSubHeader;
