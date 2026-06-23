export function ProgressBar({ value, max = 100, color = 'blue', height = 6, showLabel = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const cls = { blue: 'pb-blue', green: 'pb-green', amber: 'pb-amber', purple: 'pb-purple', teal: 'pb-teal', red: 'pb-red' }
  return (
    <div>
      {showLabel && (
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:5, color:'var(--text2)' }}>
          <span>{value}</span><span>{pct}%</span>
        </div>
      )}
      <div className="progress" style={{ height }}>
        <div className={`progress-bar ${cls[color] || 'pb-blue'}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
