'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface TabletNavigationProps {
  headerDataFirstHalf: any[];
  headerDataSecondHalf: any[];
  isActive: (path: string) => boolean;
  setShowMenuPrice: (show: boolean, href?: string) => void;
  setPositionPriceMenu: (x: number, y: number) => void;
  whiteHeader: boolean;
  totalQuantity: number;
  headerActive: string;
  headerHover: string;
}

const TabletNavigation: React.FC<TabletNavigationProps> = ({
  headerDataFirstHalf,
  headerDataSecondHalf,
  isActive,
  setShowMenuPrice,
  setPositionPriceMenu,
  whiteHeader,
  totalQuantity,
  headerActive,
  headerHover,
}) => {
  const [hoveredIndexFirst, setHoveredIndexFirst] = useState<number | null>(null);
  const [hoveredIndexSecond, setHoveredIndexSecond] = useState<number | null>(null);

  return (
    <div className="items-start justify-end hidden w-full space-x-6 lg:flex 2xl:hidden">
      <nav>
        {/* First half */}
        <ul className="flex uppercase text-[16px] font-medium tracking-[1.74px] space-x-[25px] items-center justify-end mb-4">
          {headerDataFirstHalf?.map((item, index) => {
            const isActiveLink = isActive(item.href);
            const isHovered = hoveredIndexFirst === index;

            const style = {
              backgroundColor: isActiveLink
                ? headerActive
                : isHovered
                ? headerHover
                : undefined,
              color: isActiveLink || isHovered ? '#fff' : undefined,
              padding: '8px 12px',
              borderRadius: '2px',
              transition: 'background-color 0.2s ease',
            };

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  style={style}
                  className="inline-block"
                  onMouseEnter={(e) => {
                    setHoveredIndexFirst(index);
                    if (item.showPriceFilter) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setShowMenuPrice(true, item.href);
                      setPositionPriceMenu(rect.x, rect.y);
                    } else {
                      setShowMenuPrice(false);
                    }
                  }}
                  onMouseLeave={() => setHoveredIndexFirst(null)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Second half */}
        <ul className="flex uppercase text-[16px] font-medium tracking-[1.74px] space-x-[25px] items-center justify-end">
          {headerDataSecondHalf?.map((item, index) => {
            const isActiveLink = isActive(item.href);
            const isHovered = hoveredIndexSecond === index;

            const style = {
              backgroundColor: isActiveLink
                ? headerActive
                : isHovered
                ? headerHover
                : undefined,
              color: isActiveLink || isHovered ? '#fff' : undefined,
              padding: '8px 12px',
              borderRadius: '2px',
              transition: 'background-color 0.2s ease',
            };

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  style={style}
                  className=""
                  onMouseEnter={() => setHoveredIndexSecond(index)}
                  onMouseLeave={() => setHoveredIndexSecond(null)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Cart */}
      <div className="flex items-center h-full">
        <div className="relative top-[10px]">
          <Link href="/cart" className="flex items-center gap-1">
            {whiteHeader ? (
              <ShoppingCart color="#ffffff" />
            ) : (
              <ShoppingCart color="#010101" />
            )}
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[11px] px-[6px] py-[2px] rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TabletNavigation;
