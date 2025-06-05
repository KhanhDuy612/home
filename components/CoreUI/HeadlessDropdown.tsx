'use client';

import { Fragment } from 'react';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';

interface HeadlessDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

export default function HeadlessDropdown({
  trigger,
  children,
  className = '',
  align = 'left',
}: HeadlessDropdownProps) {
  return (
    <Menu as="div" className={`relative isolate`} suppressHydrationWarning >
      <div suppressHydrationWarning>
        <MenuButton className='h-full focus-visible:outline-none'>{trigger}</MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          modal={false} 
          className={ ` absolute z-[9999999999]  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="py-1">{children}</div>
        </MenuItems>
        
      </Transition>
    </Menu>
  );
}
