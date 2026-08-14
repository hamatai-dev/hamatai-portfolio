'use client';

import { useCurrency, type Currency } from './CurrencyContext';

const CURRENCIES: Currency[] = ['JPY', 'USD', 'EUR'];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-surface-card border border-white/10 rounded-lg">
      {CURRENCIES.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          aria-pressed={currency === c}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            currency === c ? 'bg-accent text-white' : 'text-secondary hover:text-primary'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
