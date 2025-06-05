'use client';

import './index.css';
import { useState, useEffect, useContext, useMemo } from 'react';
import { CartContext } from '@/app/context/CartContent';
import useResetSubHeader from './hooks/useResetSubHeader';
import useScrollDirection from '@/hooks/useScrollDirection';
import useHeaderState from './hooks/useHeaderState';
import SubHeader from './SubHeader';
import useApiQuery from '@/hooks/useApiQuery';
import useBreakpoint, { Breakpoint } from '@/hooks/useBreakPoint';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart } from 'lucide-react';
import SubMenuPrice from './SubMenuPrice';
import DesktopNavigation from './DesktopNavigation';
import TabletNavigation from './TabletNavigation';
export default function Header() {
  useResetSubHeader();
  const pathname = usePathname();

  const {
    subHeader,
    color,
    setIsWhiteHeader,
    isAtTop,
    setIsAtTop,
    mobileMenuOpen,
    setMobileMenuOpen,
    showMenuPrice,
  } = useHeaderState();
  const { scrollDirection } = useScrollDirection();
  const { isMobile } = useBreakpoint();

  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const { cartItems } = useContext(CartContext);

  const visibleMainHeader = useMemo(() => {
    return scrollDirection === 'up' || isAtTop;
  }, [scrollDirection, isAtTop]);

  const visibleSubHeader = useMemo(() => {
    return scrollDirection === 'down' && !!subHeader && !isMobile;
  }, [scrollDirection, subHeader, isMobile]);

  const whiteHeader = useMemo(() => color === 'white' && isAtTop, [color, isAtTop]);

  useEffect(() => {
    setIsWhiteHeader(whiteHeader);
  }, [whiteHeader]);

  const { setShowMenuPrice, setPositionPriceMenu } = useHeaderState();
  const { data } = useApiQuery<any>('/items/header');

  const headerData = data?.data?.pages;
  const header = data?.data;
  const headerDataFirstHalf = headerData?.slice(0, Math.ceil(headerData.length / 2));
  const headerDataSecondHalf = headerData?.slice(Math.ceil(headerData.length / 2));
  const headerActive = header?.active;
  const headerHover = header?.hover;

  const DIRECTUS_URL =
    process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL || 'https://test-cms-art-gallery.hcm57.vn/assets';

  useEffect(() => {
    setPrevScrollPos(window.scrollY);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      // Check if at the top
      setIsAtTop(currentScrollPos < 100);

      // Save current scroll position
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen, prevScrollPos]);

  const isActive = path => pathname.startsWith(path);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Desktop Header */}
      <header
        suppressHydrationWarning
        id="header"
        className={`z-40 px-10 flex flex-col bg-[#FFF] fixed top-0 left-0 right-0 h-auto overflow-hidden
          transition-all duration-500 ease-in-out transform 
          ${visibleMainHeader || visibleSubHeader ? 'translate-y-0' : '-translate-y-full'}
          ${!isAtTop && !showMenuPrice ? 'shadow-[0_0_8px_#0000004d]' : 'shadow-none'}
          ${whiteHeader ? 'bg-transparent text-[#fff]' : 'bg-[#FFF] text-[#010101]'}`}
      >
        <div
          suppressHydrationWarning
          className={`relative transition-all duration-500 ease-in-out transform ${visibleMainHeader ? 'translate-y-0' : '-translate-y-full'}`}
        >
          {/* Language toggle */}
          {/* <div className="absolute top-0 right-0 hidden lg:block">
            <div className="flex gap-2 text-[12px] py-[7px] text-[#010101]">
              <button className="font-medium active-link">EN</button>
              <button className="font-medium active-link">VN</button>
            </div>
          </div> */}

          {/* Main header content */}
          <div
            className="flex justify-between items-center py-[28px]"
            style={{ color: whiteHeader ? '#fff' : '#010101' }}
          >
            {/* Gallery name */}
            <h1 className="text-xl tracking-wider mt-[4px] text-center pr-2 md:pr-0">
              <Link href="/" className="text-[19px] tracking-[8px] font-medium uppercase">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex w-15 h-15">
                    {!!header?.logo && (
                      <Image
                        src={`${DIRECTUS_URL}/${header?.logo}`}
                        alt={header?.title}
                        width={60}
                        height={60}
                        sizes="100%"
                        className="flex-shrink-0"
                        style={{ objectFit: 'contain' }}
                        loading="eager"
                        priority={true}
                        quality={100}
                        unoptimized={true}
                      />
                    )}
                  </div>
                  <p>{header?.title}</p>
                </div>
              </Link>
            </h1>

            {/* Navigation - Desktop */}
            <DesktopNavigation
              headerData={headerData}
              headerActive={headerActive}
              headerHover={headerHover}
              isActive={isActive}
              setShowMenuPrice={setShowMenuPrice}
              setPositionPriceMenu={setPositionPriceMenu}
              whiteHeader={whiteHeader}
              totalQuantity={totalQuantity}
            />

            <div className="text-[19px] tracking-[8px] font-medium uppercase flex space-x-2">
              <div className="relative flex">
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
              <p>(257) 388-6895</p>
            </div>
          </div>
        </div>
        <SubHeader visible={visibleSubHeader} subHeader={subHeader} />
      </header>
      {/* Mobile menu button */}

      <button
        className={`lg:hidden fixed top-[40px] sm:top-[35px] md:top-[32px] right-[20px] md:right-[40px] z-50 flex flex-col justify-center items-center w-[24px] h-[20px]
          transition-all duration-500 ease-in-out transform
          ${
            visibleMainHeader
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[-60px] pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-full h-[2px] ${mobileMenuOpen ? 'bg-[#fff9]' : 'bg-[#010101]'} mb-[6px] transition-transform duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''
          }`}
        ></span>
        <span
          className={`block w-full h-[2px] ${mobileMenuOpen ? 'bg-[#fff9]' : 'bg-[#010101]'} transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-full h-[2px] ${mobileMenuOpen ? 'bg-[#fff9]' : 'bg-[#010101]'} mt-[6px] transition-transform duration-300 ${
            mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
          }`}
        ></span>
      </button>
      {/* Add a spacer to prevent content from being hidden under fixed header */}
      <div className="h-[82px]"></div>

      {/* Mobile menu overlay */}

      <div
        className={`fixed inset-0 bg-black z-40 transition-all duration-500 origin-top ${
          mobileMenuOpen
            ? 'opacity-90 transform translate-y-0'
            : 'opacity-0 transform -translate-y-full pointer-events-none'
        }`}
      >
        <div>
          <nav className="flex h-screen items-center justify-center text-[#fff9]">
            <ul className="flex flex-col space-y-3 uppercase text-[18px] leading-[36px] font-medium text-center">
              {headerData?.map((item, index) => (
                <li
                  key={item.href}
                  className={`transform transition-all duration-500 ${
                    mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms',
                  }}
                >
                  <Link
                    href={item.href}
                    className={
                      isActive(item.href)
                        ? 'text-white tracking-[2.61px]'
                        : 'text-[#fff9] tracking-[2.61px]'
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li
                className={`transform transition-all duration-500 ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${10 * 100}ms` : '0ms',
                }}
              >
                <Link
                  href="/cart"
                  className={`inline-flex justify-center items-center ${
                    isActive('/cart')
                      ? 'text-white tracking-[2.61px]'
                      : 'text-[#fff9] tracking-[2.61px]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart color="#fff9" /> <span className="ml-2">({totalQuantity})</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <SubMenuPrice />
    </>
  );
}
