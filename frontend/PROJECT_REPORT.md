
# Amdox ERP - Internship Project Report

## 1. Project Overview

**Project Name:** Amdox ERP (Enterprise Resource Planning System)

**Description:** A full-featured ERP system built with modern web technologies. It integrates multiple business modules including Finance, HR, Supply Chain, Project Management, and Settings into a unified platform with an advanced UI, dark mode, real-time features, and interactive data management.

**Type:** Internship Project — Frontend Development

**Tech Stack:** MERN-aligned (React, TypeScript, Vite, TailwindCSS, Redux Toolkit, Chart.js)

---

## 2. Tech Stack & Tools

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 18 | Component-based UI library |
| **Language** | TypeScript | Type safety and developer experience |
| **Build Tool** | Vite 5 | Fast development & optimized production builds |
| **Styling** | TailwindCSS 3 | Utility-first CSS with dark mode support |
| **Routing** | React Router v6 | Client-side routing & navigation |
| **State Management** | Redux Toolkit | Global state for auth, finance, HR, etc. |
| **Charts** | Chart.js + react-chartjs-2 | Interactive revenue & analytics charts |
| **Icons** | React Icons (Feather) | Consistent icon library |
| **Validation** | Zod | Schema-based form validation |
| **Date Handling** | date-fns | Date formatting and utilities |

---

## 3. Project Structure

```
amdox-erp/
├── README.md                     # Project overview
├── .gitignore                    # Git ignore rules
├── amdox-mern-structure.md       # Architecture reference
│
└── frontend/
    ├── index.html                # Entry HTML with Google Fonts
    ├── package.json              # Dependencies & scripts
    ├── vite.config.ts            # Vite configuration with proxy
    ├── tsconfig.json             # TypeScript configuration
    ├── tailwind.config.js        # TailwindCSS with dark mode & custom colors
    ├── postcss.config.js         # PostCSS config
    ├── .eslintrc.json            # ESLint rules
    ├── .prettierrc               # Prettier formatting rules
    ├── .env.example              # Environment variables template
    │
    ├── public/                   # Static assets
    │
    ├── src/
    │   ├── index.tsx             # App entry point
    │   ├── App.tsx               # Main router with all routes
    │   ├── App.css               # Additional styles
    │   │
    │   ├── assets/               # Images, icons, fonts
    │   ├── components/           # Reusable UI components
    │   ├── pages/                # Full page components
    │   ├── services/             # API service layer
    │   ├── hooks/                # Custom React hooks
    │   ├── store/                # Redux slices & store
    │   ├── context/              # React contexts (Theme)
    │   ├── types/                # TypeScript type definitions
    │   ├── utils/                # Helper functions
    │   ├── styles/               # Global CSS & Tailwind
    │   └── config/               # App configuration
    │
    └── tests/                    # Test directories
```

---

## 4. Features Implemented

### 4.1 Core Features

| Feature | Description |
|---------|-------------|
| **Responsive Layout** | Sidebar navigation + header + content area, works on all screen sizes |
| **Dark/Light Theme** | Full dark mode across all pages, persists in localStorage |
| **Client-Side Routing** | 18+ pages with smooth navigation using React Router |
| **No-Login Demo Mode** | All pages accessible without authentication for demo purposes |

### 4.2 Advanced Features

| Feature | Description |
|---------|-------------|
| **AI Chat Assistant** | Floating chat widget with typing indicators, smart responses, message history |
| **Revenue Analytics Chart** | Interactive Chart.js line chart showing Revenue vs Expenses trends |
| **Activity Feed** | Real-time activity timeline with color-coded event icons |
| **Command Palette (Ctrl+K)** | VS Code-style search to navigate to any page instantly |
| **Advanced Tables** | Search, multi-column sorting, filter dropdown, pagination across all data pages |
| **Modal Forms** | 12+ working forms — Add, Edit, Delete, Approve, Reject operations |
| **Quick Actions** | Dashboard action buttons with color-coded hover effects |
| **Task Management** | Upcoming tasks list with priority tagging |

---

## 5. Module Breakdown

### 5.1 Dashboard (`/dashboard`)
- **Revenue, Employees, Orders, Profit Margin** metric cards with trend indicators
- **Interactive Chart** — Line chart with Revenue vs Expenses (Chart.js)
- **Activity Feed** — Scrollable timeline of recent system events
- **Quick Actions** — 4 colored action buttons (Invoice, Employee, PO, Report)
- **Upcoming Tasks** — Priority-tagged task list with deadlines

### 5.2 Finance Module
| Page | Route | Features |
|------|-------|----------|
| General Ledger | `/finance/ledger` | Advanced table, add/delete entries, status badges |
| Accounts Payable | `/finance/payables` | Filter by status, add invoices, mark as paid |
| Accounts Receivable | `/finance/receivables` | Invoice tracking with customer details |
| Finance Reports | `/finance/reports` | Report listing with status tracking |

### 5.3 HR Module
| Page | Route | Features |
|------|-------|----------|
| Employees | `/hr/employees` | Add/delete employees, department filtering, status management |
| Payroll | `/hr/payroll` | Add payroll entries, auto-calculate net pay (84%), process/mark paid workflow |
| Leave Management | `/hr/leave` | Request leave, approve/reject workflow, type filtering |
| Attendance | `/hr/attendance` | Check-in/check-out tracking, hours calculation |

### 5.4 Supply Chain Module
| Page | Route | Features |
|------|-------|----------|
| Purchase Orders | `/supply-chain/purchase-orders` | Create POs, approve workflow, vendor selection |
| Inventory | `/supply-chain/inventory` | Add items, low stock alerts (red highlighting), warehouse management |
| Vendors | `/supply-chain/vendors` | Add vendors, star rating display, active/inactive status |
| Forecasting | `/supply-chain/forecasting` | Demand prediction cards, trend indicators |

### 5.5 Projects Module
| Page | Route | Features |
|------|-------|----------|
| Projects List | `/projects` | Card grid view, create/delete projects, status badges |
| Project Detail | `/projects/:id` | Project info display, task list with assignees |
| Resource Planning | `/projects/resource-planning` | Resource allocation bars, availability tracking |

### 5.6 Settings Module
| Page | Route | Features |
|------|-------|----------|
| General Settings | `/settings/general` | Company name, currency, timezone with save confirmation |
| User Management | `/settings/users` | Add/delete users, toggle active/inactive, role assignment |
| Roles & Permissions | `/settings/roles` | Add/delete roles, permission descriptions |
| Integrations | `/settings/integrations` | Service connection status (AWS SES, Stripe, Keycloak, Twilio) |

---

## 6. How to Run the Project

### 6.1 Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 6.2 Setup Steps

```bash
# 1. Navigate to frontend directory
cd "E:\ERP 2\frontend"

# 2. Install dependencies (already done)
npm install

# 3. Start development server
npm run dev

# OR use the batch file
start-dev.bat
```

### 6.3 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload (port 3000) |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run test` | Run unit tests with Vitest |

### 6.4 Access URLs

| Server | URL | Description |
|--------|-----|-------------|
| Dev Server | http://localhost:3000 | Hot module replacement, live reload |
| Preview | http://localhost:4173 | Production build preview |

---

## 7. How Each Feature Works

### 7.1 Advanced Tables
**Location:** `src/components/common/AdvancedTable.tsx`

**How it works:**
1. Takes any data array and column definitions as props
2. **Search:** Real-time filtering using `useMemo` across specified fields
3. **Sort:** Click column headers to toggle ascending/descending order
4. **Filter:** Dropdown to filter by specific column values (e.g., status)
5. **Pagination:** Slices data into pages (default 10), shows page numbers with ellipsis for large datasets
6. **Clear Filters:** One-click button resets all search, sort, and filter states

### 7.2 Dark Mode
**Location:** `src/context/ThemeContext.tsx`

**How it works:**
1. React Context provides theme state globally
2. `useTheme()` hook accesses current theme and toggle function
3. `document.documentElement.classList.toggle('dark')` applies Tailwind's dark mode
4. Preference saved to `localStorage` for persistence across sessions
5. All components use `dark:` prefix classes for automatic dark styling

### 7.3 AI Chat Widget
**Location:** `src/components/common/AIChatWidget.tsx`

**How it works:**
1. Floating button in header with pulse animation and green online indicator
2. Opens a chat panel with message history
3. User messages appear on the right (blue bubbles), AI responses on the left (white bubbles)
4. Simulated typing indicator (bouncing dots) for realistic feel
5. Pre-built response database provides contextual ERP-related answers
6. Enter key sends messages, auto-scrolls to latest message

### 7.4 Command Palette (Ctrl+K)
**Location:** `src/components/common/CommandPalette.tsx`

**How it works:**
1. `Ctrl+K` or `Cmd+K` triggers the palette via global keyboard listener
2. Backdrop blur overlay with centered search modal
3. Real-time filtering of 18 commands by label or category
4. Grouped results with emoji icons for visual clarity
5. Click or press Enter to navigate using React Router
6. Keyboard hints shown at bottom (Ctrl+K to open, Esc to close)

### 7.5 Modal Forms
**Location:** `src/components/common/Modal.tsx`

**How it works:**
1. Reusable component accepting isOpen, onClose, title, and children props
2. Backdrop overlay with click-to-close
3. Centered modal with max-width constraint and max-height scroll
4. Fade-in animation using CSS keyframes
5. Used across 12+ pages for Add/Edit operations
6. Form state managed with useState, validated on submit

---

## 8. Key Technical Decisions

### 8.1 Why Vite over CRA?
- **10x faster** development server startup (HMR in milliseconds)
- Native TypeScript support without configuration
- Optimized production builds with code splitting
- Modern ESM-based architecture

### 8.2 Why TailwindCSS?
- Utility-first approach enables rapid UI development
- Built-in dark mode with `class` strategy
- Consistent design system with color scales
- Small production bundle via tree-shaking

### 8.3 Why TypeScript?
- Catch errors at compile time, not runtime
- Better IDE autocomplete and refactoring
- Self-documenting code with type definitions
- Essential for large-scale ERP systems

### 8.4 Why Redux Toolkit?
- Less boilerplate than traditional Redux
- Built-in Immer for immutable state updates
- Redux DevTools integration for debugging
- Structured slices per feature module

---

## 9. File & Component Count

| Metric | Count |
|--------|-------|
| Total Files | 130+ |
| React Components | 50+ |
| Pages | 18 |
| Redux Slices | 7 |
| Custom Hooks | 7 |
| Service Files | 8 |
| TypeScript Types | 8 |
| Lines of Code | ~6,000+ |

---

## 10. Challenges & Solutions

### Challenge 1: Dark Mode Consistency
**Problem:** Ensuring all components adapt to dark theme without duplicating styles.
**Solution:** Used TailwindCSS's `dark:` prefix strategy with a React Context provider. All colors use CSS variables and utility classes that automatically switch.

### Challenge 2: Reusable Table with Full Features
**Problem:** Creating a single table component that handles search, sort, filter, and pagination for different data types.
**Solution:** Built a generic TypeScript component with type parameter `T`, column render functions, and `useMemo` for efficient filtering.

### Challenge 3: Form State Management Across Pages
**Problem:** Managing form state and modal open/close states across 12+ pages.
**Solution:** Created a reusable `useModal()` custom hook and consistent form patterns using controlled inputs with `useState`.

### Challenge 4: No Backend Yet
**Problem:** Need working CRUD operations without a real API.
**Solution:** Implemented optimistic updates with `useState` — data persists in component state during the session. Ready for API integration later.

---

## 11. Future Enhancements

### Phase 2 (Planned)
- **Kanban Board** — Drag-and-drop task management for projects
- **PDF/Excel Export** — Export any table to downloadable files
- **Audit Log** — Track all user actions with timestamps
- **Calendar Widget** — Monthly view with events and appointments
- **File Upload** — Document management system with preview

### Phase 3 (Advanced)
- **Backend Integration** — Node.js/Express with MongoDB or PostgreSQL
- **Real Authentication** — JWT-based login with role-based access
- **Real-time Updates** — WebSocket notifications and live data
- **Multi-Tenant Support** — Separate data per company/organization
- **Internationalization** — Multi-language support (i18n)

---

## 12. How to Demo to Company

### Recommended Demo Flow (10 minutes)

1. **Start at Dashboard** (2 min)
   - Show metric cards, chart, activity feed, quick actions, tasks
   - Toggle dark/light mode

2. **Show Advanced Tables** (2 min)
   - Go to HR → Employees
   - Search for "John"
   - Sort by department
   - Show pagination

3. **Demonstrate CRUD Operations** (3 min)
   - Add a new employee (fill form, submit, see it appear)
   - Go to Finance → Ledger, add a new entry
   - Go to Supply Chain → Purchase Orders, create a PO and approve it

4. **Show Advanced Features** (2 min)
   - Press Ctrl+K to open command palette, search "payroll"
   - Open AI chat widget, ask a question
   - Show settings page, save changes

5. **Wrap Up** (1 min)
   - Mention responsive design
   - Highlight production-ready build
   - Discuss future plans

---

## 13. Project Statistics

```
┌─────────────────────────────────────────┐
│  Amdox ERP - Project Summary           │
├─────────────────────────────────────────┤
│  Modules:          6 (Finance, HR,      │
│                    Supply Chain,        │
│                    Projects, Settings,  │
│                    Dashboard)           │
│  Pages:            18                   │
│  Working Forms:    12+                  │
│  Advanced Tables:  10                   │
│  Charts:           1 (Chart.js)         │
│  Features:         Dark mode, AI Chat,  │
│                    Command Palette,     │
│                    Activity Feed        │
│  Build Size:       472 KB JS            │
│                    32 KB CSS            │
│  Build Time:       ~13 seconds          │
└─────────────────────────────────────────┘
```
