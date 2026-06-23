import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Badge }  from '../components/shared/Badge'

export function SettingsPage() {
  const { theme, toggleTheme, role, setRole } = useApp()
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({ email:true, push:false, projects:true, finance:true, hr:false })

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="page-enter" style={{ padding:24 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)' }}>Settings</h1>
        <p style={{ fontSize:13,color:'var(--text2)',marginTop:4 }}>Account preferences, security, and system configuration</p>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
        {/* Profile */}
        <div className="card">
          <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:16 }}>Profile Settings</div>
          <div style={{ display:'flex',alignItems:'center',gap:14,marginBottom:20 }}>
            <div style={{ width:58,height:58,borderRadius:14,background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:600,color:'#fff' }}>AK</div>
            <div>
              <div style={{ fontSize:16,fontWeight:500 }}>Arjun Kumar</div>
              <div style={{ fontSize:13,color:'var(--text2)' }}>arjun.kumar@amdox.com</div>
              <Badge variant="blue" style={{ marginTop:6 }}>Administrator</Badge>
            </div>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
            {[['Full Name','text','Arjun Kumar'],['Email','email','arjun.kumar@amdox.com'],['Phone','+91 98765 43210'],['Location','Bengaluru, India']].map(([l,t,v])=>(
              <div key={l}>
                <div style={{ fontSize:12,color:'var(--text3)',marginBottom:5 }}>{l}</div>
                <input type={t||'text'} defaultValue={v} className="erp-input" />
              </div>
            ))}
            <div>
              <div style={{ fontSize:12,color:'var(--text3)',marginBottom:5 }}>Department</div>
              <select className="erp-select" style={{ width:'100%' }}>
                {['Executive','Engineering','Finance','HR','Marketing'].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <button onClick={handleSave} className="erp-btn" style={{ marginTop:4 }}>
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
          {/* Appearance */}
          <div className="card">
            <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14 }}>Appearance</div>
            <div className="stat-row">
              <div>
                <div style={{ fontSize:13,fontWeight:500 }}>Dark Mode</div>
                <div style={{ fontSize:11,color:'var(--text3)' }}>Toggle between dark and light theme</div>
              </div>
              <button onClick={toggleTheme} style={{
                width:48,height:26,borderRadius:13,border:'none',cursor:'pointer',position:'relative',
                background:theme==='dark'?'var(--accent)':'var(--bg3)',transition:'background .2s',
              }}>
                <div style={{
                  position:'absolute',top:3,
                  left:theme==='dark'?22:3,
                  width:20,height:20,borderRadius:'50%',background:'#fff',
                  transition:'left .2s',boxShadow:'0 2px 4px rgba(0,0,0,.2)',
                }}></div>
              </button>
            </div>
            <div className="stat-row">
              <div>
                <div style={{ fontSize:13,fontWeight:500 }}>Compact Sidebar</div>
                <div style={{ fontSize:11,color:'var(--text3)' }}>Collapse sidebar to icon-only mode</div>
              </div>
              <div style={{ width:48,height:26,borderRadius:13,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',position:'relative' }}>
                <div style={{ position:'absolute',top:3,left:3,width:18,height:18,borderRadius:'50%',background:'var(--text3)' }}></div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14 }}>Notification Preferences</div>
            {Object.entries(notifs).map(([k,v]) => (
              <div key={k} className="stat-row">
                <span style={{ fontSize:13,color:'var(--text2)',textTransform:'capitalize' }}>
                  {k==='email'?'Email notifications':k==='push'?'Push notifications':k==='hr'?'HR alerts':k==='finance'?'Financial alerts':'Project updates'}
                </span>
                <button onClick={()=>setNotifs(n=>({...n,[k]:!n[k]}))} style={{
                  width:40,height:22,borderRadius:11,border:'none',cursor:'pointer',position:'relative',
                  background:v?'var(--accent)':'var(--bg3)',
                  outline:v?'none':'1px solid var(--border)',
                  transition:'background .2s',
                }}>
                  <div style={{
                    position:'absolute',top:3,
                    left:v?20:3,width:16,height:16,borderRadius:'50%',
                    background:v?'#fff':'var(--text3)',transition:'left .2s',
                  }}></div>
                </button>
              </div>
            ))}
          </div>

          {/* Role switcher */}
          <div className="card">
            <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14 }}>Access Control</div>
            {['admin','manager','employee'].map(r => (
              <div key={r} onClick={()=>setRole(r)} style={{
                padding:'12px',borderRadius:8,marginBottom:6,cursor:'pointer',
                border:`1px solid ${role===r?'var(--accent)':'var(--border)'}`,
                background:role===r?'var(--accent-bg)':'var(--bg3)',
                display:'flex',alignItems:'center',justifyContent:'space-between',
                transition:'all .15s',
              }}>
                <div>
                  <div style={{ fontSize:13,fontWeight:500,color:role===r?'var(--accent)':'var(--text)',textTransform:'capitalize' }}>{r}</div>
                  <div style={{ fontSize:11,color:'var(--text3)' }}>
                    {r==='admin'?'Full access to all modules':r==='manager'?'Department-level access':'Read-only access'}
                  </div>
                </div>
                {role===r && <Badge variant="blue">Active</Badge>}
              </div>
            ))}
          </div>

          {/* Security */}
          <div className="card">
            <div style={{ fontSize:13,fontWeight:500,color:'var(--text2)',marginBottom:14 }}>Security</div>
            <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
              <button className="erp-btn-ghost" style={{ textAlign:'left',width:'100%' }}>🔑 Change Password</button>
              <button className="erp-btn-ghost" style={{ textAlign:'left',width:'100%' }}>📱 Enable 2FA</button>
              <button className="erp-btn-ghost" style={{ textAlign:'left',width:'100%' }}>🔒 Active Sessions (3)</button>
              <button className="erp-btn-ghost" style={{ textAlign:'left',width:'100%',color:'var(--red)',borderColor:'rgba(239,68,68,.3)' }}>⬡ Logout All Devices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
