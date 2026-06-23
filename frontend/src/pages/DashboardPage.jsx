import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { KPICard }     from '../components/shared/KPICard'
import { ProgressBar } from '../components/shared/ProgressBar'
import { Avatar }      from '../components/shared/Avatar'
import { SkeletonCard }from '../components/shared/Skeleton'
import { ACTIVITIES, MONTHLY_REVENUE, DEPARTMENTS } from '../data/mockData'
import { useApp }      from '../context/AppContext'
import { useData }     from '../context/DataContext'

const CHART_DATA = MONTHLY_REVENUE.map(m => ({
  ...m, revenue:m.revenue/1000000, expenses:m.expenses/1000000,
}))
const FORECAST_DATA = [
  { month:'Jul', forecast:4.6 },{ month:'Aug', forecast:4.95 },
  { month:'Sep', forecast:5.2 },{ month:'Oct', forecast:5.55 },
  { month:'Nov', forecast:5.8 },{ month:'Dec', forecast:6.1  },
]
const COMBINED = [
  ...CHART_DATA.map(d=>({ month:d.month, actual:d.revenue })),
  ...FORECAST_DATA.map(d=>({ month:d.month, forecast:d.forecast })),
]
const PROJ_STATUS_DATA = [
  { name:'Active',    value:47, color:'#4f8ef7' },
  { name:'Completed', value:31, color:'#22c55e' },
  { name:'On Hold',   value:12, color:'#f59e0b' },
  { name:'Cancelled', value:4,  color:'#ef4444' },
]
const GROWTH = [
  {q:"Q1'24",emp:2100},{q:"Q2'24",emp:2240},{q:"Q3'24",emp:2380},
  {q:"Q4'24",emp:2520},{q:"Q1'25",emp:2680},{q:"Q2'25",emp:2847},
]

export function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const { role } = useApp()
  const { employees, projects, inventory } = useData()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const activeProj   = projects.filter(p=>p.status==='Active').length
  const invValue     = inventory.reduce((a,i)=>a+i.value,0)
  const avgPerf      = employees.length ? Math.round(employees.reduce((a,e)=>a+e.score,0)/employees.length) : 0
  const deptCount    = new Set(employees.map(e=>e.department)).size

  const KPIS = [
    { icon:'👥', label:'Total Employees', value:employees.length.toLocaleString(), change:'12% vs last quarter', dir:'up',     color:'kpi-blue' },
    { icon:'💵', label:'Revenue (MTD)',    value:'$4.2M',           change:'18.4% vs last month',  dir:'up',     color:'kpi-green' },
    { icon:'🗂',  label:'Active Projects', value:activeProj,         change:`${projects.length} total projects`, dir:'up',  color:'kpi-purple' },
    { icon:'📦', label:'Inventory Value',  value:`$${(invValue/1000000).toFixed(1)}M`, change:'Stock levels tracked', color:'kpi-amber' },
    { icon:'🏢', label:'Departments',      value:deptCount,          change:'Across 4 regions',    dir:'neutral', color:'kpi-teal' },
    { icon:'⭐', label:'Avg Performance',  value:`${avgPerf}%`,      change:'Team productivity',   dir:'up',     color:'kpi-red' },
  ]

  return (
    <div className="page-enter" style={{padding:24}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)'}}>Executive Dashboard</h1>
        <p style={{fontSize:13,color:'var(--text2)',marginTop:4}}>
          {new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} · Fiscal Q2 · Role: {role.charAt(0).toUpperCase()+role.slice(1)}
        </p>
      </div>

      {/* KPIs */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:14,marginBottom:20}}>
        {loading
          ? Array(6).fill(0).map((_,i)=><SkeletonCard key={i}/>)
          : KPIS.map((k,i)=><KPICard key={i} icon={k.icon} label={k.label} value={k.value} change={k.change} changeDir={k.dir} color={k.color}/>)
        }
      </div>

      {/* Revenue + Dept */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
            <span style={{fontSize:13,fontWeight:500,color:'var(--text2)'}}>Revenue Trends · 2025</span>
            <div style={{display:'flex',gap:10}}>
              {[['Actual','#4f8ef7'],['Forecast','#a78bfa']].map(([l,c])=>(
                <div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text2)'}}>
                  <span style={{width:10,height:10,borderRadius:2,background:c,display:'inline-block'}}></span>{l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={COMBINED}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f8ef7" stopOpacity={.3}/>
                  <stop offset="100%" stopColor="#4f8ef7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={.2}/>
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)"/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}M`}/>
              <Tooltip formatter={v=>`$${v}M`} contentStyle={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8}}/>
              <Area type="monotone" dataKey="actual"   stroke="#4f8ef7" strokeWidth={2} fill="url(#aGrad)" name="Actual"   connectNulls/>
              <Area type="monotone" dataKey="forecast" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 4" fill="url(#fGrad)" name="Forecast" connectNulls/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16}}>Department Performance · Q2</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DEPARTMENTS.slice(0,8).map(d=>({dept:d.name.split(' ')[0],score:70+Math.floor(Math.random()*28)}))} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)"/>
              <XAxis dataKey="dept" tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <YAxis domain={[60,100]} tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v=>`${v}%`} contentStyle={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8}}/>
              <Bar dataKey="score" name="Score" radius={[4,4,0,0]}>
                {DEPARTMENTS.slice(0,8).map((_,i)=>(
                  <Cell key={i} fill={['#4f8ef7','#22c55e','#a78bfa','#f59e0b','#ec4899','#14b8a6','#f97316','#06b6d4'][i]} fillOpacity={.8}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 360px',gap:16,marginBottom:16}}>
        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16}}>Employee Growth</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={GROWTH} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)"/>
              <XAxis dataKey="q" tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <YAxis domain={[1900,3000]} tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8}}/>
              <Bar dataKey="emp" name="Headcount" fill="#4f8ef7" fillOpacity={.8} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:12}}>Project Status</div>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={PROJ_STATUS_DATA} dataKey="value" innerRadius={50} outerRadius={72} strokeWidth={0}>
                  {PROJ_STATUS_DATA.map((s,i)=><Cell key={i} fill={s.color}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{flex:1}}>
              {PROJ_STATUS_DATA.map(s=>(
                <div key={s.name} className="stat-row">
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{width:8,height:8,borderRadius:'50%',background:s.color,display:'inline-block',flexShrink:0}}></span>
                    <span style={{fontSize:13,color:'var(--text2)'}}>{s.name}</span>
                  </div>
                  <span style={{fontSize:13,fontWeight:500}}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* AI Insights */}
        <div className="card" style={{background:'linear-gradient(135deg,#0f1e42,var(--card))',border:'1px solid rgba(79,142,247,.2)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
            <span style={{fontSize:13,fontWeight:500,color:'var(--accent)'}}>✦ AI Insights</span>
            <span style={{fontSize:10,background:'rgba(79,142,247,.15)',color:'var(--accent)',padding:'2px 8px',borderRadius:10,fontWeight:500}}>LIVE</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              ['📈','Revenue is tracking 22% above forecast for Q2. Engineering shows highest productivity.','var(--green)'],
              ['⚠️',`${inventory.filter(i=>i.status==='Critical'||i.status==='Low Stock').length} inventory items are critically low. Procurement alert needed.`,'var(--amber)'],
              ['✅','Project Atlas is 3 days ahead of schedule with 94% milestone completion rate.','var(--accent)'],
            ].map(([icon,text],i)=>(
              <div key={i} style={{background:'rgba(0,0,0,.2)',border:'1px solid rgba(79,142,247,.1)',borderRadius:8,padding:12,fontSize:12,color:'var(--text2)',lineHeight:1.5}}>
                {icon} {text}
              </div>
            ))}
            <button onClick={()=>navigate('/ai')} className="erp-btn" style={{fontSize:12,marginTop:4}}>Open AI Assistant →</button>
          </div>
        </div>
      </div>

      {/* Row 4 */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
            <span style={{fontSize:13,fontWeight:500,color:'var(--text2)'}}>Recent Activity</span>
            <button style={{fontSize:12,color:'var(--accent)',background:'none',border:'none',cursor:'pointer'}}>View all</button>
          </div>
          {ACTIVITIES.slice(0,7).map((a,i)=>(
            <div key={i} className="timeline-item">
              <Avatar initials={a.emp.avatar} color={a.emp.color} size={28} radius={6}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:'var(--text)',lineHeight:1.4}}>{a.text}</div>
                <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16}}>Team Performance · This Week</div>
          {DEPARTMENTS.slice(0,8).map((d)=>{
            const score = 70+Math.floor(Math.random()*28)
            const color = score>90?'green':score>80?'blue':'amber'
            return (
              <div key={d.id} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5}}>
                  <span style={{color:'var(--text2)'}}>{d.name}</span>
                  <span style={{fontWeight:500,color:`var(--${color==='blue'?'accent':color})`}}>{score}%</span>
                </div>
                <ProgressBar value={score} color={color}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
