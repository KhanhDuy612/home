'use client';

import { create } from 'zustand';
import { IPriceRange, ISubHeader } from '../header.interface';

interface HeaderState {
  subHeader: ISubHeader | null;
  color: 'black' | 'white';
  showMenuPrice: boolean;
  selectedPriceRange: IPriceRange | null;
  xPriceMenu: number;
  yPriceMenu: number;
  isWhiteHeader: boolean;
  isAtTop: boolean;
  mobileMenuOpen: boolean;
  href: string;
}


interface HeaderActions {
  setSubHeader: (subHeader: ISubHeader | null) => void;
  setColor: (color: 'black' | 'white') => void;
  reset: () => void;
  setShowMenuPrice: (showMenuPrice: boolean, href?: string) => void;
  setSelectedPriceRange: (selectedPriceRange: IPriceRange | null) => void;
  setPositionPriceMenu: (xPriceMenu: number, yPriceMenu: number) => void;
  setIsWhiteHeader: (isWhiteHeader: boolean) => void;
  setIsAtTop: (isAtTop: boolean) => void;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
  setHref: (href: string) => void;
}

const initialState: HeaderState = {
  subHeader: null,
  color: 'black',
  showMenuPrice: false,
  selectedPriceRange: null,
  xPriceMenu: 0,
  yPriceMenu: 0,
  isWhiteHeader: false,
  isAtTop: true,
  mobileMenuOpen: false,
  href: '',
};

const useHeaderState = create<HeaderState & HeaderActions>(set => ({
  ...initialState,
  setSubHeader: subHeader => set({ subHeader }),
  setColor: color => set({ color }),
  reset: () => set(initialState),
  setShowMenuPrice: (showMenuPrice, href) => set({ showMenuPrice, href: href || '' }),
  setSelectedPriceRange: selectedPriceRange => set({ selectedPriceRange }),
  setPositionPriceMenu: (xPriceMenu, yPriceMenu) => set({ xPriceMenu, yPriceMenu }),
  setIsWhiteHeader: isWhiteHeader => set({ isWhiteHeader }),
  setIsAtTop: isAtTop => set({ isAtTop }),
  setMobileMenuOpen: mobileMenuOpen => set({ mobileMenuOpen }),
  setHref: href => set({ href }),
}));

export default useHeaderState;
