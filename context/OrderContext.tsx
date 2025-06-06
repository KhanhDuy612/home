import { createContext, useState, ReactNode, useContext } from 'react';

interface Order {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderContextProps {
  orders: Order[];
  placeOrder: (roomId: string) => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (roomId: string) => {
    const newOrder: Order = {
      id: roomId,
      name: `Room ${roomId}`,
      price: 100, // Example price
      quantity: 1,
      total: 100, // Example total
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    console.log(`Order placed for room ID: ${roomId}`);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};