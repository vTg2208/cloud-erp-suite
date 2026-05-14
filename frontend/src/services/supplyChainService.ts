import api from './api'
import type { PurchaseOrder, Inventory, Vendor } from '@/types'

export const supplyChainService = {
  purchaseOrders: {
    list: () => api.get<PurchaseOrder[]>('/supply-chain/purchase-orders'),
    create: (po: Partial<PurchaseOrder>) => api.post('/supply-chain/purchase-orders', po),
    update: (id: string, po: Partial<PurchaseOrder>) => api.put(`/supply-chain/purchase-orders/${id}`, po),
    getById: (id: string) => api.get<PurchaseOrder>(`/supply-chain/purchase-orders/${id}`),
    approve: (id: string) => api.put(`/supply-chain/purchase-orders/${id}/approve`),
  },

  inventory: {
    list: () => api.get<Inventory[]>('/supply-chain/inventory'),
    update: (id: string, inventory: Partial<Inventory>) => api.put(`/supply-chain/inventory/${id}`, inventory),
    getLowStock: () => api.get<Inventory[]>('/supply-chain/inventory/low-stock'),
  },

  vendors: {
    list: () => api.get<Vendor[]>('/supply-chain/vendors'),
    create: (vendor: Partial<Vendor>) => api.post('/supply-chain/vendors', vendor),
    update: (id: string, vendor: Partial<Vendor>) => api.put(`/supply-chain/vendors/${id}`, vendor),
    delete: (id: string) => api.delete(`/supply-chain/vendors/${id}`),
  },
}
