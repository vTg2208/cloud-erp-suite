# Amdox ERP — Enterprise Platform

A premium, production-quality ERP SaaS platform built for **Amdox Technologies**.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS + Custom CSS Variables |
| Charts | Recharts (Area, Bar, Line, Pie, RadarChart) |
| Routing | React Router DOM v6 |
| State | Context API |
| Animations | CSS animations (Framer Motion ready) |
| Forms | React Hook Form + Zod |
| Icons | React Icons |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx           # Collapsible nav sidebar
│   │   ├── Topbar.jsx            # Top navbar with search & actions
│   │   ├── NotificationPanel.jsx # Slide-in notification center
│   │   └── CommandPalette.jsx    # Ctrl+K global search & nav
│   └── shared/
│       ├── Avatar.jsx            # User avatars
│       ├── Badge.jsx             # Status badges
│       ├── KPICard.jsx           # KPI metric cards
│       ├── ProgressBar.jsx       # Animated progress bars
│       └── Skeleton.jsx          # Loading skeleton screens
├── pages/
│   ├── DashboardPage.jsx         # Executive dashboard
│   ├── HRPage.jsx                # HR + Employee directory
│   ├── FinancePage.jsx           # Finance + Transactions
│   ├── InventoryPage.jsx         # Inventory management
│   ├── ProjectsPage.jsx          # Projects + Kanban board
│   ├── AnalyticsPage.jsx         # Analytics center
│   ├── ReportsPage.jsx           # Reports & export center
│   ├── AIPage.jsx                # AI Assistant workspace
│   └── SettingsPage.jsx          # Settings & preferences
├── context/
│   └── AppContext.jsx            # Global state (theme, role, notifs)
├── data/
│   └── mockData.js               # 100 employees, 30 projects, 50 SKUs...
└── App.jsx                       # Root with router
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## ✨ Features

### Executive Dashboard
- 6 KPI cards with trend indicators
- Revenue trends with AI forecast overlay
- Department performance bar chart
- Employee growth chart
- Project status donut chart
- AI Insights panel with live badge
- Recent activity feed
- Team performance tracker

### HR Management
- **Employee Directory** — search, filter, paginate 100 employees
- **Payroll Dashboard** — salary analytics, department breakdown
- **Leave Management** — request tracking, approval status
- **Performance** — score cards for all employees

### Finance Dashboard
- Revenue vs Expenses grouped bar chart
- Expense category donut chart
- Transaction table with credit/debit filtering
- Paginated transaction history (50 records)

### Inventory Management
- Stock level trend line chart
- Value by category horizontal bar chart
- Full inventory table with status badges
- Multi-filter: search + category + status

### Project Management
- **List View** — full project table with health indicators
- **Kanban Board** — To Do / In Progress / Review / Done columns
- **Timeline** — Gantt-style project timeline

### Analytics Center
- Revenue forecast with confidence bands (AI-powered)
- Productivity by department (horizontal bar)
- Employee distribution pie chart
- Budget utilization tracker
- Key business metrics (NPS, CAC, LTV, MRR)
- Revenue vs Headcount dual-axis chart

### Reports Center
- 6 report type cards with preview + export buttons
- Scheduled reports management table
- Automated vs manual report tracking

### AI Assistant
- Embedded Chatbase AI iframe
- Suggested prompts sidebar
- Chat history panel
- Usage statistics

### Settings
- Profile editing form
- Dark/Light theme toggle
- Notification preferences (toggle switches)
- Role-based access control (Admin/Manager/Employee)
- Security settings

---

## 🎨 Design System

### Color Tokens
All colors use CSS variables for instant theme switching:
- `--accent` — Brand blue (#4f8ef7)
- `--green`, `--red`, `--amber`, `--purple`, `--teal` — Semantic colors
- `--bg`, `--bg2`, `--bg3` — Background levels
- `--card`, `--card2` — Card surfaces
- `--border`, `--border2` — Border weights
- `--text`, `--text2`, `--text3` — Text hierarchy

### Global Classes
- `.card`, `.card-sm` — Card containers with hover
- `.badge`, `.badge-{variant}` — Status badges
- `.progress`, `.progress-bar`, `.pb-{color}` — Progress bars
- `.data-table` — Styled data tables
- `.kpi-icon`, `.kpi-{color}` — KPI icon blocks
- `.erp-input`, `.erp-select`, `.erp-btn`, `.erp-btn-ghost` — Form elements
- `.skeleton` — Animated loading skeleton
- `.page-enter` — Page entrance animation

---

## 🔑 Global Features

| Feature | How to Use |
|---------|-----------|
| Command Palette | `Ctrl+K` or `⌘K` — search & navigate |
| Notifications | Bell icon in topbar |
| Theme Toggle | Sun/Moon icon in topbar |
| Role Switcher | Sidebar bottom dropdown |
| Sidebar Collapse | Arrow button at sidebar bottom |

---

## 📊 Mock Data Scale
- **100 Employees** across 20 departments
- **30 Projects** with statuses, budgets, health indicators
- **200 Tasks** distributed across Kanban columns
- **50 Inventory Items** with stock levels
- **50 Transactions** (credit + debit)
- **20 Leave Requests**
- **500 Activity Log** entries

---

## 🏢 Built by
**Amdox Technologies** — Enterprise Software Division  
*This application demonstrates senior-level React frontend development for internship evaluation.*
