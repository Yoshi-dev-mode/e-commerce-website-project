'use client'
// Create a new file: CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

type CartContextType = [
  any[], 
  React.Dispatch<React.SetStateAction<any[]>>
];

// Initialize the CartContext with undefined
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  debugger
  const { data } = useQuery({
    queryKey: ['foodVariants'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/foodVariants`);
      return response.json();
    }
  });

  const [addCart, setAddCart] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setAddCart(data);
    }
  }, [data]);

  return (
    <CartContext.Provider value={[addCart, setAddCart]}>
      {children}
    </CartContext.Provider>
  );
};
