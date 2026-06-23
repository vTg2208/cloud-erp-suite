export function Avatar({ initials, color = '#4f8ef7', size = 32, radius = 8 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: radius,
      background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * .38, fontWeight: 600, color: '#fff',
      flexShrink: 0, userSelect: 'none',
    }}>
      {initials}
    </div>
  )
}
