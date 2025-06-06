"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface BookingPopupContextType {
  open: boolean;
  roomId?: string;
  openPopup: (roomId: string) => void;
  closePopup: () => void;
}

const BookingPopupContext = createContext<BookingPopupContextType | undefined>(undefined);

export function BookingPopupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState<string | undefined>(undefined);

  const openPopup = (id: string) => {
    setRoomId(id);
    setOpen(true);
  };
  const closePopup = () => {
    setOpen(false);
    setRoomId(undefined);
  };

  return (
    <BookingPopupContext.Provider value={{ open, roomId, openPopup, closePopup }}>
      {children}
    </BookingPopupContext.Provider>
  );
}

export function useBookingPopup() {
  const ctx = useContext(BookingPopupContext);
  console.log("useBookingPopup called", ctx);
  
  if (!ctx) throw new Error("useBookingPopup must be used within BookingPopupProvider");
  return ctx;
}