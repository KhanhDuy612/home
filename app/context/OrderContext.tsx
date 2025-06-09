import { createContext, useState, ReactNode, useContext } from 'react';

interface OrderContextProps {
  placeOrder: (roomId: string) => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<string[]>([]);

  const placeOrder = (roomId: string) => {
    setOrders((prevOrders) => [...prevOrders, roomId]);
  };

  return (
    <OrderContext.Provider value={{ placeOrder }}>
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