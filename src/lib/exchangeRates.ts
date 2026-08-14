export interface ExchangeRates {
  USD: number;
  EUR: number;
}

// JPY建ての金額に掛けると USD/EUR に変換できるレート。
// 為替APIが取得できない場合の概算フォールバック値。
const FALLBACK_RATES: ExchangeRates = { USD: 0.0067, EUR: 0.0062 };

export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=JPY&to=USD,EUR', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_RATES;

    const data = (await res.json()) as { rates?: Partial<ExchangeRates> };
    const { USD, EUR } = data.rates ?? {};
    if (typeof USD !== 'number' || typeof EUR !== 'number') return FALLBACK_RATES;

    return { USD, EUR };
  } catch {
    return FALLBACK_RATES;
  }
}
