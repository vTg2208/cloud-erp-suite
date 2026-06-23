import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { KPICard }     from '../components/shared/KPICard'
import { ProgressBar } from '../components/shared/ProgressBar'

const FORECAST = [
  { month:'Jul', forecast:4.6, low:4.2, high:4.9 },
  { month:'Aug', forecast:4.95,low:4.5, high:5.3 },
  { month:'Sep', forecast:5.2, low:4.8, high:5.6 },
  { month:'Oct', forecast:5.55,low:5.1, high:5.9 },
  { month:'Nov', forecast:5.8, low:5.3, high:6.2 },
  { month:'Dec', forecast:6.1, low:5.6, high:6.6 },
]

const PROD_DATA = [
  { dept:'Engineering',  score:92 },{ dept:'Finance',   score:95 },
  { dept:'Sales',        score:87 },{ dept:'Design',    score:90 },
  { dept:'HR',           score:88 },{ dept:'Marketing', score:83 },
  { dept:'Operations',   score:79 },{ dept:'Support',   score:71 },
]

const EMP_DIST = [
  { name:'Engineering', value:28, color:'#4f8ef7' },
  { name:'Sales',       value:18, color:'#22c55e' },
  { name:'Finance',     value:12, color:'#a78bfa' },
  { name:'HR',          value:10, color:'#f59e0b' },
  { name:'Marketing',   value:9,  color:'#ec4899' },
  { name:'Other',       value:23, color:'#14b8a6' },
]

const MONTHLY = [
  { month:'Jan', revenue:2.1, employees:2100 },
  { month:'Feb', revenue:2.34,employees:2200 },
  { month:'Mar', revenue:2.68,employees:2300 },
  { month:'Apr', revenue:3.1, employees:2450 },
  { month:'May', revenue:3.85,employees:2650 },
  { month:'Jun', revenue:4.2, employees:2847 },
]

const BUDGET_DEPTS = [
  { dept:'Engineering', used:87, color:'blue' },
  { dept:'Marketing',   used:61, color:'amber' },
  { dept:'HR',          used:44, color:'green' },
  { dept:'R&D',         used:92, color:'purple' },
  { dept:'Operations',  used:68, color:'teal' },
  { dept:'Sales',       used:55, color:'blue' },
]

const METRICS = [
  { label:'NPS Score',     value:'72',    sub:'↑ 8pts', up:true },
  { label:'Churn Rate',    value:'2.4%',  sub:'↑ 0.3%', up:false },
  { label:'ARPU',          value:'$4,280',sub:'↑ 12%',  up:true },
  { label:'CAC',           value:'$840',  sub:'↓ 15%',  up:true },
  { label:'LTV',           value:'$28K',  sub:'↑ 9%',   up:true },
  { label:'MRR',           value:'$1.4M', sub:'↑ 6%',   up:true },
]

export function AnalyticsPage() {
  return (
    <div className="page-enter" style={{ padding:24 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)' }}>Analytics Center</h1>
        <p style={{ fontSize:13,color:'var(--text2)',marginTop:4 }}>Business intelligence · Real-time data · Predictive insights</p>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20 }}>
        <KPICard icon="📈" label="Monthly Growth"   value="+18.4%"  change="Revenue MTD"    changeDir="up" color="kpi-green" />
        <KPICard icon="🎯" label="Forecast Accuracy" value="94%"    change="vs last quarter" changeDir="up" color="kpi-blue" />
        <KPICard icon="⚡" label="Avg Productivity"  value="86%"    change="2% this month"  changeDir="up" color="kpi-purple" />
        <KPICard icon="🔮" label="Q3 Forecast"       value="$5.2M"  change="AI projected"   color="kpi-teal" />
      </div>

      {/* Row 1 */}
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16 }}>
        <div className="card">
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
            <span style={{ fontSize:13,fontWeight:500,color:'var(--text2)' }}>Revenue Forecast · Next 6 Months</span>
            <span className="badge badge-purple">✦ AI Powered</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={FORECAST}>
              <defs>
                <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={.3} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
              <XAxis dataKey="month" tick={{ fontSize:11,fill:'var(--text3)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:11,fill:'var(--text3)' }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}M`} />
              <Tooltip formatter={v=>`$${v}M`} contentStyle={{ background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8 }} />
              <Area type="monotone" dataKey="high"     stroke="none" fill="#a78bfa18" />
              <Area type="monotone" dataKey="forecast" stroke="#a78bfa" strokeWidth={2.5} fill="url(#fGrad)" name="Forecast" />
              <Area type="monotone" dataKey="low"      stroke="none" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16 }}>Productivity by Department</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PROD_DATA} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
              <XAxis type="number" domain={[60,100]} tick={{ fontSize:10,fill:'var(--text3)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" width={90} tick={{ fontSize:11,fill:'var(--text3)' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v=>`${v}%`} contentStyle={{ background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8 }} />
              <Bar dataKey="score" name="Score" radius={[0,4,4,0]}>
                {PROD_DATA.map((d,i) => (
                  <Cell key={i} fill={d.score>=90?'#22c55e':d.score>=85?'#4f8ef7':'#f59e0b'} fillOpacity={.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:16 }}>
        <div className="card">
          <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14 }}>Employee Distribution</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={EMP_DIST} dataKey="value" innerRadius={50} outerRadius={75} strokeWidth={0}>
                {EMP_DIST.map((d,i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={v=>`${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'4px 12px',marginTop:10 }}>
            {EMP_DIST.map(d=>(
              <div key={d.name} style={{ display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text2)' }}>
                <span style={{ width:8,height:8,borderRadius:2,background:d.color,display:'inline-block' }}></span>
                {d.name}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14 }}>Budget Utilization</div>
          {BUDGET_DEPTS.map(d => (
            <div key={d.dept} style={{ marginBottom:12 }}>
              <div style={{ display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5 }}>
                <span style={{ color:'var(--text2)' }}>{d.dept}</span>
                <span style={{ fontWeight:500,color:d.used>85?'var(--red)':d.used>70?'var(--amber)':'var(--green)' }}>{d.used}%</span>
              </div>
              <ProgressBar value={d.used} color={d.used>85?'red':d.used>70?'amber':d.color} />
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14 }}>Key Business Metrics</div>
          {METRICS.map(m => (
            <div key={m.label} className="stat-row">
              <span style={{ color:'var(--text2)' }}>{m.label}</span>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:14,fontWeight:600 }}>{m.value}</div>
                <div style={{ fontSize:11,color:m.up?'var(--green)':'var(--red)' }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue + Employee dual axis */}
      <div className="card">
        <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16 }}>Revenue vs Headcount Growth · 2025</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={MONTHLY}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
            <XAxis dataKey="month" tick={{ fontSize:11,fill:'var(--text3)' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="rev" tick={{ fontSize:11,fill:'var(--text3)' }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}M`} />
            <YAxis yAxisId="emp" orientation="right" tick={{ fontSize:11,fill:'var(--text3)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8 }} />
            <Line yAxisId="rev" type="monotone" dataKey="revenue"   stroke="#4f8ef7" strokeWidth={2.5} dot={{ fill:'#4f8ef7',r:4 }} name="Revenue ($M)" />
            <Line yAxisId="emp" type="monotone" dataKey="employees" stroke="#22c55e" strokeWidth={2.5} dot={{ fill:'#22c55e',r:4 }} name="Headcount" strokeDasharray="5 3" />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:12,color:'var(--text2)' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
