import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { to: '/',          icon: '⬡', label: 'Dashboard' },
      { to: '/hr',        icon: '👥', label: 'HR Management' },
      { to: '/finance',   icon: '💰', label: 'Finance' },
      { to: '/inventory', icon: '📦', label: 'Inventory' },
      { to: '/projects',  icon: '🗂',  label: 'Projects' },
    ]
  },
  {
    label: 'Intelligence',
    items: [
      { to: '/analytics', icon: '📊', label: 'Analytics' },
      { to: '/reports',   icon: '📋', label: 'Reports' },
      { to: '/ai',        icon: '✦',  label: 'AI Assistant', badge: 'NEW', badgeColor: 'var(--purple)' },
    ]
  },
  {
    label: 'System',
    items: [
      { to: '/settings',  icon: '⚙',  label: 'Settings' },
    ]
  }
]

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, role, setRole } = useApp()
  const location = useLocation()

  return (
    <aside style={{
      width: sidebarCollapsed ? 56 : 240,
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, overflow: 'hidden',
      transition: 'width .22s cubic-bezier(.4,0,.2,1)',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#4f8ef7,#a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>A</div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-.3px', color: 'var(--text)', lineHeight: 1.2 }}>
                Amdox<span style={{ color: 'var(--accent)' }}>ERP</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '.5px', textTransform: 'uppercase' }}>
                Enterprise Platform
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px', scrollbarWidth: 'none' }}>
        {NAV_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 8 }}>
            {!sidebarCollapsed && (
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '.8px', textTransform: 'uppercase', padding: '8px 10px 4px', fontWeight: 500 }}>
                {group.label}
              </div>
            )}
            {group.items.map(item => {
              const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
              return (
                <NavLink key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: sidebarCollapsed ? '9px 0' : '9px 10px',
                    borderRadius: 8, marginBottom: 2,
                    color: isActive ? 'var(--accent)' : 'var(--text2)',
                    background: isActive ? 'var(--accent-bg)' : 'transparent',
                    fontWeight: isActive ? 500 : 400, fontSize: 13,
                    transition: 'all .15s', cursor: 'pointer',
                    position: 'relative',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = isActive ? 'var(--accent-bg)' : 'transparent'; e.currentTarget.style.color = isActive ? 'var(--accent)' : 'var(--text2)' }}
                  >
                    {isActive && <span style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', width:3, height:20, background:'var(--accent)', borderRadius:'0 3px 3px 0' }} />}
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    {!sidebarCollapsed && (
                      <>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.badge && (
                          <span style={{ background: item.badgeColor || 'var(--accent)', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 10, fontWeight: 600, letterSpacing: '.3px' }}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Role switcher */}
      {!sidebarCollapsed && (
        <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)' }}>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="erp-select"
            style={{ width: '100%', fontSize: 11, padding: '5px 8px', marginBottom: 8 }}
          >
            <option value="admin">Admin View</option>
            <option value="manager">Manager View</option>
            <option value="employee">Employee View</option>
          </select>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', background:'var(--bg3)', borderRadius:8, cursor:'pointer' }}>
            <div style={{ width:28,height:28,borderRadius:6,background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:'#fff',flexShrink:0 }}>AK</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12,fontWeight:500,color:'var(--text)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>Arjun Kumar</div>
              <div style={{ fontSize:10,color:'var(--text3)',textTransform:'capitalize' }}>{role}</div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarCollapsed(c => !c)}
        style={{ margin:'8px',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'6px',cursor:'pointer',color:'var(--text2)',fontSize:14,flexShrink:0 }}
      >
        {sidebarCollapsed ? '→' : '←'}
      </button>
    </aside>
  )
}
