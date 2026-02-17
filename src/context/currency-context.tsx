"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'EGP' | 'SAR';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInEGP: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// سعر صرف تقريبي للمثال (1 ريال سعودي = 13 جنيه مصري تقريباً)
const EGP_TO_SAR_RATE = 0.077; 

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EGP');

  useEffect(() => {
    const saved = localStorage.getItem('user-currency') as Currency;
    if (saved) setCurrency(saved);
  }, []);

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem('user-currency', c);
  };

  const formatPrice = (amountInEGP: number) => {
    if (currency === 'SAR') {
      const converted = (amountInEGP * EGP_TO_SAR_RATE).toFixed(2);
      return `${converted} ر.س`;
    }
    return `${amountInEGP} ج.م`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};
