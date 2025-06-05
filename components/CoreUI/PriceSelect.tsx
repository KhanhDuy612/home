import { useEffect, useMemo, useState } from 'react';
import HeadlessDropdown from './HeadlessDropdown';
import usePriceListQuery from '../Header/hooks/usePriceListQuery';
import { formatPrice } from '@/utils/price-format';
import { ChevronDown } from 'lucide-react';
import { MenuItem } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import { toString } from 'lodash';
import Dropdown from './Dropdown';

type PriceSelectProps = {
  onChange: (range: { min: number; max: number } | null) => void;
};

export default function PriceSelect({ onChange }: PriceSelectProps) {
  const [selectedRange, setSelectedRange] = useState<{ min: number; max: number } | null>(null);
  const { data: priceList } = usePriceListQuery();
  const searchParams = useSearchParams();
  const price = searchParams.get('price');

  const priceRanges = useMemo(() => {
    return priceList?.prices || [];
  }, [priceList]);

  useEffect(() => {
    if (price) {
      const range = priceRanges?.find(r => toString(r.min) === price);
      if (range) {
        setSelectedRange(range);
      }
    }
  }, [price, priceRanges]);

  const getPriceLabel = (range: { min: number; max: number } | null) => {
    if (!range) return 'Filter Price';
    // get label for selected range
    const foundRange = priceRanges.find(r => r.min === range.min && r.max === range.max);
    return foundRange
      ? foundRange.label
      : `${formatPrice(range.min)} - ${range.max === Infinity ? '+' : formatPrice(range.max)}`;
  };
  const handleSelectRange = (range: { min: number; max: number } | null) => {
    setSelectedRange(range);
    onChange(range);
  };

  return (
    <div className="flex items-center">
      <div className="mr-3 text-lg font-medium text-gray-700">PRICE LIST:</div>{' '}
      <Dropdown
        align="right"
        trigger={
          <div className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium  bg-[#fff7bc] border border-gray-200 rounded-lg transition-colors">
            {/* <Filter size={16} className="text-gray-500" /> */}
            <span className='text-base py-2 text-slate-600' >{selectedRange ? getPriceLabel(selectedRange) : 'Filter Price'}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        }
      >
        {priceRanges.map((range, idx) => (
          <div
            className="flex items-center px-3 py-2 text-gray-700 transition-colors cursor-pointer hover:bg-gray-100 hover:text-black"
            onClick={() => {
              handleSelectRange({ min: range.min, max: range.max });
            }}
            key={idx}
          >
            {range.label}
          </div>
        ))}

        {selectedRange && (
          <div
            className="flex items-center px-3 py-2 mt-1 text-red-500 transition-colors border-t border-gray-100 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              handleSelectRange(null);
            }}
          >
            Clear Filter
          </div>
        )}
      </Dropdown>
    </div>
  );
}
