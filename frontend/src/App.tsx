import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/common/Layout'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

import FinanceLedger from './pages/Finance/Ledger'
import FinancePayables from './pages/Finance/Payables'
import FinanceReceivables from './pages/Finance/Receivables'
import FinanceReports from './pages/Finance/Reports'

import HREmployees from './pages/HR/Employees'
import HRPayroll from './pages/HR/Payroll'
import HRLeave from './pages/HR/Leave'
import HRAttendance from './pages/HR/Attendance'

import SCPurchaseOrders from './pages/SupplyChain/PurchaseOrders'
import SCInventory from './pages/SupplyChain/Inventory'
import SCVendors from './pages/SupplyChain/Vendors'
import SCForecasting from './pages/SupplyChain/Forecasting'

import ProjectsList from './pages/Projects/ProjectsList'
import ProjectDetail from './pages/Projects/ProjectDetail'
import ResourcePlanning from './pages/Projects/ResourcePlanning'

import SettingsGeneral from './pages/Settings/General'
import SettingsUsers from './pages/Settings/Users'
import SettingsRoles from './pages/Settings/Roles'
import SettingsIntegrations from './pages/Settings/Integrations'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/finance/ledger" element={<FinanceLedger />} />
        <Route path="/finance/payables" element={<FinancePayables />} />
        <Route path="/finance/receivables" element={<FinanceReceivables />} />
        <Route path="/finance/reports" element={<FinanceReports />} />

        <Route path="/hr/employees" element={<HREmployees />} />
        <Route path="/hr/payroll" element={<HRPayroll />} />
        <Route path="/hr/leave" element={<HRLeave />} />
        <Route path="/hr/attendance" element={<HRAttendance />} />

        <Route path="/supply-chain/purchase-orders" element={<SCPurchaseOrders />} />
        <Route path="/supply-chain/inventory" element={<SCInventory />} />
        <Route path="/supply-chain/vendors" element={<SCVendors />} />
        <Route path="/supply-chain/forecasting" element={<SCForecasting />} />

        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/resource-planning" element={<ResourcePlanning />} />

        <Route path="/settings/general" element={<SettingsGeneral />} />
        <Route path="/settings/users" element={<SettingsUsers />} />
        <Route path="/settings/roles" element={<SettingsRoles />} />
        <Route path="/settings/integrations" element={<SettingsIntegrations />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
