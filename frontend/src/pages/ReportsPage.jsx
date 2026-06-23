import { REPORTS } from '../data/mockData'
import { Badge } from '../components/shared/Badge'

const REPORT_CARDS = [
  { icon:'👥', title:'HR Report',        desc:'Headcount, attrition, performance analytics', color:'kpi-blue' },
  { icon:'💰', title:'Payroll Report',   desc:'Salary distribution, payslips, tax summary',  color:'kpi-green' },
  { icon:'📦', title:'Inventory Report', desc:'Stock levels, reorder analysis, valuation',    color:'kpi-amber' },
  { icon:'💵', title:'Financial Report', desc:'P&L, cash flow, budget vs actuals',            color:'kpi-teal' },
  { icon:'🗂',  title:'Project Report',  desc:'Status, milestones, budget utilization',       color:'kpi-purple' },
  { icon:'📊', title:'Analytics Report', desc:'KPIs, trends, forecasts, benchmarks',          color:'kpi-red' },
]

export function ReportsPage() {
  return (
    <div className="page-enter" style={{ padding:24 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)' }}>Reports Center</h1>
        <p style={{ fontSize:13,color:'var(--text2)',marginTop:4 }}>Generate, preview, and export enterprise reports</p>
      </div>

      {/* Filters bar */}
      <div style={{ display:'flex',gap:10,marginBottom:20,alignItems:'center' }}>
        <input placeholder="🔍 Search reports..." className="erp-input" style={{ maxWidth:280 }} />
        <select className="erp-select"><option>All Types</option><option>Automated</option><option>Manual</option></select>
        <select className="erp-select"><option>All Periods</option><option>Monthly</option><option>Quarterly</option><option>Annual</option></select>
        <div style={{ marginLeft:'auto',display:'flex',gap:8 }}>
          <button className="erp-btn-ghost">📅 Date Range</button>
          <button className="erp-btn">+ New Report</button>
        </div>
      </div>

      {/* Report cards */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:24 }}>
        {REPORT_CARDS.map((r,i) => (
          <div key={i} className="card" style={{ cursor:'pointer',transition:'all .15s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform=''}
          >
            <div className={`kpi-icon ${r.color}`} style={{ marginBottom:12 }}>{r.icon}</div>
            <div style={{ fontSize:15,fontWeight:500,marginBottom:4 }}>{r.title}</div>
            <div style={{ fontSize:12,color:'var(--text3)',marginBottom:16,lineHeight:1.5 }}>{r.desc}</div>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12 }}>
              <Badge variant="gray">Last: Jun 1, 2025</Badge>
              <Badge variant="green">Sent</Badge>
            </div>
            <div style={{ display:'flex',gap:8 }}>
              <button className="erp-btn-ghost" style={{ flex:1,padding:'8px',fontSize:12 }}>👁 Preview</button>
              <button className="erp-btn" style={{ flex:1,padding:'8px',fontSize:12 }}>⬇ Export PDF</button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled reports table */}
      <div className="card">
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
          <span style={{ fontSize:13,fontWeight:500,color:'var(--text2)' }}>Scheduled Reports</span>
          <div style={{ display:'flex',gap:8 }}>
            <button className="erp-btn-ghost" style={{ fontSize:12 }}>⚙ Manage Schedules</button>
            <button className="erp-btn" style={{ fontSize:12 }}>+ Schedule Report</button>
          </div>
        </div>
        <table className="data-table">
          <thead><tr>
            <th>Report Name</th><th>Type</th><th>Frequency</th>
            <th>Last Generated</th><th>Next Run</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {REPORTS.map(r => (
              <tr key={r.id}>
                <td>
                  <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                    <span style={{ fontSize:16 }}>{r.icon}</span>
                    <span style={{ fontWeight:500 }}>{r.name}</span>
                  </div>
                </td>
                <td><Badge variant={r.type==='Automated'?'blue':'purple'}>{r.type}</Badge></td>
                <td style={{ color:'var(--text2)' }}>{r.freq}</td>
                <td style={{ color:'var(--text2)',fontFamily:'DM Mono,monospace',fontSize:12 }}>{r.last}</td>
                <td style={{ color:'var(--text2)',fontFamily:'DM Mono,monospace',fontSize:12 }}>
                  {r.freq==='Monthly'?'Jul 1, 2025':r.freq==='Weekly'?'Jun 10, 2025':r.freq==='Quarterly'?'Jul 1, 2025':'Jan 1, 2026'}
                </td>
                <td><Badge variant={r.status==='Sent'?'green':r.status==='Draft'?'amber':'gray'}>{r.status}</Badge></td>
                <td>
                  <div style={{ display:'flex',gap:6 }}>
                    <button className="erp-btn-ghost" style={{ padding:'4px 10px',fontSize:11 }}>View</button>
                    <button className="erp-btn-ghost" style={{ padding:'4px 10px',fontSize:11 }}>Run Now</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
