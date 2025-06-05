export interface ISubHeader {
  name: string;
  items: HeaderItem[];
}

export interface HeaderItem {
  name: string;
  callback: () => void;
  isActive: boolean;
  isHidden?: boolean;
  showPriceFilter?: boolean;
}

export interface IPriceList {
  title: string;
  prices: IPriceRange[];
}
export interface IPriceRange {
  label: string;
  min: number;
  max: number;
}
