// components/ScrollFadeIn.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

interface ScrollFadeInProps {
  children: React.ReactNode;
}

const ScrollFadeIn = ({ children }: ScrollFadeInProps) => {
  const { ref, inView } = useInView({
    threshold: 0.2, // 20% element visible
  });

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // mỗi lần scroll thấy => set lại visible
  useEffect(() => {
    const currentScrollY = window.scrollY;
    setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
    lastScrollY.current = currentScrollY;

    setVisible(inView);
    if(inView && !loaded) {
      setLoaded(true);
    }
  }, [inView, loaded]);

  return (
    <div className="">
      <motion.div
      className="z-10 "
        ref={ref}
        initial={{ opacity: 0, y: scrollDirection === 'down' ? -120 : 120 }}
        animate={
          visible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: scrollDirection === 'down' ? -120 : 120 }
        }
        transition={{
          opacity: { duration: 2.5, ease: [0.18, 1, 0.21, 1] },
          y: { duration: 4, ease: [0.18, 1, 0.21, 1] },
        }}
        style={{ transform: 'none' }}
      >
        {!loaded && (
          <div className="h-[500px]">
            <div className="w-full h-full"></div>
          </div>
        )}
        {loaded && <>{children}</>}
      </motion.div>
    </div>
  );
};

export default ScrollFadeIn;
