export function Badge({ variant = 'gray', children, size = 'sm' }) {
  return (
    <span className={`badge badge-${variant}`} style={{ fontSize: size === 'xs' ? 10 : 11 }}>
      {children}
    </span>
  )
}
