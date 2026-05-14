export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
}

export function getCurrencySymbol(currency = 'USD'): string {
  return CURRENCY_SYMBOLS[currency] ?? '$'
}

export function formatAmount(amount: number, currency = 'USD'): string {
  const symbol = getCurrencySymbol(currency)
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
