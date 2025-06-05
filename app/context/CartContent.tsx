import { createContext, useState, useEffect } from 'react';

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cartItems: any[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

export const CartContext = createContext<{
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
}>({
  cartItems: [],
  addToCart: (item: any) => {},
  removeFromCart: (item: any) => {},
  updateQuantity: (id: string, newQuantity: number) => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setCartItems(savedCart);
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (isHydrated) {
      saveCartToLocalStorage(cartItems);
    }
  }, [cartItems, isHydrated]);

  const addToCart = newItem => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, link: newItem.link }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
