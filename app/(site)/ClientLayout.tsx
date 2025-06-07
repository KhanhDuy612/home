'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { OrderProvider } from '../context/OrderContext';
import Loading from '@/components/CoreUI/Loading';
import { BookingPopupProvider } from '../context/BookingPopupContext';

const queryClient = new QueryClient();

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderProvider>
        <BookingPopupProvider>
          <Header />
          <main className="flex-grow min-h-[calc(100vh_-_280px)]">
            <div className="px-4 md:px-6">{children}</div>
          </main>
          <Footer />
          <ToastContainer style={{ marginTop: '100px' }} />
        </BookingPopupProvider>
      </OrderProvider>
      <Suspense>
        <Loading />
      </Suspense>
    </QueryClientProvider>
  );
}
