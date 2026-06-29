import { useState } from 'react'
import { useData }     from '../context/DataContext'
import { DEPARTMENTS } from '../data/mockData'
import { Avatar }      from '../components/shared/Avatar'
import { Badge }       from '../components/shared/Badge'
import { ProgressBar } from '../components/shared/ProgressBar'
import { KPICard }     from '../components/shared/KPICard'
import { Modal, FormRow, FormGrid, ModalFooter, ConfirmModal } from '../components/shared/Modal'

const TABS = ['Employee Directory','Payroll','Leave Management','Performance']
const STATUS_VARIANT = { Active:'green','On Leave':'amber',Remote:'blue',Terminated:'red' }
const ROLES_LIST = ['Software Engineer','Senior Engineer','Tech Lead','Product Manager','Data Analyst','HR Manager','Finance Analyst','Marketing Manager','Sales Executive','Operations Manager','Designer','DevOps Engineer','QA Engineer','Support Specialist','Business Analyst']

const EMPTY_EMP = { firstName:'', lastName:'', email:'', phone:'', department:'Engineering', role:'', salary:'', status:'Active', score:'80', attendance:'95', leaveBalance:'12', location:'Bengaluru' }

function EmployeeModal({ open, onClose, initial }) {
  const { addEmployee, updateEmployee } = useData()
  const [form, setForm] = useState(initial || EMPTY_EMP)
  const isEdit = !!initial?.id

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) return alert('First and Last name are required')
    if (!form.role.trim()) return alert('Role is required')
    if (isEdit) updateEmployee(initial.id, form)
    else addEmployee(form)
    onClose()
    setForm(EMPTY_EMP)
  }

  // reset when opened
  const handleOpen = () => { if (!isEdit) setForm(EMPTY_EMP) }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? `Edit — ${initial?.name}` : 'Add New Employee'} width={620}>
      <div style={{ padding: '20px 22px' }}>
        <FormGrid>
          <FormRow label="First Name" required>
            <input className="erp-input" value={form.firstName} onChange={e=>set('firstName',e.target.value)} placeholder="e.g. Priya" />
          </FormRow>
          <FormRow label="Last Name" required>
            <input className="erp-input" value={form.lastName} onChange={e=>set('lastName',e.target.value)} placeholder="e.g. Sharma" />
          </FormRow>
          <FormRow label="Email">
            <input className="erp-input" type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="priya.sharma@amdox.com" />
          </FormRow>
          <FormRow label="Phone">
            <input className="erp-input" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 98765 43210" />
          </FormRow>
          <FormRow label="Department" required>
            <select className="erp-select" style={{width:'100%'}} value={form.department} onChange={e=>set('department',e.target.value)}>
              {DEPARTMENTS.map(d=><option key={d.id}>{d.name}</option>)}
            </select>
          </FormRow>
          <FormRow label="Role" required>
            <input className="erp-input" value={form.role} onChange={e=>set('role',e.target.value)} placeholder="e.g. Senior Engineer" list="roles-list" />
            <datalist id="roles-list">{ROLES_LIST.map(r=><option key={r} value={r}/>)}</datalist>
          </FormRow>
          <FormRow label="Salary (Annual $)">
            <input className="erp-input" type="number" value={form.salary} onChange={e=>set('salary',e.target.value)} placeholder="85000" />
          </FormRow>
          <FormRow label="Location">
            <select className="erp-select" style={{width:'100%'}} value={form.location} onChange={e=>set('location',e.target.value)}>
              {['Mumbai','Bengaluru','Hyderabad','Pune','Chennai','Delhi','Ahmedabad','Kolkata'].map(l=><option key={l}>{l}</option>)}
            </select>
          </FormRow>
          <FormRow label="Status">
            <select className="erp-select" style={{width:'100%'}} value={form.status} onChange={e=>set('status',e.target.value)}>
              {['Active','On Leave','Remote','Terminated'].map(s=><option key={s}>{s}</option>)}
            </select>
          </FormRow>
          <FormRow label="Performance Score (0-100)">
            <input className="erp-input" type="number" min="0" max="100" value={form.score} onChange={e=>set('score',e.target.value)} />
          </FormRow>
          <FormRow label="Attendance %">
            <input className="erp-input" type="number" min="0" max="100" value={form.attendance} onChange={e=>set('attendance',e.target.value)} />
          </FormRow>
          <FormRow label="Leave Balance (days)">
            <input className="erp-input" type="number" value={form.leaveBalance} onChange={e=>set('leaveBalance',e.target.value)} />
          </FormRow>
        </FormGrid>
      </div>
      <ModalFooter onClose={onClose} onSave={handleSave} saveLabel={isEdit?'Update Employee':'Add Employee'} />
    </Modal>
  )
}

export function HRPage() {
  const { employees, deleteEmployee, leaves, addLeave, updateLeaveStatus } = useData()
  const [tab,    setTab]    = useState(0)
  const [search, setSearch] = useState('')
  const [dept,   setDept]   = useState('All')
  const [page,   setPage]   = useState(1)
  const [addOpen,  setAddOpen]  = useState(false)
  const [editEmp,  setEditEmp]  = useState(null)
  const [delEmp,   setDelEmp]   = useState(null)
  const PER = 10

  const filtered = employees.filter(e => {
    const ms = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()) || e.id.includes(search)
    const md = dept === 'All' || e.department === dept
    return ms && md
  })
  const paged    = filtered.slice((page-1)*PER, page*PER)
  const totalPgs = Math.ceil(filtered.length / PER)

  return (
    <div className="page-enter" style={{padding:24}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)'}}>HR Management</h1>
        <p style={{fontSize:13,color:'var(--text2)',marginTop:4}}>{employees.length} employees · 20 departments · 94% retention rate</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
        <KPICard icon="👥" label="Total Employees" value={employees.length} change="12% this quarter" changeDir="up" color="kpi-blue" />
        <KPICard icon="🆕" label="Active Employees" value={employees.filter(e=>e.status==='Active').length} color="kpi-green" />
        <KPICard icon="📉" label="On Leave" value={employees.filter(e=>e.status==='On Leave').length} color="kpi-amber" />
        <KPICard icon="⭐" label="Avg Performance" value={Math.round(employees.reduce((a,e)=>a+e.score,0)/employees.length)+'%'} color="kpi-purple" />
      </div>

      <div style={{display:'flex',gap:2,background:'var(--bg3)',borderRadius:10,padding:4,marginBottom:20,width:'fit-content'}}>
        {TABS.map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{padding:'8px 18px',borderRadius:8,fontSize:13,cursor:'pointer',border:'none',fontFamily:'inherit',background:tab===i?'var(--card)':'transparent',color:tab===i?'var(--text)':'var(--text2)',fontWeight:tab===i?500:400,transition:'all .15s'}}>{t}</button>
        ))}
      </div>

      {tab===0 && (
        <div className="card">
          <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="🔍 Search name, role, ID..." className="erp-input" style={{flex:1,maxWidth:300}} />
            <select value={dept} onChange={e=>{setDept(e.target.value);setPage(1)}} className="erp-select">
              <option value="All">All Departments</option>
              {DEPARTMENTS.map(d=><option key={d.id}>{d.name}</option>)}
            </select>
            <div style={{marginLeft:'auto'}}>
              <button onClick={()=>setAddOpen(true)} className="erp-btn">+ Add Employee</button>
            </div>
          </div>
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Department</th><th>Role</th><th>Salary</th><th>Performance</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {paged.map(e=>(
                <tr key={e.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <Avatar initials={e.avatar} color={e.color} size={32} />
                      <div>
                        <div style={{fontWeight:500}}>{e.name}</div>
                        <div style={{fontSize:11,color:'var(--text3)'}}>{e.id} · {e.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><Badge variant="gray">{e.department}</Badge></td>
                  <td style={{color:'var(--text2)'}}>{e.role}</td>
                  <td style={{fontFamily:'DM Mono,monospace',fontSize:13}}>${e.salary.toLocaleString()}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontWeight:500,fontSize:13,color:e.score>=90?'var(--green)':e.score>=80?'var(--accent)':'var(--amber)'}}>{e.score}%</span>
                      <div style={{width:60}}><ProgressBar value={e.score} color={e.score>=90?'green':e.score>=80?'blue':'amber'} /></div>
                    </div>
                  </td>
                  <td><Badge variant={STATUS_VARIANT[e.status]||'gray'}>{e.status}</Badge></td>
                  <td>
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={()=>setEditEmp(e)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11}}>✏ Edit</button>
                      <button onClick={()=>setDelEmp(e)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'rgba(239,68,68,.3)'}}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:14,fontSize:13,color:'var(--text3)'}}>
            <span>Showing {((page-1)*PER)+1}–{Math.min(page*PER,filtered.length)} of {filtered.length}</span>
            <div style={{display:'flex',gap:4}}>
              <button className="erp-btn-ghost" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>← Prev</button>
              {Array.from({length:Math.min(5,totalPgs)},(_,i)=>i+1).map(p=>(
                <button key={p} onClick={()=>setPage(p)} style={{width:32,height:32,borderRadius:6,border:'1px solid var(--border)',cursor:'pointer',fontSize:12,fontFamily:'inherit',background:page===p?'var(--accent)':'var(--bg3)',color:page===p?'#fff':'var(--text2)'}}>{p}</button>
              ))}
              <button className="erp-btn-ghost" onClick={()=>setPage(p=>Math.min(totalPgs,p+1))} disabled={page===totalPgs}>Next →</button>
            </div>
          </div>
        </div>
      )}

      {tab===1 && (
        <div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:16}}>
            <KPICard icon="💵" label="Total Payroll (May)" value="$842K" change="2.1% vs April" changeDir="up" color="kpi-green" />
            <KPICard icon="👥" label="Employees Paid" value={employees.length} color="kpi-blue" />
            <KPICard icon="📊" label="Avg Salary" value={'$'+Math.round(employees.reduce((a,e)=>a+e.salary,0)/employees.length/1000)+'K'} color="kpi-amber" />
          </div>
          <div className="card">
            <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16}}>Salary by Department</div>
            {['Engineering','Sales','Finance','HR','Marketing','Design','Operations','Data Science'].map((d,i)=>{
              const emps = employees.filter(e=>e.department===d)
              const total= emps.reduce((a,e)=>a+e.salary,0)
              const max  = 1200000
              return (
                <div key={d} style={{padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}>
                    <span style={{fontWeight:500}}>{d}</span>
                    <span style={{color:'var(--text2)'}}>{emps.length} employees · ${Math.round(total/1000)}K</span>
                  </div>
                  <ProgressBar value={Math.round(total/max*100)} color="blue" />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab===2 && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div className="card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
              <span style={{fontSize:13,fontWeight:500,color:'var(--text2)'}}>Leave Requests</span>
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <Badge variant="amber">{leaves?.filter(l=>l.status==='Pending').length || 0} Pending</Badge>
                <button onClick={()=>{
                  addLeave({
                    l_id: `LR-${Math.floor(Math.random()*10000)}`,
                    employee_id: employees[0]?.id || 'EMP0000',
                    start_date: new Date().toISOString().split('T')[0],
                    end_date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
                    reason: 'Sick Leave',
                    status: 'Pending'
                  })
                }} className="erp-btn-ghost" style={{padding:'4px 8px',fontSize:11}}>+ Request Leave (Test)</button>
              </div>
            </div>
            {leaves?.map((l)=>{
              const emp = employees.find(e => e.id === l.employee_id) || { name: 'Unknown', avatar: '?', color: '#ccc' }
              const sc = {Pending:'amber',Approved:'green',Rejected:'red'}
              return (
                <div key={l.l_id} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                  <Avatar initials={emp.avatar} color={emp.color} size={30} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500}}>{emp.name}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{l.reason} · {l.start_date} to {l.end_date}</div>
                  </div>
                  {l.status === 'Pending' ? (
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={()=>updateLeaveStatus(l.l_id, 'Approved')} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11,color:'var(--green)',borderColor:'rgba(34,197,94,.3)'}}>Approve</button>
                      <button onClick={()=>updateLeaveStatus(l.l_id, 'Rejected')} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'rgba(239,68,68,.3)'}}>Reject</button>
                    </div>
                  ) : (
                    <Badge variant={sc[l.status]||'gray'}>{l.status}</Badge>
                  )}
                </div>
              )
            })}
          </div>
          <div className="card">
            <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16}}>Leave Statistics · 2025</div>
            {[['Annual Leave','847 days used',78,'blue'],['Sick Leave','234 days',42,'red'],['WFH','1,204 instances',61,'green'],['Maternity/Paternity','3 active',100,'purple'],['Casual Leave','512 days',55,'amber']].map(([t,v,p,c])=>(
              <div key={t} style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}>
                  <span style={{color:'var(--text2)'}}>{t}</span><span style={{fontWeight:500}}>{v}</span>
                </div>
                <ProgressBar value={p} color={c} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab===3 && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {employees.slice(0,12).map(e=>(
            <div key={e.id} className="card card-sm">
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <Avatar initials={e.avatar} color={e.color} size={38} />
                <div>
                  <div style={{fontSize:13,fontWeight:500}}>{e.name}</div>
                  <div style={{fontSize:11,color:'var(--text3)'}}>{e.role}</div>
                </div>
                <button onClick={()=>setEditEmp(e)} style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',color:'var(--text3)',fontSize:14}}>✏</button>
              </div>
              <div style={{marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
                  <span style={{color:'var(--text2)'}}>Performance</span>
                  <span style={{fontWeight:600,color:e.score>=90?'var(--green)':e.score>=80?'var(--accent)':'var(--amber)'}}>{e.score}%</span>
                </div>
                <ProgressBar value={e.score} color={e.score>=90?'green':e.score>=80?'blue':'amber'} />
              </div>
              <div style={{display:'flex',gap:6}}>
                <div style={{flex:1,background:'var(--bg3)',borderRadius:6,padding:'6px 8px',textAlign:'center'}}>
                  <div style={{fontSize:10,color:'var(--text3)'}}>Attendance</div>
                  <div style={{fontSize:13,fontWeight:500}}>{e.attendance}%</div>
                </div>
                <div style={{flex:1,background:'var(--bg3)',borderRadius:6,padding:'6px 8px',textAlign:'center'}}>
                  <div style={{fontSize:10,color:'var(--text3)'}}>Leave</div>
                  <div style={{fontSize:13,fontWeight:500}}>{e.leaveBalance}d</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <EmployeeModal open={addOpen} onClose={()=>setAddOpen(false)} initial={null} />
      <EmployeeModal open={!!editEmp} onClose={()=>setEditEmp(null)} initial={editEmp} />
      <ConfirmModal
        open={!!delEmp}
        onClose={()=>setDelEmp(null)}
        onConfirm={()=>{ deleteEmployee(delEmp.id); setDelEmp(null) }}
        title="Delete Employee"
        message={`Are you sure you want to remove ${delEmp?.name} from the system? This action cannot be undone.`}
      />
    </div>
  )
}
