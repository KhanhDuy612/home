// components/ScrollFadeIn.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import React, { useEffect, useRef, useState } from 'react';

interface InViewProps {
  children: React.ReactNode;
  className?: string;
  onInView?: () => void;
}

const InView = ({ children, className, onInView }: InViewProps) => {
  const { ref, inView } = useInView({
    threshold: 0.4, // 10% element visible
  });

  useEffect(() => {
    if (inView) {
      onInView?.();
    }
  }, [inView]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default InView;
