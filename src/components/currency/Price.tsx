'use client';

import { useCurrency } from './CurrencyContext';

export function Price({ amountJPY, prefix = '' }: { amountJPY: number; prefix?: string }) {
  const { format } = useCurrency();
  return `${prefix}${format(amountJPY)}`;
}
