import { useApp } from '../../context/AppContext'

const TYPE_COLORS = { warning: 'var(--amber)', success: 'var(--green)', info: 'var(--accent)' }
const TYPE_ICONS  = { warning: '⚠️', success: '✅', info: 'ℹ️' }

export function NotificationPanel() {
  const { notifications, notifOpen, setNotifOpen, markAllRead, unreadCount } = useApp()

  if (!notifOpen) return null

  return (
    <>
      <div onClick={() => setNotifOpen(false)} style={{ position:'fixed',inset:0,zIndex:90 }} />
      <div style={{
        position: 'fixed', top: 68, right: 16,
        width: 340, background: 'var(--card)', border: '1px solid var(--border2)',
        borderRadius: 14, zIndex: 100,
        boxShadow: '0 20px 60px rgba(0,0,0,.4)',
        overflow: 'hidden', animation: 'pageEnter .2s ease',
      }}>
        {/* Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Notifications</span>
            {unreadCount > 0 && (
              <span style={{ background: 'var(--red)', color: '#fff', fontSize: 10, padding: '1px 7px', borderRadius: 10, fontWeight: 600 }}>{unreadCount}</span>
            )}
          </div>
          <button onClick={markAllRead} style={{ fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Mark all read
          </button>
        </div>

        {/* Items */}
        {notifications.map(n => (
          <div key={n.id} style={{
            padding: '12px 16px', borderBottom: '1px solid var(--border)',
            cursor: 'pointer', transition: 'background .15s',
            borderLeft: n.unread ? `3px solid ${TYPE_COLORS[n.type]}` : '3px solid transparent',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ fontSize:16, flexShrink:0 }}>{TYPE_ICONS[n.type]}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight: n.unread ? 500 : 400, color:'var(--text)', marginBottom:3 }}>{n.title}</div>
                <div style={{ fontSize:12, color:'var(--text2)' }}>{n.desc}</div>
                <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>{n.time}</div>
              </div>
              {n.unread && <span style={{ width:7,height:7,borderRadius:'50%',background:'var(--accent)',flexShrink:0,marginTop:4 }} />}
            </div>
          </div>
        ))}

        <div style={{ padding: '10px 16px', textAlign:'center' }}>
          <button onClick={() => setNotifOpen(false)} style={{ fontSize:12,color:'var(--accent)',background:'none',border:'none',cursor:'pointer' }}>
            View all notifications →
          </button>
        </div>
      </div>
    </>
  )
}
