'use client';

import { CartContext } from '@/app/context/CartContent';
import { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import ScrollFadeIn from '../ScrollFadeIn/ScrollFadeIn';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartItem = ({ id, image, name, artist, price, quantity, total }: any) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { removeFromCart, updateQuantity } = cartContext;

  const handleRemoveClick = () => {
    const isConfirmed = window.confirm(`Are you sure you want to remove ${name} from your cart?`);
    if (isConfirmed) {
      removeFromCart(id); // Chỉ truyền id
    }
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity < 1) {
      const isConfirmed = window.confirm(`Do you want to remove "${name}" from your cart?`);
      if (isConfirmed) {
        removeFromCart(id);
      }
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col justify-between space-y-8 md:flex-row md:p-4 md:items-start md:justify-start border-t-[1px] pt-6 md:pt-0 md:border-none">
      <div className="ml-auto md:hidden">
        <button
          className="w-full text-gray-600 md:w-1/6 hover:text-red-500"
          onClick={handleRemoveClick}
        >
          <div className="p-3 border w-fit hover:bg-red-500 hover:text-white">
            <img src="/images/icons/close.svg" alt="close" />
          </div>
        </button>
      </div>
      <div className="flex items-start justify-between w-full md:w-1/6">
        <p className="block w-1/2 md:hidden">Image</p>
        <div className="w-1/2 ">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-auto rounded-md md:h-16 md:w-16 md:mr-4 "
          />
        </div>
      </div>
      <div className="flex items-start justify-between w-full md:w-1/6">
        <p className="block w-1/2 md:hidden">Art’s name</p>
        <div className="w-1/2 ">
          <p className="font-medium text-md">{name}</p>
          {/* <p className="text-sm text-gray-600">{artist}</p> */}
        </div>
      </div>
      <div className="flex items-start justify-between w-full md:w-1/6">
        <p className="block w-1/2 md:hidden">Price</p>
        <div className="w-1/2 ">
          <p className="text-lg font-medium ">${price}</p>
        </div>
      </div>
      <div className="flex items-start justify-between w-full md:w-1/6">
        <p className="block w-1/2 md:hidden">Quantity</p>
        <div className="w-1/2 ">
          <div className='flex items-center px-2 space-x-2 border rounded-md w-fit'>
          <button
            onClick={() => handleQuantityChange(-1)}
            className="text-lg font-bold border border-none rounded hover:bg-gray-200"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="w-12 text-center border-none "
          />
          <button
            onClick={() => handleQuantityChange(1)}
            className="text-lg font-bold border border-none rounded hover:bg-gray-200"
          >
            +
          </button>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between w-full md:w-1/6">
        <p className="block w-1/2 md:hidden">Total</p>
        <div className="w-1/2 ">
          <p className="text-lg font-medium ">${total}</p>
        </div>
      </div>

      <div
        className="hidden w-full text-gray-600 md:block md:w-1/6 hover:text-red-500"
      >
        <button onClick={handleRemoveClick}>
          <div className="p-3 border w-fit hover:bg-red-500 hover:text-white">
            <img src="/images/icons/close.svg" alt="close" />
          </div>
        </button>
        
      </div>
    </div>
  );
};

const ViewCart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cartItems } = cartContext;
  const totalPayment = cartItems.reduce((acc, item) => acc + item.total, 0);
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe
    } else {
      // console.log('error');
    }
  };
  return (
    <ScrollFadeIn>
      <div className="p-6 mx-auto max-w-7xl">
        <h1 className="mb-6 font-medium tracking-wide uppercase text-md">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="py-6 mt-4 text-center border-t border-b">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="items-center justify-between hidden px-4 md:flex">
              <div className="w-1/6">Image</div>
              <div className="w-1/6">Art’s name</div>
              <div className="w-1/6">Price</div>
              <div className="w-1/6">Quantity</div>
              <div className="w-1/6">Total</div>
              <div className="w-1/6"></div>
            </div>

            {/* Cart Items */}
            <div className="py-6 mt-4 space-y-4 md:border-t md:border-b">
              {cartItems.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="flex flex-col items-center justify-center px-4 mt-6 space-y-6 md:space-y-0 md:flex-row md:items-start border-t-[1px] md:border-none md:justify-start">
              <p className="hidden w-4/6 font-semibold md:block text-md">Total payment</p>
              <p className="w-1/6 font-semibold text-center text-md md:text-start">
                $ {totalPayment}
              </p>
              <button
                className="md:w-1/6 p-2 text-black border-[1px] border-black font-medium rounded-lg bg-[#e6e6e6] hover:bg-[#aa9898]"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </ScrollFadeIn>
  );
};

export default ViewCart;
