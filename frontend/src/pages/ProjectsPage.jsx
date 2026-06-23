import { useState } from 'react'
import { useData }     from '../context/DataContext'
import { DEPARTMENTS } from '../data/mockData'
import { KPICard }     from '../components/shared/KPICard'
import { Badge }       from '../components/shared/Badge'
import { ProgressBar } from '../components/shared/ProgressBar'
import { Avatar }      from '../components/shared/Avatar'
import { Modal, FormRow, FormGrid, ModalFooter, ConfirmModal } from '../components/shared/Modal'

const TABS = ['Project List','Task Board','Timeline']
const STATUS_VARIANT = {Active:'blue',Completed:'green','On Hold':'amber',Cancelled:'red'}
const PRIORITY_VARIANT = {High:'red',Medium:'amber',Low:'green',urgent:'red'}
const KANBAN_COLS = [
  {key:'todo',        label:'To Do',      color:'var(--text3)'},
  {key:'in-progress', label:'In Progress',color:'var(--accent)'},
  {key:'review',      label:'Review',     color:'var(--amber)'},
  {key:'done',        label:'Done',       color:'var(--green)'},
]

const EMPTY_PROJ = {name:'',department:'Engineering',budget:'',status:'Active',priority:'Medium',due:'',team:'3',description:''}
const EMPTY_TASK = {title:'',project:'',status:'todo',priority:'medium',due:'',assignee:'',estimate:''}

function ProjectModal({ open, onClose, initial }) {
  const { addProject, updateProject } = useData()
  const [form, setForm] = useState(initial || EMPTY_PROJ)
  const isEdit = !!initial?.id
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const handleSave = () => {
    if (!form.name.trim()) return alert('Project name is required')
    if (isEdit) updateProject(initial.id, form)
    else addProject(form)
    onClose()
    if (!isEdit) setForm(EMPTY_PROJ)
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit?`Edit — ${initial?.name}`:'Create New Project'} width={600}>
      <div style={{padding:'20px 22px'}}>
        <FormRow label="Project Name" required>
          <input className="erp-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Project Atlas" />
        </FormRow>
        <FormRow label="Description">
          <textarea className="erp-input" rows={2} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Brief project overview..." style={{resize:'vertical'}} />
        </FormRow>
        <FormGrid>
          <FormRow label="Department" required>
            <select className="erp-select" style={{width:'100%'}} value={form.department} onChange={e=>set('department',e.target.value)}>
              {DEPARTMENTS.map(d=><option key={d.id}>{d.name}</option>)}
            </select>
          </FormRow>
          <FormRow label="Budget ($)">
            <input className="erp-input" type="number" value={form.budget} onChange={e=>set('budget',e.target.value)} placeholder="500000" />
          </FormRow>
          <FormRow label="Status">
            <select className="erp-select" style={{width:'100%'}} value={form.status} onChange={e=>set('status',e.target.value)}>
              {['Active','On Hold','Completed','Cancelled'].map(s=><option key={s}>{s}</option>)}
            </select>
          </FormRow>
          <FormRow label="Priority">
            <select className="erp-select" style={{width:'100%'}} value={form.priority} onChange={e=>set('priority',e.target.value)}>
              {['Low','Medium','High'].map(p=><option key={p}>{p}</option>)}
            </select>
          </FormRow>
          <FormRow label="Due Date">
            <input className="erp-input" type="month" value={form.due} onChange={e=>set('due',e.target.value)} />
          </FormRow>
          <FormRow label="Team Size">
            <input className="erp-input" type="number" min="1" value={form.team} onChange={e=>set('team',e.target.value)} />
          </FormRow>
        </FormGrid>
      </div>
      <ModalFooter onClose={onClose} onSave={handleSave} saveLabel={isEdit?'Update Project':'Create Project'} />
    </Modal>
  )
}

function TaskModal({ open, onClose, initial, projects }) {
  const { addTask, updateTask } = useData()
  const [form, setForm] = useState(initial || EMPTY_TASK)
  const isEdit = !!initial?.id
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const handleSave = () => {
    if (!form.title.trim()) return alert('Task title is required')
    if (isEdit) updateTask(initial.id, form)
    else addTask(form)
    onClose()
    if (!isEdit) setForm(EMPTY_TASK)
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit?'Edit Task':'Add New Task'} width={480}>
      <div style={{padding:'20px 22px'}}>
        <FormRow label="Task Title" required>
          <input className="erp-input" value={form.title} onChange={e=>set('title',e.target.value)} placeholder="e.g. Fix authentication bug" />
        </FormRow>
        <FormGrid>
          <FormRow label="Project">
            <select className="erp-select" style={{width:'100%'}} value={form.project} onChange={e=>set('project',e.target.value)}>
              <option value="">Select project</option>
              {projects.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </FormRow>
          <FormRow label="Status">
            <select className="erp-select" style={{width:'100%'}} value={form.status} onChange={e=>set('status',e.target.value)}>
              {['todo','in-progress','review','done'].map(s=><option key={s} value={s}>{s.replace('-',' ')}</option>)}
            </select>
          </FormRow>
          <FormRow label="Priority">
            <select className="erp-select" style={{width:'100%'}} value={form.priority} onChange={e=>set('priority',e.target.value)}>
              {['low','medium','high','urgent'].map(p=><option key={p}>{p}</option>)}
            </select>
          </FormRow>
          <FormRow label="Due Date">
            <input className="erp-input" type="date" value={form.due} onChange={e=>set('due',e.target.value)} />
          </FormRow>
          <FormRow label="Assignee">
            <input className="erp-input" value={form.assignee} onChange={e=>set('assignee',e.target.value)} placeholder="Name" />
          </FormRow>
          <FormRow label="Estimate">
            <input className="erp-input" value={form.estimate} onChange={e=>set('estimate',e.target.value)} placeholder="e.g. 4h" />
          </FormRow>
        </FormGrid>
      </div>
      <ModalFooter onClose={onClose} onSave={handleSave} saveLabel={isEdit?'Update Task':'Add Task'} />
    </Modal>
  )
}

export function ProjectsPage() {
  const { projects, deleteProject, tasks, deleteTask, moveTask } = useData()
  const [tab,      setTab]     = useState(0)
  const [search,   setSearch]  = useState('')
  const [addPOpen, setAddPOpen]= useState(false)
  const [editProj, setEditProj]= useState(null)
  const [delProj,  setDelProj] = useState(null)
  const [addTOpen, setAddTOpen]= useState(false)
  const [editTask, setEditTask]= useState(null)
  const [delTask,  setDelTask] = useState(null)

  const filtered = projects.filter(p=>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.department.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-enter" style={{padding:24}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)'}}>Project Management</h1>
        <p style={{fontSize:13,color:'var(--text2)',marginTop:4}}>{projects.filter(p=>p.status==='Active').length} active · {projects.filter(p=>p.status==='Completed').length} completed</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
        <KPICard icon="🟢" label="Active Projects"  value={projects.filter(p=>p.status==='Active').length} color="kpi-blue" />
        <KPICard icon="✅" label="Completed"         value={projects.filter(p=>p.status==='Completed').length} color="kpi-green" />
        <KPICard icon="💰" label="Total Budget"      value={`$${(projects.reduce((a,p)=>a+p.budget,0)/1000000).toFixed(1)}M`} color="kpi-amber" />
        <KPICard icon="📋" label="Open Tasks"        value={tasks.filter(t=>t.status!=='done').length} color="kpi-purple" />
      </div>
      <div style={{display:'flex',gap:2,background:'var(--bg3)',borderRadius:10,padding:4,marginBottom:20,width:'fit-content'}}>
        {TABS.map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{padding:'8px 18px',borderRadius:8,fontSize:13,cursor:'pointer',border:'none',fontFamily:'inherit',background:tab===i?'var(--card)':'transparent',color:tab===i?'var(--text)':'var(--text2)',fontWeight:tab===i?500:400,transition:'all .15s'}}>{t}</button>
        ))}
      </div>

      {tab===0 && (
        <div className="card">
          <div style={{display:'flex',gap:10,marginBottom:16,alignItems:'center'}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search projects..." className="erp-input" style={{flex:1,maxWidth:300}} />
            <select className="erp-select"><option>All Status</option><option>Active</option><option>Completed</option><option>On Hold</option></select>
            <button onClick={()=>setAddPOpen(true)} className="erp-btn" style={{marginLeft:'auto'}}>+ New Project</button>
          </div>
          <table className="data-table">
            <thead><tr><th>Project</th><th>Department</th><th>Budget</th><th>Progress</th><th>Priority</th><th>Health</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(p=>(
                <tr key={p.id}>
                  <td><div style={{fontWeight:500}}>{p.name}</div><div style={{fontSize:11,color:'var(--text3)'}}>{p.id} · {p.team} members</div></td>
                  <td><div style={{display:'flex',alignItems:'center',gap:6}}><span style={{width:8,height:8,borderRadius:'50%',background:p.deptColor,display:'inline-block'}}></span><span style={{fontSize:12,color:'var(--text2)'}}>{p.department}</span></div></td>
                  <td style={{fontFamily:'DM Mono,monospace'}}>{p.budgetFmt}</td>
                  <td style={{width:140}}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={{flex:1}}><ProgressBar value={p.budgetUsed} color={p.budgetUsed>90?'red':p.budgetUsed>70?'amber':'blue'} /></div><span style={{fontSize:12,color:'var(--text2)',width:30,textAlign:'right'}}>{p.budgetUsed}%</span></div></td>
                  <td><Badge variant={PRIORITY_VARIANT[p.priority]||'gray'}>{p.priority}</Badge></td>
                  <td><Badge variant={p.health==='On Track'?'green':p.health==='Ahead'?'teal':p.health==='At Risk'?'amber':'red'}>{p.health}</Badge></td>
                  <td style={{fontSize:12,color:'var(--text2)'}}>{p.due}</td>
                  <td><Badge variant={STATUS_VARIANT[p.status]||'gray'}>{p.status}</Badge></td>
                  <td><div style={{display:'flex',gap:6}}>
                    <button onClick={()=>setEditProj(p)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11}}>✏</button>
                    <button onClick={()=>setDelProj(p)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'rgba(239,68,68,.3)'}}>🗑</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab===1 && (
        <div>
          <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
            <button onClick={()=>setAddTOpen(true)} className="erp-btn">+ Add Task</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
            {KANBAN_COLS.map(col=>{
              const colTasks = tasks.filter(t=>t.status===col.key).slice(0,8)
              return (
                <div key={col.key} style={{background:'var(--bg3)',borderRadius:12,padding:14}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                    <span style={{fontSize:12,fontWeight:600,color:col.color,textTransform:'uppercase',letterSpacing:'.5px'}}>{col.label}</span>
                    <span style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:20,padding:'1px 8px',fontSize:11,color:'var(--text2)'}}>{colTasks.length}</span>
                  </div>
                  {colTasks.map(t=>(
                    <div key={t.id} className="kanban-card" style={{marginBottom:8}}>
                      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8,marginBottom:6}}>
                        <span style={{fontSize:13,fontWeight:500,lineHeight:1.3,flex:1}}>{t.title}</span>
                        <div style={{display:'flex',gap:4,flexShrink:0}}>
                          <button onClick={()=>setEditTask(t)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--text3)',fontSize:12,padding:2}}>✏</button>
                          <button onClick={()=>setDelTask(t)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--red)',fontSize:12,padding:2}}>✕</button>
                        </div>
                      </div>
                      <Badge variant={PRIORITY_VARIANT[t.priority]||'gray'} size="xs">{t.priority}</Badge>
                      {t.project && <div style={{fontSize:11,color:'var(--text3)',marginTop:6,marginBottom:4}}>{t.project}</div>}
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8}}>
                        <span style={{fontSize:11,color:'var(--text3)'}}>{t.due||'No due date'}</span>
                        {t.avatar && <Avatar initials={t.avatar} color={t.color||'#4f8ef7'} size={20} radius={5} />}
                      </div>
                      {col.key!=='done' && (
                        <div style={{display:'flex',gap:4,marginTop:8}}>
                          {col.key!=='in-progress' && <button onClick={()=>moveTask(t.id,'in-progress')} style={{flex:1,background:'var(--accent-bg)',border:'1px solid rgba(79,142,247,.2)',color:'var(--accent)',borderRadius:5,padding:'3px',fontSize:10,cursor:'pointer'}}>→ In Progress</button>}
                          {col.key==='in-progress' && <button onClick={()=>moveTask(t.id,'review')} style={{flex:1,background:'rgba(245,158,11,.1)',border:'1px solid rgba(245,158,11,.2)',color:'var(--amber)',borderRadius:5,padding:'3px',fontSize:10,cursor:'pointer'}}>→ Review</button>}
                          {col.key==='review' && <button onClick={()=>moveTask(t.id,'done')} style={{flex:1,background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.2)',color:'var(--green)',borderRadius:5,padding:'3px',fontSize:10,cursor:'pointer'}}>→ Done</button>}
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={()=>setAddTOpen(true)} style={{width:'100%',background:'transparent',border:'1px dashed var(--border2)',borderRadius:8,padding:'8px',fontSize:12,color:'var(--text3)',cursor:'pointer',marginTop:4}}>+ Add Task</button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab===2 && (
        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:20}}>Project Timeline · Q2–Q4 2025</div>
          <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:16,marginBottom:8}}>
            <div></div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',fontSize:11,color:'var(--text3)',textAlign:'center'}}>
              {['Jul','Aug','Sep','Oct','Nov','Dec'].map(m=><div key={m}>{m}</div>)}
            </div>
          </div>
          {projects.slice(0,14).map((p,i)=>{
            const starts=[0,.08,.16,.25,.33,.42,.5,.58,.66,.75,.83,.91,.04,.2][i]
            const lens=[.45,.38,.3,.6,.25,.5,.35,.4,.28,.55,.2,.35,.48,.32][i]
            return (
              <div key={p.id} style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:16,marginBottom:8,alignItems:'center'}}>
                <div>
                  <div style={{fontSize:13,fontWeight:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                  <div style={{fontSize:11,color:'var(--text3)'}}>{p.department}</div>
                </div>
                <div style={{position:'relative',height:28,background:'var(--bg3)',borderRadius:6}}>
                  <div style={{position:'absolute',left:`${starts*100}%`,width:`${lens*100}%`,height:'100%',background:`${p.deptColor}30`,border:`1px solid ${p.deptColor}60`,borderRadius:6,display:'flex',alignItems:'center',padding:'0 8px',overflow:'hidden'}}>
                    <span style={{fontSize:10,color:p.deptColor,whiteSpace:'nowrap',fontWeight:500}}>{p.status}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ProjectModal open={addPOpen} onClose={()=>setAddPOpen(false)} initial={null} />
      <ProjectModal open={!!editProj} onClose={()=>setEditProj(null)} initial={editProj} />
      <ConfirmModal open={!!delProj} onClose={()=>setDelProj(null)} onConfirm={()=>{deleteProject(delProj.id);setDelProj(null)}} title="Delete Project" message={`Delete "${delProj?.name}"? This cannot be undone.`} />
      <TaskModal open={addTOpen} onClose={()=>setAddTOpen(false)} initial={null} projects={projects} />
      <TaskModal open={!!editTask} onClose={()=>setEditTask(null)} initial={editTask} projects={projects} />
      <ConfirmModal open={!!delTask} onClose={()=>setDelTask(null)} onConfirm={()=>{deleteTask(delTask.id);setDelTask(null)}} title="Delete Task" message={`Delete task "${delTask?.title}"?`} />
    </div>
  )
}
