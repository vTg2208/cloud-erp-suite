export function Skeleton({ width = '100%', height = 16, radius = 6, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius: radius, flexShrink: 0 }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="card card-sm">
      <Skeleton width={40} height={40} radius={10} />
      <div style={{ marginTop: 14 }}>
        <Skeleton width="60%" height={12} />
        <Skeleton width="80%" height={22} style={{ marginTop: 8 }} />
        <Skeleton width="50%" height={11} style={{ marginTop: 8 }} />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <Skeleton width={32} height={32} radius={8} />
      <div style={{ flex: 1 }}>
        <Skeleton width="40%" height={13} />
        <Skeleton width="25%" height={11} style={{ marginTop: 6 }} />
      </div>
      <Skeleton width={60} height={22} radius={6} />
    </div>
  )
}
