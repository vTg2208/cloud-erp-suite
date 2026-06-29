import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useData }     from '../context/DataContext'
import { KPICard }     from '../components/shared/KPICard'
import { Badge }       from '../components/shared/Badge'
import { ProgressBar } from '../components/shared/ProgressBar'
import { Modal, FormRow, FormGrid, ModalFooter, ConfirmModal } from '../components/shared/Modal'
import { MONTHLY_REVENUE } from '../data/mockData'

const EXPENSE_CATS = [
  { name:'Personnel',  value:42, color:'#4f8ef7' },
  { name:'Operations', value:23, color:'#22c55e' },
  { name:'Marketing',  value:18, color:'#f59e0b' },
  { name:'R&D',        value:17, color:'#a78bfa' },
]
const CHART_DATA = MONTHLY_REVENUE.map(m => ({
  ...m, revenue:m.revenue/1000000, expenses:m.expenses/1000000, profit:m.profit/1000000,
}))

const CATEGORIES = ['Revenue','Operations','Technology','Personnel','Marketing','Legal','Travel','Training','Infrastructure','Miscellaneous']

const EMPTY_TX = { desc:'', category:'Revenue', date:'', amount:'', type:'credit', status:'Completed', notes:'' }

function TransactionModal({ open, onClose, initial }) {
  const { showToast } = useData()
  const [form, setForm] = useState(initial || EMPTY_TX)
  const isEdit = !!initial?.id
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  // We manage transactions via DataContext now
  const handleSave = async () => {
    if (!form.desc.trim()) return alert('Description is required')
    if (!form.amount) return alert('Amount is required')
    if (!isEdit) {
      await addTransaction(form)
    } else {
      showToast('Transaction updated (Local Only)')
    }
    onClose()
    if (!isEdit) setForm(EMPTY_TX)
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Transaction' : 'Record Transaction'} width={540}>
      <div style={{padding:'20px 22px'}}>
        <FormRow label="Description" required>
          <input className="erp-input" value={form.desc} onChange={e=>set('desc',e.target.value)} placeholder="e.g. Client Payment — Infosys Ltd" />
        </FormRow>
        <FormGrid>
          <FormRow label="Type" required>
            <select className="erp-select" style={{width:'100%'}} value={form.type} onChange={e=>set('type',e.target.value)}>
              <option value="credit">Credit (Income)</option>
              <option value="debit">Debit (Expense)</option>
            </select>
          </FormRow>
          <FormRow label="Category" required>
            <select className="erp-select" style={{width:'100%'}} value={form.category} onChange={e=>set('category',e.target.value)}>
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </FormRow>
          <FormRow label="Amount ($)" required>
            <input className="erp-input" type="number" min="0" value={form.amount} onChange={e=>set('amount',e.target.value)} placeholder="10000" />
          </FormRow>
          <FormRow label="Date" required>
            <input className="erp-input" type="date" value={form.date} onChange={e=>set('date',e.target.value)} />
          </FormRow>
          <FormRow label="Status">
            <select className="erp-select" style={{width:'100%'}} value={form.status} onChange={e=>set('status',e.target.value)}>
              <option>Completed</option><option>Pending</option><option>Failed</option>
            </select>
          </FormRow>
        </FormGrid>
        <FormRow label="Notes">
          <textarea className="erp-input" rows={2} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Optional notes..." style={{resize:'vertical'}} />
        </FormRow>
      </div>
      <ModalFooter onClose={onClose} onSave={handleSave} saveLabel={isEdit ? 'Update' : 'Record Transaction'} />
    </Modal>
  )
}

export function FinancePage() {
  const { transactions: allTx, addTransaction, deleteTransaction, showToast, invoices, createInvoice, updateInvoiceStatus } = useData()

  const [filter,   setFilter]  = useState('All')
  const [txPage,   setTxPage]  = useState(1)
  const [addOpen,  setAddOpen] = useState(false)
  const [editTx,   setEditTx]  = useState(null)
  const [delTx,    setDelTx]   = useState(null)
  const PER = 8

  const txFiltered = filter==='All' ? allTx : allTx.filter(t=>t.type===filter.toLowerCase())
  const txPaged    = txFiltered.slice((txPage-1)*PER, txPage*PER)
  const totalPages = Math.ceil(txFiltered.length/PER) || 1

  const totalRevenue = allTx.filter(t=>t.type==='credit').reduce((a,t)=>a+Number(t.amount),0)
  const totalExpenses= allTx.filter(t=>t.type==='debit').reduce((a,t)=>a+Number(t.amount),0)

  const handleAddTx = async (form) => {
    await addTransaction(form)
  }

  const handleDeleteTx = async (id) => {
    await deleteTransaction(id)
  }

  return (
    <div className="page-enter" style={{padding:24}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)'}}>Finance Dashboard</h1>
        <p style={{fontSize:13,color:'var(--text2)',marginTop:4}}>Fiscal Year 2025 · Q2 in Progress · Budget Utilization: 67%</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
        <KPICard icon="📈" label="Total Revenue"    value={`$${(totalRevenue/1000000).toFixed(1)}M`} change="21.3% YoY" changeDir="up"  color="kpi-green" />
        <KPICard icon="📉" label="Total Expenses"   value={`$${(totalExpenses/1000000).toFixed(1)}M`} change="8.2% vs budget" changeDir="down" color="kpi-red" />
        <KPICard icon="💎" label="Net Profit"       value={`$${((totalRevenue-totalExpenses)/1000000).toFixed(1)}M`} change="34.1% YoY" changeDir="up" color="kpi-blue" />
        <KPICard icon="💰" label="Transactions"     value={allTx.length} change={`${allTx.filter(t=>t.status==='Pending').length} pending`} color="kpi-purple" />
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
            <span style={{fontSize:13,fontWeight:500,color:'var(--text2)'}}>Revenue vs Expenses · 2025</span>
            <div style={{display:'flex',gap:10}}>
              {[['Revenue','#22c55e'],['Expenses','#ef4444'],['Profit','#4f8ef7']].map(([l,c])=>(
                <div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text2)'}}>
                  <span style={{width:10,height:10,borderRadius:2,background:c,display:'inline-block'}}></span>{l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={CHART_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
              <XAxis dataKey="month" tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}M`} />
              <Tooltip formatter={v=>`$${v.toFixed(2)}M`} contentStyle={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8}} />
              <Bar dataKey="revenue"  fill="#22c55e" fillOpacity={.8} radius={[4,4,0,0]} name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" fillOpacity={.8} radius={[4,4,0,0]} name="Expenses" />
              <Bar dataKey="profit"   fill="#4f8ef7" fillOpacity={.8} radius={[4,4,0,0]} name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14}}>Expense Breakdown</div>
          <div style={{display:'flex',justifyContent:'center'}}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={EXPENSE_CATS} dataKey="value" innerRadius={48} outerRadius={72} strokeWidth={0}>
                  {EXPENSE_CATS.map((c,i)=><Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip formatter={v=>`${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{marginTop:14}}>
            {EXPENSE_CATS.map(c=>(
              <div key={c.name} style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5}}>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{width:8,height:8,borderRadius:2,background:c.color,display:'inline-block'}}></span>
                    <span style={{color:'var(--text2)'}}>{c.name}</span>
                  </div>
                  <span style={{fontWeight:500}}>{c.value}%</span>
                </div>
                <ProgressBar value={c.value} color={['blue','green','amber','purple'][EXPENSE_CATS.indexOf(c)]} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
          <span style={{fontSize:13,fontWeight:500,color:'var(--text2)'}}>Transactions ({allTx.length})</span>
          <div style={{display:'flex',gap:8}}>
            <select value={filter} onChange={e=>{setFilter(e.target.value);setTxPage(1)}} className="erp-select" style={{fontSize:12}}>
              <option>All</option><option>Credit</option><option>Debit</option>
            </select>
            <button className="erp-btn-ghost" style={{fontSize:12}}>⬇ Export CSV</button>
            <button onClick={()=>setAddOpen(true)} className="erp-btn" style={{fontSize:12}}>+ Record Transaction</button>
          </div>
        </div>
        <table className="data-table">
          <thead><tr><th>ID</th><th>Description</th><th>Category</th><th>Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {txPaged.map(t=>(
              <tr key={t.id}>
                <td style={{fontFamily:'DM Mono,monospace',fontSize:12,color:'var(--text3)'}}>{t.id}</td>
                <td style={{fontWeight:500}}>{t.desc}</td>
                <td><Badge variant="gray">{t.category}</Badge></td>
                <td style={{color:'var(--text2)',fontSize:12}}>{t.date}</td>
                <td style={{fontFamily:'DM Mono,monospace',fontWeight:600,color:t.type==='credit'?'var(--green)':'var(--red)'}}>
                  {t.type==='credit'?'+':'-'}${t.amount.toLocaleString()}
                </td>
                <td><Badge variant={t.status==='Completed'?'green':t.status==='Pending'?'amber':'red'}>{t.status}</Badge></td>
                <td>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>setEditTx(t)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11}}>✏</button>
                    <button onClick={()=>setDelTx(t)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'rgba(239,68,68,.3)'}}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:12,fontSize:12,color:'var(--text3)'}}>
          <span>Showing {((txPage-1)*PER)+1}–{Math.min(txPage*PER,txFiltered.length)} of {txFiltered.length}</span>
          <div style={{display:'flex',gap:4}}>
            <button className="erp-btn-ghost" style={{fontSize:12}} onClick={()=>setTxPage(p=>Math.max(1,p-1))} disabled={txPage===1}>← Prev</button>
            <button className="erp-btn-ghost" style={{fontSize:12}} onClick={()=>setTxPage(p=>Math.min(totalPages,p+1))} disabled={txPage===totalPages}>Next →</button>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop: 16}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
          <span style={{fontSize:13,fontWeight:500,color:'var(--text2)'}}>Accounts Receivable (Invoices)</span>
          <button onClick={()=>{
            createInvoice({
              inv_id: `INV-${Math.floor(Math.random()*10000)}`,
              client_name: ['Acme Corp', 'Globex Inc', 'Stark Industries'][Math.floor(Math.random()*3)],
              amount: Math.floor(Math.random()*10000) + 1000,
              due_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
              status: 'Unpaid'
            })
          }} className="erp-btn" style={{fontSize:12}}>+ Generate Invoice</button>
        </div>
        <table className="data-table">
          <thead><tr><th>ID</th><th>Client Name</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {invoices?.map(inv=>(
              <tr key={inv.inv_id}>
                <td style={{fontFamily:'DM Mono,monospace',fontSize:12,color:'var(--text3)'}}>{inv.inv_id}</td>
                <td style={{fontWeight:500}}>{inv.client_name}</td>
                <td style={{fontFamily:'DM Mono,monospace',fontWeight:600}}>${inv.amount.toLocaleString()}</td>
                <td style={{color:'var(--text2)',fontSize:12}}>{inv.due_date}</td>
                <td><Badge variant={inv.status==='Paid'?'green':inv.status==='Unpaid'?'amber':'gray'}>{inv.status}</Badge></td>
                <td>
                  {inv.status !== 'Paid' && (
                    <button onClick={()=>updateInvoiceStatus(inv.inv_id, 'Paid')} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11}}>Mark Paid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TransactionModal open={addOpen} onClose={()=>setAddOpen(false)} initial={null} />
      <TransactionModal open={!!editTx} onClose={()=>setEditTx(null)} initial={editTx} />
      <ConfirmModal
        open={!!delTx}
        onClose={()=>setDelTx(null)}
        onConfirm={()=>{ handleDeleteTx(delTx.id); setDelTx(null) }}
        title="Delete Transaction"
        message={`Remove transaction "${delTx?.desc}"? This cannot be undone.`}
      />
    </div>
  )
}
