export type Currency = "LKR" | "USD";

export function getExchangeRate(rate: string | number) {
  const numericRate = Number(rate);
  return Number.isFinite(numericRate) && numericRate > 0 ? numericRate : 300;
}

export function convertUsdPrice(
  usdPrice: number,
  currency: Currency,
  rate: string | number,
) {
  return currency === "LKR" ? usdPrice * getExchangeRate(rate) : usdPrice;
}

export function formatCurrencyAmount(amount: number, currency: Currency) {
  const formatted = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(amount);
  return currency === "LKR" ? `LKR ${formatted}` : `$${formatted}`;
}

export function formatListingPrice(
  usdPrice: number,
  currency: Currency,
  rate: string | number,
) {
  return formatCurrencyAmount(convertUsdPrice(usdPrice, currency, rate), currency);
}