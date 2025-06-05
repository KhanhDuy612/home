'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartProvider } from '@/app/context/CartContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Loading from '@/components/CoreUI/Loading';
import { Suspense } from 'react';

const queryClient = new QueryClient();

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Header />
        <main className="flex-grow min-h-[calc(100vh_-_280px)]">
          <div className="px-4 md:px-6">{children}</div>
        </main>
        <Footer />
        <ToastContainer style={{ marginTop: '100px' }} />
        {/* <Tidio /> */}
      </CartProvider>
      <Suspense>
        <Loading />
      </Suspense>
    </QueryClientProvider>
  );
}
