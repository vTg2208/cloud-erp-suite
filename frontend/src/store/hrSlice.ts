import { createSlice } from '@reduxjs/toolkit'
import type { Employee } from '@/types'

interface HRState {
  employees: Employee[]
  isLoading: boolean
  error: string | null
}

const initialState: HRState = {
  employees: [],
  isLoading: false,
  error: null,
}

const hrSlice = createSlice({
  name: 'hr',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload)
    },
  },
})

export const { setEmployees, setLoading, addEmployee } = hrSlice.actions
export default hrSlice.reducer
