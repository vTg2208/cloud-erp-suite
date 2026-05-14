export interface PurchaseOrder {
  id: string
  number: string
  vendorId: string
  items: POItem[]
  totalAmount: number
  orderDate: string
  expectedDelivery: string
  status: 'draft' | 'approved' | 'shipped' | 'received' | 'cancelled'
}

export interface POItem {
  id: string
  productId: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Inventory {
  id: string
  productId: string
  name: string
  sku: string
  quantity: number
  reorderLevel: number
  warehouse: string
}

export interface Vendor {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  status: 'active' | 'inactive'
  rating: number
}
