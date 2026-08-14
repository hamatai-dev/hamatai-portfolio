'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ExchangeRates } from '@/lib/exchangeRates';

export type Currency = 'JPY' | 'USD' | 'EUR';

const CURRENCY_SYMBOLS: Record<Currency, string> = { JPY: '¥', USD: '$', EUR: '€' };
const CURRENCY_LOCALES: Record<Currency, string> = { JPY: 'ja-JP', USD: 'en-US', EUR: 'de-DE' };

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  format: (amountJPY: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  rates,
  children,
}: {
  rates: ExchangeRates;
  children: ReactNode;
}) {
  const [currency, setCurrency] = useState<Currency>('JPY');

  const format = (amountJPY: number) => {
    const value = currency === 'JPY' ? amountJPY : amountJPY * rates[currency];
    return `${CURRENCY_SYMBOLS[currency]}${Math.round(value).toLocaleString(CURRENCY_LOCALES[currency])}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
}
