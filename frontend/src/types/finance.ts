export interface JournalEntry {
  id: string
  date: string
  description: string
  debitAccount: string
  creditAccount: string
  amount: number
  currency: string
  status: 'draft' | 'posted' | 'void'
}

export interface Invoice {
  id: string
  number: string
  type: 'payable' | 'receivable'
  vendorId?: string
  customerId?: string
  amount: number
  dueDate: string
  status: 'draft' | 'pending' | 'paid' | 'overdue'
}

export interface CurrencyRate {
  from: string
  to: string
  rate: number
  updatedAt: string
}
