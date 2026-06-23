import { useApp } from '../../context/AppContext'

export function Topbar({ title, subtitle }) {
  const { toggleTheme, theme, unreadCount, setCmdOpen, setNotifOpen, notifOpen } = useApp()

  return (
    <div style={{
      height: 60, background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0,
    }}>
      {/* Page title area */}
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: '-.2px' }}>{title}</div>}
      </div>

      {/* Search */}
      <div
        onClick={() => setCmdOpen(true)}
        style={{
          background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px',
          height: 36, cursor: 'pointer', transition: 'border-color .15s', minWidth: 240,
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <span style={{ fontSize: 13, color: 'var(--text3)' }}>🔍</span>
        <span style={{ fontSize: 13, color: 'var(--text3)', flex: 1 }}>Search...</span>
        <kbd style={{ background: 'var(--bg)', border: '1px solid var(--border2)', borderRadius: 4, padding: '1px 6px', fontSize: 10, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>⌘K</kbd>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} className="erp-btn-ghost" style={{ padding: '7px 10px', fontSize: 14 }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotifOpen(o => !o)}
          style={{
            width: 36, height: 36, background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text2)', fontSize: 16, position: 'relative',
          }}
        >
          🔔
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 6, right: 6, width: 8, height: 8,
              background: 'var(--red)', borderRadius: '50%', border: '2px solid var(--bg2)',
            }} />
          )}
        </button>

        {/* Quick add */}
        <button className="erp-btn" style={{ padding: '7px 14px', fontSize: 13 }}>
          + New
        </button>

        {/* Avatar */}
        <div style={{ width:34,height:34,borderRadius:8,background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,cursor:'pointer',color:'#fff' }}>
          AK
        </div>
      </div>
    </div>
  )
}
