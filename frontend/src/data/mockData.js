// ─── Mock Data — Amdox ERP ─────────────────────────────────────────

// Helpers
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = arr => arr[rand(0, arr.length - 1)]
const fmt = n => `$${(n / 1000).toFixed(0)}K`

// ── Departments ────────────────────────────────────────────────────
export const DEPARTMENTS = [
  { id: 'D01', name: 'Engineering',       head: 'Vikram Singh',    size: 420, budget: 8400000, color: '#4f8ef7' },
  { id: 'D02', name: 'Sales',             head: 'Neha Reddy',      size: 280, budget: 3200000, color: '#22c55e' },
  { id: 'D03', name: 'Finance',           head: 'Ananya Iyer',     size: 140, budget: 2100000, color: '#a78bfa' },
  { id: 'D04', name: 'Human Resources',   head: 'Kiran Patel',     size: 90,  budget: 1200000, color: '#f59e0b' },
  { id: 'D05', name: 'Marketing',         head: 'Deepika Nair',    size: 110, budget: 1800000, color: '#ec4899' },
  { id: 'D06', name: 'Product',           head: 'Arjun Sharma',    size: 95,  budget: 1600000, color: '#14b8a6' },
  { id: 'D07', name: 'Design',            head: 'Sneha Gupta',     size: 65,  budget: 900000,  color: '#f97316' },
  { id: 'D08', name: 'Operations',        head: 'Mohit Kumar',     size: 180, budget: 2400000, color: '#06b6d4' },
  { id: 'D09', name: 'Customer Success',  head: 'Priya Mehta',     size: 120, budget: 1400000, color: '#84cc16' },
  { id: 'D10', name: 'Data Science',      head: 'Raj Patel',       size: 70,  budget: 1100000, color: '#8b5cf6' },
  { id: 'D11', name: 'DevOps',            head: 'Suresh Nair',     size: 55,  budget: 950000,  color: '#0ea5e9' },
  { id: 'D12', name: 'Legal',             head: 'Meena Iyer',      size: 30,  budget: 600000,  color: '#d946ef' },
  { id: 'D13', name: 'IT Infrastructure', head: 'Arun Verma',      size: 85,  budget: 1300000, color: '#f43f5e' },
  { id: 'D14', name: 'Quality Assurance', head: 'Pooja Singh',     size: 75,  budget: 800000,  color: '#10b981' },
  { id: 'D15', name: 'Security',          head: 'Dev Kumar',       size: 45,  budget: 750000,  color: '#6366f1' },
  { id: 'D16', name: 'Business Dev',      head: 'Nisha Rao',       size: 60,  budget: 1000000, color: '#fb923c' },
  { id: 'D17', name: 'Support',           head: 'Aditya Roy',      size: 200, budget: 1600000, color: '#a3e635' },
  { id: 'D18', name: 'Research',          head: 'Kavya Menon',     size: 55,  budget: 900000,  color: '#38bdf8' },
  { id: 'D19', name: 'Procurement',       head: 'Samir Shah',      size: 40,  budget: 500000,  color: '#fb7185' },
  { id: 'D20', name: 'Executive Office',  head: 'Rajan Agarwal',   size: 25,  budget: 2000000, color: '#c084fc' },
]

// ── Employees (100) ────────────────────────────────────────────────
const FIRST_NAMES = ['Priya','Rahul','Ananya','Kiran','Deepika','Vikram','Sneha','Aryan','Neha','Mohit','Pooja','Arun','Meena','Suresh','Dev','Nisha','Aditya','Kavya','Samir','Rajan','Amit','Divya','Rohit','Sonia','Nikhil','Preeti','Sanjay','Rekha','Gaurav','Anjali','Varun','Nidhi','Ajay','Pallavi','Manish','Swati','Kartik','Isha','Vivek','Radha','Harsh','Seema','Ravi','Tanya','Mayur','Aarti','Parth','Megha','Yash','Shreya']
const LAST_NAMES  = ['Sharma','Mehta','Iyer','Patel','Nair','Singh','Gupta','Joshi','Reddy','Kumar','Verma','Shah','Rao','Roy','Menon','Agarwal','Pillai','Bose','Mishra','Chopra','Khanna','Jain','Pandey','Malhotra','Srivastava']
const ROLES = {
  'Engineering':       ['Senior Engineer','Software Engineer','Tech Lead','Principal Engineer','Staff Engineer'],
  'Sales':             ['Account Executive','Sales Manager','SDR','VP Sales','Regional Manager'],
  'Finance':           ['Financial Analyst','Senior Accountant','CFO','Controller','Budget Analyst'],
  'Human Resources':   ['HR Business Partner','Recruiter','HR Manager','People Ops','Compensation Analyst'],
  'Marketing':         ['Marketing Manager','Content Strategist','CMO','Growth Marketer','Brand Designer'],
  'Product':           ['Product Manager','Senior PM','VP Product','Product Analyst','Scrum Master'],
  'Design':            ['UI Designer','UX Researcher','Design Lead','Visual Designer','Motion Designer'],
  'Operations':        ['Operations Manager','Process Analyst','COO','Logistics Manager','Admin Manager'],
  'Customer Success':  ['CSM','Senior CSM','Director CS','Support Engineer','Onboarding Manager'],
  'Data Science':      ['Data Scientist','ML Engineer','Data Analyst','Research Scientist','AI Engineer'],
  'DevOps':            ['DevOps Engineer','SRE','Platform Engineer','Cloud Architect','Infrastructure Lead'],
  'Legal':             ['Legal Counsel','Compliance Officer','Contract Manager','IP Attorney','Paralegal'],
  'IT Infrastructure': ['IT Manager','Systems Admin','Network Engineer','Help Desk Lead','Security Analyst'],
  'Quality Assurance': ['QA Engineer','Test Manager','SDET','Quality Lead','Automation Engineer'],
  'Security':          ['Security Engineer','Penetration Tester','CISO','SOC Analyst','AppSec Lead'],
  'Business Dev':      ['BDR','Partnership Manager','VP Biz Dev','Deal Analyst','Strategy Lead'],
  'Support':           ['Support Specialist','L2 Support','Support Manager','Documentation Writer','Escalation Lead'],
  'Research':          ['Research Scientist','Lab Engineer','R&D Manager','Research Analyst','Prototype Engineer'],
  'Procurement':       ['Procurement Manager','Buyer','Vendor Manager','Supply Chain Analyst','Contract Specialist'],
  'Executive Office':  ['Chief of Staff','Executive Assistant','Strategy Analyst','Program Manager','Board Liaison'],
}
const AVATAR_COLORS = ['#4f8ef7','#22c55e','#a78bfa','#f59e0b','#ec4899','#14b8a6','#f97316','#06b6d4','#84cc16','#8b5cf6','#0ea5e9','#d946ef','#f43f5e','#10b981','#6366f1','#fb923c']
const STATUSES = ['Active','Active','Active','Active','Active','Active','Active','On Leave','Remote']

export const EMPLOYEES = Array.from({ length: 100 }, (_, i) => {
  const firstName = pick(FIRST_NAMES)
  const lastName  = pick(LAST_NAMES)
  const dept      = pick(DEPARTMENTS)
  const roles     = ROLES[dept.name] || ['Specialist']
  const salary    = rand(55000, 160000)
  const initials  = firstName[0] + lastName[0]
  return {
    id:          `EMP${String(i + 1).padStart(3, '0')}`,
    name:        `${firstName} ${lastName}`,
    firstName,   lastName,
    email:       `${firstName.toLowerCase()}.${lastName.toLowerCase()}@amdox.com`,
    phone:       `+91 9${rand(100,999)} ${rand(100,999)} ${rand(1000,9999)}`,
    department:  dept.name,
    deptId:      dept.id,
    role:        pick(roles),
    salary,
    salaryFmt:   fmt(salary),
    status:      pick(STATUSES),
    score:       rand(72, 99),
    avatar:      initials,
    color:       pick(AVATAR_COLORS),
    joinDate:    `${pick(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'])} ${rand(2019,2024)}`,
    location:    pick(['Mumbai','Bengaluru','Hyderabad','Pune','Chennai','Delhi','Ahmedabad']),
    attendance:  rand(88, 100),
    leaveBalance:rand(5, 18),
    projects:    rand(1, 5),
  }
})

// ── Inventory (50 items) ───────────────────────────────────────────
const INV_CATEGORIES = ['Electronics','Furniture','Office Supplies','Hardware','Networking','Software Licenses','Safety Equipment','Stationery']
const INV_NAMES = [
  'Dell XPS 15 Laptop','MacBook Pro M3','iPhone 15 Pro','Samsung 27" Monitor','Logitech MX Master Mouse',
  'Ergonomic Office Chair','Standing Desk (Adjustable)','4K Webcam','Mechanical Keyboard','USB-C Hub',
  'iPad Pro 12.9"','Sony WH-1000XM5 Headphones','HP Color LaserJet Printer','Cisco IP Phone','UPS Battery 1500VA',
  'Server Rack Unit 42U','Network Switch 48-port','Firewall Appliance','NAS Storage 24TB','Cable Management Kit',
  'Projector Epson HD','Video Conferencing Kit','Digital Whiteboard','Conference Table Chair','Executive Desk',
  'Office Partition Panel','Visitor Chair','Storage Cabinet','Paper Shredder','Label Printer',
  'Samsung 55" Display','Raspberry Pi 4 Kit','Arduino Starter Kit','3D Printer Filament','Oscilloscope',
  'Power Strip 6-outlet','Ethernet Cable Cat6 (100m)','Fiber Patch Cable','HDMI Cable (5m)','VGA to HDMI Adapter',
  'First Aid Kit','Fire Extinguisher 5kg','Safety Helmet','Safety Vest','Emergency Flashlight',
  'Microsoft 365 License','Adobe Creative Cloud','Zoom Business','Slack Pro','Antivirus Enterprise'
]

export const INVENTORY = Array.from({ length: 50 }, (_, i) => {
  const stock = rand(0, 150)
  const price = rand(50, 5000)
  const status = stock === 0 ? 'Out of Stock' : stock < 8 ? 'Critical' : stock < 20 ? 'Low Stock' : 'In Stock'
  return {
    id:       `INV-${String(i + 1).padStart(3, '0')}`,
    name:     INV_NAMES[i] || `Item ${i + 1}`,
    category: pick(INV_CATEGORIES),
    stock,
    price,
    value:    stock * price,
    status,
    supplier: pick(['Tech Corp','Global Supplies','Premium Parts','Office Direct','Smart Tech','BestBuy B2B']),
    lastOrder:`${rand(1,28)} May 2025`,
    reorder:  rand(5, 20),
  }
})

// ── Projects (30) ─────────────────────────────────────────────────
const PROJECT_NAMES = [
  'Project Atlas','Nexus Platform v3','Sales Portal Revamp','HR System Migration','Mobile App 2.0',
  'Data Warehouse Build','Brand Identity 2025','ERP Integration','Customer Analytics Suite','DevOps Modernization',
  'Security Hardening','API Gateway Rollout','AI-Powered Insights','Compliance Audit 2025','Onboarding Portal',
  'Finance Automation','Supply Chain Optimizer','Cloud Migration Phase 2','Performance Engineering','Product Catalog API',
  'Internal Wiki Platform','Support Chatbot','Pricing Engine v2','Partner Portal','Executive Dashboard',
  'Multi-Region Expansion','Real-Time Reporting','QA Automation Framework','Vendor Management System','Employee Self-Service Portal'
]
const PROJ_STATUSES = ['Active','Active','Active','Active','Completed','Completed','On Hold','Cancelled']
const PRIORITIES    = ['High','High','Medium','Low']

export const PROJECTS = PROJECT_NAMES.map((name, i) => {
  const budget = rand(150000, 3000000)
  const used   = rand(15, 100)
  const status = pick(PROJ_STATUSES)
  const dept   = pick(DEPARTMENTS)
  return {
    id:       `PRJ-${String(i + 1).padStart(3, '0')}`,
    name,
    department: dept.name,
    deptColor:  dept.color,
    budget,
    budgetFmt: `$${(budget / 1000).toFixed(0)}K`,
    budgetUsed: used,
    status,
    priority:  pick(PRIORITIES),
    due:       `${pick(['Jul','Aug','Sep','Oct','Nov','Dec'])} 2025`,
    team:      rand(2, 8),
    tasks:     { total: rand(20, 80), done: rand(5, 20) },
    health:    pick(['On Track','At Risk','Ahead','Delayed']),
    startDate: `Jan ${rand(1, 28)}, 2025`,
  }
})

// ── Tasks (200) ────────────────────────────────────────────────────
const TASK_TITLES = [
  'Fix authentication bug','Deploy to production','Review pull request','Write unit tests',
  'Design new dashboard','Update API documentation','Refactor legacy code','Implement dark mode',
  'Set up CI/CD pipeline','Create onboarding flow','Optimize database queries','Add error logging',
  'Build reporting module','Integrate payment gateway','Security vulnerability patch','Performance audit',
  'Mobile responsiveness fix','Accessibility improvements','Data migration script','Cache optimization',
]
const TASK_STATUSES   = ['todo','in-progress','review','done']
const TASK_PRIORITIES = ['low','medium','high','urgent']

export const TASKS = Array.from({ length: 200 }, (_, i) => {
  const proj = pick(PROJECTS)
  const emp  = pick(EMPLOYEES)
  return {
    id:       `TSK-${String(i + 1).padStart(4, '0')}`,
    title:    pick(TASK_TITLES),
    project:  proj.name,
    projectId:proj.id,
    assignee: emp.name,
    avatar:   emp.avatar,
    color:    emp.color,
    status:   pick(TASK_STATUSES),
    priority: pick(TASK_PRIORITIES),
    due:      `${rand(1, 30)} Jun 2025`,
    estimate: `${rand(1, 8)}h`,
  }
})

// ── Activity Log (500) ────────────────────────────────────────────
const ACT_TEMPLATES = [
  emp => `${emp.name} joined ${emp.department} team`,
  emp => `${emp.name} completed performance review`,
  emp => `New project assigned to ${emp.name}`,
  emp => `${emp.name} submitted expense report`,
  emp => `Leave approved for ${emp.name}`,
  emp => `${emp.name} promoted to senior role`,
  emp => `${emp.name} completed training module`,
  emp => `Payslip generated for ${emp.name}`,
  emp => `${emp.name} updated their profile`,
  emp => `${emp.name} raised a support ticket`,
]
const TIME_LABELS = ['Just now','2m ago','5m ago','15m ago','1h ago','2h ago','4h ago','Yesterday','2 days ago','3 days ago']
const ACT_TYPES   = ['hr','finance','project','inventory','system']

export const ACTIVITIES = Array.from({ length: 500 }, (_, i) => {
  const emp = pick(EMPLOYEES)
  const tmpl = pick(ACT_TEMPLATES)
  return {
    id:   i,
    text: tmpl(emp),
    type: pick(ACT_TYPES),
    time: pick(TIME_LABELS),
    emp,
  }
})

// ── Finance Data ───────────────────────────────────────────────────
export const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 2100000, expenses: 1400000, profit: 700000 },
  { month: 'Feb', revenue: 2340000, expenses: 1520000, profit: 820000 },
  { month: 'Mar', revenue: 2680000, expenses: 1680000, profit: 1000000 },
  { month: 'Apr', revenue: 3100000, expenses: 1900000, profit: 1200000 },
  { month: 'May', revenue: 3850000, expenses: 2200000, profit: 1650000 },
  { month: 'Jun', revenue: 4200000, expenses: 2450000, profit: 1750000 },
]

export const TRANSACTIONS = Array.from({ length: 50 }, (_, i) => {
  const isCredit = Math.random() > .4
  const amount   = rand(1000, 280000)
  const cats     = ['Revenue','Operations','Technology','Personnel','Marketing','Legal','Travel','Training']
  return {
    id:     `TXN-${9800 + i}`,
    desc:   isCredit
      ? pick(['Client Payment','Software License Revenue','Consulting Fee','SaaS Subscription','Project Milestone Payment'])
      : pick(['Office Supplies','AWS Infrastructure','Employee Payroll','Marketing Campaign','Legal Services','Travel Expenses']),
    category: pick(cats),
    date:   `${rand(1, 30)} ${pick(['May','Jun'])} 2025`,
    amount: isCredit ? amount : -amount,
    status: pick(['Completed','Completed','Completed','Pending']),
    type:   isCredit ? 'credit' : 'debit',
  }
})

// ── KPI Summary ────────────────────────────────────────────────────
export const KPI = {
  employees:       2847,
  revenue:         '$4.2M',
  revenueRaw:      4200000,
  activeProjects:  47,
  inventoryValue:  '$1.8M',
  departments:     20,
  taskCompletion:  78,
  netProfit:       '$4.3M',
  totalRevenue:    '$12.4M',
  totalExpenses:   '$8.1M',
  budgetAvail:     '$5.9M',
  nps:             72,
  retention:       94,
  avgSalary:       89400,
}

// ── Leave Requests ─────────────────────────────────────────────────
export const LEAVE_REQUESTS = EMPLOYEES.slice(0, 20).map((emp, i) => ({
  id:     `LVR-${100 + i}`,
  emp,
  type:   pick(['Annual Leave','Sick Leave','WFH','Maternity','Paternity','Casual Leave','Emergency']),
  days:   rand(1, 14),
  from:   `Jun ${rand(10, 20)}, 2025`,
  to:     `Jun ${rand(21, 30)}, 2025`,
  status: pick(['pending','approved','approved','approved','rejected']),
  reason: pick(['Family vacation','Medical appointment','Personal emergency','Work from home','Child care']),
}))

// ── Report definitions ─────────────────────────────────────────────
export const REPORTS = [
  { id:'R01', name:'Monthly HR Summary',       type:'Automated', freq:'Monthly',   last:'Jun 1, 2025',  status:'Sent',     icon:'👥', color:'kpi-blue' },
  { id:'R02', name:'Quarterly Financials',     type:'Manual',    freq:'Quarterly', last:'Apr 1, 2025',  status:'Draft',    icon:'💰', color:'kpi-green' },
  { id:'R03', name:'Weekly Project Status',    type:'Automated', freq:'Weekly',    last:'Jun 3, 2025',  status:'Sent',     icon:'🗂', color:'kpi-purple' },
  { id:'R04', name:'Annual Inventory Audit',   type:'Manual',    freq:'Annual',    last:'Jan 1, 2025',  status:'Archived', icon:'📦', color:'kpi-amber' },
  { id:'R05', name:'Payroll Analytics',        type:'Automated', freq:'Monthly',   last:'Jun 1, 2025',  status:'Sent',     icon:'💵', color:'kpi-teal' },
  { id:'R06', name:'Employee Attrition Report',type:'Manual',    freq:'Quarterly', last:'Mar 31, 2025', status:'Draft',    icon:'📊', color:'kpi-red' },
]
