import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useData } from '../context/DataContext'
import { KPICard } from '../components/shared/KPICard'
import { Badge }   from '../components/shared/Badge'
import { Modal, FormRow, FormGrid, ModalFooter, ConfirmModal } from '../components/shared/Modal'

const STOCK_TREND = [
  {month:'Jan',electronics:420,furniture:180,hardware:90},
  {month:'Feb',electronics:390,furniture:170,hardware:88},
  {month:'Mar',electronics:410,furniture:160,hardware:75},
  {month:'Apr',electronics:380,furniture:155,hardware:70},
  {month:'May',electronics:350,furniture:145,hardware:65},
  {month:'Jun',electronics:340,furniture:140,hardware:58},
]
const CAT_DATA=[
  {cat:'Electronics',value:840000},{cat:'Furniture',value:480000},
  {cat:'Office',value:220000},{cat:'Hardware',value:180000},{cat:'Other',value:80000},
]
const STATUS_VARIANT={'In Stock':'green','Low Stock':'amber',Critical:'red','Out of Stock':'red'}
const CATEGORIES=['Electronics','Furniture','Office Supplies','Hardware','Networking','Software Licenses','Safety Equipment','Stationery']

const EMPTY_ITEM = { name:'', category:'Electronics', stock:'', price:'', supplier:'', reorder:'10' }

function ItemModal({ open, onClose, initial }) {
  const { addInventoryItem, updateInventoryItem } = useData()
  const [form, setForm] = useState(initial || EMPTY_ITEM)
  const isEdit = !!initial?.id
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const handleSave = () => {
    if (!form.name.trim()) return alert('Product name is required')
    if (form.stock === '' || form.price === '') return alert('Stock and price are required')
    if (isEdit) updateInventoryItem(initial.id, form)
    else addInventoryItem(form)
    onClose()
    if (!isEdit) setForm(EMPTY_ITEM)
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit?`Edit — ${initial?.name}`:'Add Inventory Item'} width={560}>
      <div style={{padding:'20px 22px'}}>
        <FormRow label="Product Name" required>
          <input className="erp-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Dell XPS 15 Laptop" />
        </FormRow>
        <FormGrid>
          <FormRow label="Category" required>
            <select className="erp-select" style={{width:'100%'}} value={form.category} onChange={e=>set('category',e.target.value)}>
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </FormRow>
          <FormRow label="Supplier">
            <input className="erp-input" value={form.supplier} onChange={e=>set('supplier',e.target.value)} placeholder="e.g. Tech Corp" />
          </FormRow>
          <FormRow label="Stock Quantity" required>
            <input className="erp-input" type="number" min="0" value={form.stock} onChange={e=>set('stock',e.target.value)} placeholder="0" />
          </FormRow>
          <FormRow label="Unit Price ($)" required>
            <input className="erp-input" type="number" min="0" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="0.00" />
          </FormRow>
          <FormRow label="Reorder Level" hint="Alert when stock falls below this">
            <input className="erp-input" type="number" min="0" value={form.reorder} onChange={e=>set('reorder',e.target.value)} />
          </FormRow>
          <FormRow label="Total Value">
            <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'9px 12px',fontSize:13,color:'var(--text2)'}}>
              ${((Number(form.stock)||0)*(Number(form.price)||0)).toLocaleString()}
            </div>
          </FormRow>
        </FormGrid>
      </div>
      <ModalFooter onClose={onClose} onSave={handleSave} saveLabel={isEdit?'Update Item':'Add Item'} />
    </Modal>
  )
}

export function InventoryPage() {
  const { inventory, deleteInventoryItem } = useData()
  const [search,  setSearch]  = useState('')
  const [catF,    setCatF]    = useState('All')
  const [statusF, setStatusF] = useState('All')
  const [addOpen, setAddOpen] = useState(false)
  const [editItem,setEditItem]= useState(null)
  const [delItem, setDelItem] = useState(null)

  const filtered = inventory.filter(i=>{
    const ms = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search)
    const mc = catF==='All' || i.category===catF
    const mst= statusF==='All' || i.status===statusF
    return ms && mc && mst
  })
  const totalVal = inventory.reduce((a,i)=>a+i.value,0)
  const lowStock = inventory.filter(i=>i.status==='Critical'||i.status==='Low Stock').length

  return (
    <div className="page-enter" style={{padding:24}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)'}}>Inventory Management</h1>
        <p style={{fontSize:13,color:'var(--text2)',marginTop:4}}>{inventory.length} SKUs · ${(totalVal/1000000).toFixed(1)}M Total Value · {lowStock} Low Stock Alerts</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
        <KPICard icon="📦" label="Total SKUs"        value={inventory.length} color="kpi-blue" />
        <KPICard icon="⚠"  label="Low Stock Alerts"  value={lowStock} changeDir="down" change="Needs attention" color="kpi-amber" />
        <KPICard icon="💰" label="Total Value"        value={`$${(totalVal/1000000).toFixed(1)}M`} color="kpi-green" />
        <KPICard icon="🔄" label="Turnover Rate"      value="6.2×" change="0.4× improvement" changeDir="up" color="kpi-purple" />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16}}>Stock Level Trends</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={STOCK_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
              <XAxis dataKey="month" tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8}} />
              <Line type="monotone" dataKey="electronics" stroke="#4f8ef7" strokeWidth={2} dot={false} name="Electronics" />
              <Line type="monotone" dataKey="furniture"   stroke="#f59e0b" strokeWidth={2} dot={false} name="Furniture" />
              <Line type="monotone" dataKey="hardware"    stroke="#ef4444" strokeWidth={2} dot={false} name="Hardware" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16}}>Value by Category</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CAT_DATA} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
              <XAxis type="number" tick={{fontSize:10,fill:'var(--text3)'}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="cat" width={80} tick={{fontSize:11,fill:'var(--text3)'}} axisLine={false} tickLine={false} />
              <Tooltip formatter={v=>`$${(v/1000).toFixed(0)}K`} contentStyle={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:8}} />
              <Bar dataKey="value" fill="#4f8ef7" fillOpacity={.8} radius={[0,4,4,0]} name="Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search SKU or name..." className="erp-input" style={{flex:1,maxWidth:280}} />
          <select value={catF} onChange={e=>setCatF(e.target.value)} className="erp-select">
            <option>All</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
          <select value={statusF} onChange={e=>setStatusF(e.target.value)} className="erp-select">
            <option>All</option><option>In Stock</option><option>Low Stock</option><option>Critical</option><option>Out of Stock</option>
          </select>
          <button onClick={()=>setAddOpen(true)} className="erp-btn">+ Add Item</button>
        </div>
        <table className="data-table">
          <thead><tr><th>SKU</th><th>Product Name</th><th>Category</th><th>Stock</th><th>Unit Price</th><th>Total Value</th><th>Supplier</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(i=>(
              <tr key={i.id}>
                <td style={{fontFamily:'DM Mono,monospace',fontSize:12,color:'var(--text3)'}}>{i.id}</td>
                <td style={{fontWeight:500}}>{i.name}</td>
                <td><Badge variant="gray">{i.category}</Badge></td>
                <td style={{fontWeight:600,color:i.stock<=5?'var(--red)':i.stock<=15?'var(--amber)':'var(--text)'}}>{i.stock}</td>
                <td style={{fontFamily:'DM Mono,monospace'}}>${i.price.toLocaleString()}</td>
                <td style={{fontFamily:'DM Mono,monospace',fontWeight:500}}>${i.value.toLocaleString()}</td>
                <td style={{fontSize:12,color:'var(--text2)'}}>{i.supplier}</td>
                <td><Badge variant={STATUS_VARIANT[i.status]||'gray'}>{i.status}</Badge></td>
                <td>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>setEditItem(i)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11}}>✏ Edit</button>
                    <button onClick={()=>setDelItem(i)} className="erp-btn-ghost" style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'rgba(239,68,68,.3)'}}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && (
          <div style={{padding:'40px',textAlign:'center',color:'var(--text3)',fontSize:13}}>
            <div style={{fontSize:32,marginBottom:10}}>📭</div>
            No items found. <button onClick={()=>setAddOpen(true)} style={{color:'var(--accent)',background:'none',border:'none',cursor:'pointer',fontSize:13}}>Add one now</button>
          </div>
        )}
      </div>

      <ItemModal open={addOpen} onClose={()=>setAddOpen(false)} initial={null} />
      <ItemModal open={!!editItem} onClose={()=>setEditItem(null)} initial={editItem} />
      <ConfirmModal
        open={!!delItem}
        onClose={()=>setDelItem(null)}
        onConfirm={()=>{ deleteInventoryItem(delItem.id); setDelItem(null) }}
        title="Remove Inventory Item"
        message={`Remove "${delItem?.name}" from inventory? Stock of ${delItem?.stock} units will be lost.`}
      />
    </div>
  )
}
