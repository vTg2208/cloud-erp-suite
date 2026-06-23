import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { EMPLOYEES, PROJECTS, INVENTORY } from '../../data/mockData'

const COMMANDS = [
  { type:'nav', icon:'⬡', label:'Dashboard',      desc:'Executive overview',      path:'/' },
  { type:'nav', icon:'👥', label:'HR Management',  desc:'Employees & payroll',     path:'/hr' },
  { type:'nav', icon:'💰', label:'Finance',         desc:'Revenue & expenses',      path:'/finance' },
  { type:'nav', icon:'📦', label:'Inventory',       desc:'Stock & products',        path:'/inventory' },
  { type:'nav', icon:'🗂',  label:'Projects',        desc:'Active projects',         path:'/projects' },
  { type:'nav', icon:'📊', label:'Analytics',       desc:'Business intelligence',   path:'/analytics' },
  { type:'nav', icon:'📋', label:'Reports',         desc:'Generate & export',       path:'/reports' },
  { type:'nav', icon:'✦',  label:'AI Assistant',    desc:'Enterprise AI workspace', path:'/ai' },
  { type:'nav', icon:'⚙',  label:'Settings',        desc:'Account & preferences',   path:'/settings' },
]

export function CommandPalette() {
  const { cmdOpen, setCmdOpen } = useApp()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(COMMANDS)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(true) }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setCmdOpen])

  useEffect(() => {
    if (cmdOpen) { setQuery(''); setResults(COMMANDS); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [cmdOpen])

  const handleQuery = val => {
    setQuery(val)
    if (!val.trim()) { setResults(COMMANDS); return }
    const q = val.toLowerCase()
    const navMatches = COMMANDS.filter(c => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
    const empMatches = EMPLOYEES.filter(e => e.name.toLowerCase().includes(q)).slice(0, 3).map(e => ({
      type:'employee', icon:null, avatar:e.avatar, color:e.color,
      label:e.name, desc:`${e.role} · ${e.department}`, path:'/hr',
    }))
    const projMatches = PROJECTS.filter(p => p.name.toLowerCase().includes(q)).slice(0, 2).map(p => ({
      type:'project', icon:'🗂', label:p.name, desc:`${p.department} · ${p.status}`, path:'/projects',
    }))
    setResults([...navMatches, ...empMatches, ...projMatches])
  }

  const go = item => { navigate(item.path); setCmdOpen(false) }

  if (!cmdOpen) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) setCmdOpen(false) }}
      style={{
        position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:200,
        display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:100,
      }}
    >
      <div style={{
        background:'var(--card)',border:'1px solid var(--border2)',borderRadius:16,
        width:560,maxHeight:440,overflow:'hidden',boxShadow:'0 25px 80px rgba(0,0,0,.5)',
        animation:'pageEnter .18s ease',
      }}>
        {/* Input */}
        <div style={{ display:'flex',alignItems:'center',gap:10,padding:'14px 18px',borderBottom:'1px solid var(--border)' }}>
          <span style={{ fontSize:16,color:'var(--text3)' }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => handleQuery(e.target.value)}
            placeholder="Search employees, projects, pages..."
            style={{ background:'none',border:'none',outline:'none',fontSize:15,color:'var(--text)',flex:1,fontFamily:'DM Sans,sans-serif' }}
          />
          <kbd style={{ background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:5,padding:'2px 8px',fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace' }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ overflowY:'auto',maxHeight:360 }}>
          {results.length === 0 ? (
            <div style={{ padding:'30px',textAlign:'center',color:'var(--text3)',fontSize:13 }}>No results found</div>
          ) : results.map((item, i) => (
            <div key={i} onClick={() => go(item)} style={{
              padding:'10px 18px',cursor:'pointer',display:'flex',alignItems:'center',gap:12,
              transition:'background .12s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {item.avatar
                ? <div style={{ width:28,height:28,borderRadius:6,background:item.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:'#fff',flexShrink:0 }}>{item.avatar}</div>
                : <span style={{ fontSize:16,width:22,textAlign:'center',color:'var(--text3)',flexShrink:0 }}>{item.icon}</span>
              }
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13,color:'var(--text)',fontWeight:item.type==='nav'?500:400 }}>{item.label}</div>
                <div style={{ fontSize:11,color:'var(--text3)' }}>{item.desc}</div>
              </div>
              <span style={{ fontSize:10,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.5px' }}>{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
