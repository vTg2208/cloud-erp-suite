export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals)
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`
}
