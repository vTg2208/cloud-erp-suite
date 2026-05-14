import api from './api'
import type { JournalEntry, Invoice, CurrencyRate } from '@/types'

export const financeService = {
  ledger: {
    list: () => api.get<JournalEntry[]>('/finance/ledger'),
    create: (entry: Partial<JournalEntry>) => api.post('/finance/ledger', entry),
    update: (id: string, entry: Partial<JournalEntry>) => api.put(`/finance/ledger/${id}`, entry),
    delete: (id: string) => api.delete(`/finance/ledger/${id}`),
  },

  invoices: {
    list: (type?: string) => api.get<Invoice[]>(`/finance/invoices${type ? `?type=${type}` : ''}`),
    create: (invoice: Partial<Invoice>) => api.post('/finance/invoices', invoice),
    update: (id: string, invoice: Partial<Invoice>) => api.put(`/finance/invoices/${id}`, invoice),
    getById: (id: string) => api.get<Invoice>(`/finance/invoices/${id}`),
  },

  currency: {
    getRates: () => api.get<CurrencyRate[]>('/finance/currency/rates'),
    updateRate: (from: string, to: string, rate: number) =>
      api.post('/finance/currency/rates', { from, to, rate }),
  },
}
