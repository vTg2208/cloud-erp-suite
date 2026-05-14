export function getDaysBetween(start: string, end: string): number {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isDatePast(date: string): boolean {
  return new Date(date) < new Date()
}

export function isDateFuture(date: string): boolean {
  return new Date(date) > new Date()
}

export function formatDateForAPI(date: Date): string {
  return date.toISOString().split('T')[0]
}
