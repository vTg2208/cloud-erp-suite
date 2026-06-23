import { useEffect } from 'react'

export function Modal({ open, onClose, title, children, width = 560 }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.65)',
        zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border2)',
        borderRadius: 16, width, maxWidth: '100%', maxHeight: '90vh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,.5)',
        animation: 'pageEnter .2s ease',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', letterSpacing: '-.2px' }}>{title}</h2>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'var(--bg3)', color: 'var(--text2)', fontSize: 16, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function FormRow({ label, required, children, hint }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text3)', marginBottom: 6, fontWeight: 500 }}>
        {label} {required && <span style={{ color: 'var(--red)' }}>*</span>}
      </label>
      {children}
      {hint && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

export function FormGrid({ children, cols = 2 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '0 16px' }}>
      {children}
    </div>
  )
}

export function ModalFooter({ onClose, onSave, saveLabel = 'Save', loading = false, danger = false }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'flex-end', gap: 10,
      padding: '14px 22px', borderTop: '1px solid var(--border)', flexShrink: 0,
    }}>
      <button onClick={onClose} className="erp-btn-ghost">Cancel</button>
      <button onClick={onSave} className="erp-btn" style={{ background: danger ? 'var(--red)' : 'var(--accent)', opacity: loading ? .7 : 1 }}>
        {loading ? 'Saving...' : saveLabel}
      </button>
    </div>
  )
}

export function ConfirmModal({ open, onClose, onConfirm, title, message }) {
  if (!open) return null
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.65)',zIndex:400,display:'flex',alignItems:'center',justifyContent:'center' }}
    >
      <div style={{ background:'var(--card)',border:'1px solid var(--border2)',borderRadius:14,width:400,padding:24,boxShadow:'0 20px 60px rgba(0,0,0,.4)' }}>
        <div style={{ fontSize:22,marginBottom:12,textAlign:'center' }}>⚠️</div>
        <h3 style={{ fontSize:16,fontWeight:600,color:'var(--text)',marginBottom:8,textAlign:'center' }}>{title}</h3>
        <p style={{ fontSize:13,color:'var(--text2)',textAlign:'center',marginBottom:22,lineHeight:1.6 }}>{message}</p>
        <div style={{ display:'flex',gap:10 }}>
          <button onClick={onClose} className="erp-btn-ghost" style={{ flex:1 }}>Cancel</button>
          <button onClick={onConfirm} className="erp-btn" style={{ flex:1,background:'var(--red)' }}>Delete</button>
        </div>
      </div>
    </div>
  )
}
