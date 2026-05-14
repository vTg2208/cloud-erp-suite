import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface TenantState {
  tenantId: string
  name: string
  currency: string
  timezone: string
}

const initialState: TenantState = {
  tenantId: '',
  name: '',
  currency: 'USD',
  timezone: 'UTC',
}

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<TenantState>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setTenant } = tenantSlice.actions
export default tenantSlice.reducer
