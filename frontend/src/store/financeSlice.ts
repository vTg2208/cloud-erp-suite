import { createSlice } from '@reduxjs/toolkit'
import type { JournalEntry } from '@/types'

interface FinanceState {
  entries: JournalEntry[]
  isLoading: boolean
  error: string | null
}

const initialState: FinanceState = {
  entries: [],
  isLoading: false,
  error: null,
}

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    addEntry: (state, action) => {
      state.entries.push(action.payload)
    },
  },
})

export const { setEntries, setLoading, addEntry } = financeSlice.actions
export default financeSlice.reducer
