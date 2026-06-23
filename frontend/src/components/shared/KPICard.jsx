export function KPICard({ icon, label, value, change, changeDir = 'up', color = 'kpi-blue' }) {
  return (
    <div className="card card-sm">
      <div className={`kpi-icon ${color}`}>{icon}</div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.5px', fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.5px', color: 'var(--text)', lineHeight: 1.1 }}>
        {value}
      </div>
      {change && (
        <div style={{ fontSize: 12, marginTop: 6, color: changeDir === 'up' ? 'var(--green)' : changeDir === 'down' ? 'var(--red)' : 'var(--text3)' }}>
          {changeDir === 'up' ? '↑' : changeDir === 'down' ? '↓' : ''} {change}
        </div>
      )}
    </div>
  )
}
