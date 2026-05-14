import { createSlice } from '@reduxjs/toolkit'
import type { PurchaseOrder } from '@/types'

interface SupplyChainState {
  purchaseOrders: PurchaseOrder[]
  isLoading: boolean
  error: string | null
}

const initialState: SupplyChainState = {
  purchaseOrders: [],
  isLoading: false,
  error: null,
}

const supplyChainSlice = createSlice({
  name: 'supplyChain',
  initialState,
  reducers: {
    setPurchaseOrders: (state, action) => {
      state.purchaseOrders = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setPurchaseOrders, setLoading } = supplyChainSlice.actions
export default supplyChainSlice.reducer
