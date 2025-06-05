'use client';

import { Fragment, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
  left?: number;
  top?: number;
}

export default function Dropdown({
  trigger,
  children,
  className = '',
  align = 'left',
  left = 120,
  top = 40,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create portal container if it doesn't exist
    let container = document.getElementById('dropdown-portal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'dropdown-portal-container';
      document.body.appendChild(container);
    }
    setPortalContainer(container);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current?.contains(event.target as Node) ||
        menuRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    }

    function handleScroll() {
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen]);

  return (
    <div className={`relative isolate ${className}`}>
      <div>
        <button
          ref={triggerRef}
          onClick={(e) => {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            setPosition({
              top: rect.top + top,
              left: rect.left - left,
            });
            setIsOpen(!isOpen);
          }}
          className="h-full focus-visible:outline-none"
          type="button"
        >
          {trigger}
        </button>
      </div>

      {isOpen && portalContainer && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          className="z-[9999999999999] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-100 ease-out transform scale-100 opacity-100"
        >
          <div className="py-1" onClick={() => setIsOpen(false)}>{children}</div>
        </div>,
        portalContainer
      )}
    </div>
  );
}
