'use client';

import Link from 'next/link';
import { useState } from 'react';

interface DesktopNavigationProps {
  headerData: any[];
  isActive: (path: string) => boolean;
  headerActive: string;
  headerHover: string;
  setShowMenuPrice: (show: boolean, href?: string) => void;
  setPositionPriceMenu: (x: number, y: number) => void;
  whiteHeader: boolean;
  totalQuantity: number;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  headerData,
  headerActive,
  headerHover,
  isActive,
  setShowMenuPrice,
  setPositionPriceMenu,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="hidden lg:block">
      <ul className="flex uppercase text-[16px] font-medium tracking-[1.74px]">
        {headerData?.slice(0,3)?.map((item, index) => {
          const isActiveLink = isActive(item.href);
          const isHovered = hoveredIndex === index;

          const linkStyle = {
            backgroundColor: isActiveLink ? headerActive : isHovered ? headerHover : undefined,
            padding: '8px 12px',
            borderRadius: '2px',
            transition: 'background-color 0.2s ease',
          };

          return (
            <li key={index} className="mr-[15px]">
              <Link
                href={item.href}
                style={linkStyle}
                className="inline-block"
                onMouseEnter={e => {
                  setHoveredIndex(index);
                  if (item.showPriceFilter) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.preventDefault();
                    setShowMenuPrice(true, item.href);
                    setPositionPriceMenu(rect.x, rect.y);
                  } else {
                    setShowMenuPrice(false);
                  }
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
