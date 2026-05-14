import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import tenantReducer from './tenantSlice'
import financeReducer from './financeSlice'
import hrReducer from './hrSlice'
import supplyChainReducer from './supplyChainSlice'
import dashboardReducer from './dashboardSlice'
import notificationReducer from './notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tenant: tenantReducer,
    finance: financeReducer,
    hr: hrReducer,
    supplyChain: supplyChainReducer,
    dashboard: dashboardReducer,
    notification: notificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
