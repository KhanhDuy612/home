'use client';

import './index.css';
import { ISubHeader } from './header.interface';
import React from 'react';
import useBreakpoint from '@/hooks/useBreakPoint';
import Link from 'next/link';

type SubHeaderProps = {
  subHeader: ISubHeader | null;
  visible: boolean;
};

export default function SubHeader({ subHeader, visible }: SubHeaderProps) {
  const {isMobile} = useBreakpoint();
  if(isMobile) return null;
  return (
    <>
      {subHeader && (
        <div
          className={`px-15 absolute top-1/2 left-0 right-0 z-30 ${visible ? '-translate-y-1/2' : 'translate-y-full'} transition-all duration-500 ease-in-out transform`}
        >
          {/* Main header content */}
          <div className="flex justify-between items-center text-[#010101] py-[28px]">
            <h1 className="text-xl tracking-wider mt-[4px] text-center pr-2 md:pr-0">
              <Link href="/" className="text-[19px] tracking-[8px] font-medium uppercase">
                {subHeader.name}
              </Link>
            </h1>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:block">
              <ul className="flex uppercase lg:text-[12px] font-medium tracking-[1.74px]">
                {subHeader.items.map(item => (
                  <React.Fragment key={item.name}>
                    {!item.isHidden && (
                      <li
                        className="mr-[25px] cursor-pointer"
                        key={item.name}
                        onClick={
                          item.callback
                            ? e => {
                                e.preventDefault();
                                item.callback();
                              }
                            : () => {}
                        }
                      >
                        <a className={item.isActive ? 'active-link' : 'hover-underline-animation'}>
                          {item.name}
                        </a>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
