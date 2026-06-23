import { Routes, Route } from 'react-router-dom'
import { AppProvider }  from './context/AppContext'
import { DataProvider } from './context/DataContext'
import { Sidebar }      from './components/layout/Sidebar'
import { Topbar }       from './components/layout/Topbar'
import { NotificationPanel } from './components/layout/NotificationPanel'
import { CommandPalette }    from './components/layout/CommandPalette'
import { ChatbaseWidget }    from './components/shared/ChatbaseWidget'

import { DashboardPage }  from './pages/DashboardPage'
import { HRPage }         from './pages/HRPage'
import { FinancePage }    from './pages/FinancePage'
import { InventoryPage }  from './pages/InventoryPage'
import { ProjectsPage }   from './pages/ProjectsPage'
import { AnalyticsPage }  from './pages/AnalyticsPage'
import { ReportsPage }    from './pages/ReportsPage'
import { AIPage }         from './pages/AIPage'
import { SettingsPage }   from './pages/SettingsPage'

function Layout() {
  return (
    <div style={{ display:'flex',height:'100vh',overflow:'hidden',background:'var(--bg)' }}>
      <Sidebar />
      <div style={{ flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0 }}>
        <Topbar />
        <main style={{ flex:1,overflowY:'auto',overflowX:'hidden' }}>
          <Routes>
            <Route path="/"          element={<DashboardPage />} />
            <Route path="/hr"        element={<HRPage />} />
            <Route path="/finance"   element={<FinancePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/projects"  element={<ProjectsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports"   element={<ReportsPage />} />
            <Route path="/ai"        element={<AIPage />} />
            <Route path="/settings"  element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
      <NotificationPanel />
      <CommandPalette />
      <ChatbaseWidget />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <DataProvider>
        <Layout />
      </DataProvider>
    </AppProvider>
  )
}
