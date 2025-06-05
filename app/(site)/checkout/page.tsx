'use client';

import { CartContext } from '@/app/context/CartContent';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useContext } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
   const { cartItems } = useContext(CartContext);
  return (
    <Elements stripe={stripePromise}>
      {/* <CheckoutForm cartItems={cartItems} /> */}
    </Elements>
  );
}
