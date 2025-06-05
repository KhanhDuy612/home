'use client';

import { FC } from 'react';
import CloseButton from './CloseButton';

interface PopupProps {
  show: boolean;
  children: React.ReactNode;
  title: string;
  onClose?: () => void;
  backgroundCloseTrigger?: boolean;
  isFullScreen?: boolean;
  className?: string;
}

const Popup: FC<PopupProps> = ({
  children,
  title,
  show,
  onClose,
  backgroundCloseTrigger = true,
  isFullScreen = false,
  className,
}: PopupProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fadeIn">
      {backgroundCloseTrigger && <div className="absolute inset-0" onClick={handleClose} />}
      <div
        className={`relative w-full bg-white animate-slideIn ${isFullScreen ? 'max-w-full' : ''} ${isFullScreen ? 'h-full w-full' : ''} ${isFullScreen ? '' : 'rounded-md'} ${className}`}
      >
        <CloseButton onClick={handleClose} />
        {title && (<h2 className="mb-6 text-4xl font-bold tracking-widest uppercase">{title}</h2>)}
        {children}
      </div>
    </div>
  );
};

export default Popup;
