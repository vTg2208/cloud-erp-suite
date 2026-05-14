import { createSlice } from '@reduxjs/toolkit'
import type { Metric } from '@/types'

interface DashboardState {
  metrics: Metric[]
  isLoading: boolean
  error: string | null
}

const initialState: DashboardState = {
  metrics: [],
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setMetrics, setLoading } = dashboardSlice.actions
export default dashboardSlice.reducer
