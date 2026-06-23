const SUGGESTED_PROMPTS = [
  'Summarize Q2 financial performance and key risks',
  'Which departments are understaffed this quarter?',
  'Generate a hiring plan for next 6 months',
  'Identify top 3 inventory restock priorities',
  'Predict revenue for Q3 based on current trends',
  'Analyze employee attrition patterns',
  'What projects are at risk of missing deadlines?',
  'Compare our growth vs industry benchmarks',
]

const CHAT_HISTORY = [
  { title:'Q2 Financial Analysis',   time:'Today',     msgs:3,  active:true },
  { title:'Hiring Plan Review',      time:'Yesterday', msgs:7,  active:false },
  { title:'Inventory Analysis',      time:'Jun 2',     msgs:5,  active:false },
  { title:'Budget Forecast Q3',      time:'Jun 1',     msgs:12, active:false },
  { title:'HR Attrition Deep Dive',  time:'May 30',    msgs:8,  active:false },
  { title:'Project Risk Assessment', time:'May 28',    msgs:4,  active:false },
]

export function AIPage() {
  return (
    <div className="page-enter" style={{ padding:24,height:'calc(100vh - 60px)',display:'flex',flexDirection:'column' }}>
      {/* Header */}
      <div style={{ marginBottom:20,flexShrink:0 }}>
        <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:4 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#4f8ef7,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>✦</div>
          <div>
            <h1 style={{ fontSize:22,fontWeight:600,letterSpacing:'-.4px',color:'var(--text)' }}>AI Assistant</h1>
            <p style={{ fontSize:13,color:'var(--text2)' }}>Powered by advanced intelligence · Context-aware enterprise insights</p>
          </div>
          <div style={{ marginLeft:'auto',display:'flex',gap:8 }}>
            <div style={{ background:'rgba(79,142,247,.15)',border:'1px solid rgba(79,142,247,.3)',borderRadius:20,padding:'4px 12px',fontSize:11,color:'var(--accent)',fontWeight:500 }}>● LIVE</div>
            <button className="erp-btn-ghost" style={{ fontSize:12 }}>+ New Conversation</button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display:'grid',gridTemplateColumns:'280px 1fr',gap:16,flex:1,minHeight:0 }}>
        {/* Left sidebar */}
        <div style={{ display:'flex',flexDirection:'column',gap:12,overflow:'hidden' }}>
          {/* Suggested prompts */}
          <div className="card card-sm" style={{ flexShrink:0 }}>
            <div style={{ fontSize:12,fontWeight:500,color:'var(--text2)',marginBottom:10,textTransform:'uppercase',letterSpacing:'.5px' }}>Suggested Prompts</div>
            <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
              {SUGGESTED_PROMPTS.slice(0,5).map((p,i) => (
                <div key={i} style={{
                  background:'var(--bg3)', border:'1px solid var(--border)',
                  borderRadius:8, padding:'9px 10px', fontSize:12,
                  color:'var(--text2)', cursor:'pointer', lineHeight:1.4,
                  transition:'all .15s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--text)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text2)' }}
                >{p}</div>
              ))}
            </div>
          </div>

          {/* Chat history */}
          <div className="card card-sm" style={{ flex:1,overflowY:'auto' }}>
            <div style={{ fontSize:12,fontWeight:500,color:'var(--text2)',marginBottom:10,textTransform:'uppercase',letterSpacing:'.5px' }}>Chat History</div>
            <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
              {CHAT_HISTORY.map((h,i) => (
                <div key={i} style={{
                  padding:'10px',
                  background: h.active ? 'var(--accent-bg)' : 'var(--bg3)',
                  borderRadius:8, cursor:'pointer',
                  borderLeft: h.active ? '3px solid var(--accent)' : '3px solid transparent',
                  transition:'all .15s',
                }}
                  onMouseEnter={e=>{ if(!h.active) e.currentTarget.style.background='var(--card2)' }}
                  onMouseLeave={e=>{ if(!h.active) e.currentTarget.style.background='var(--bg3)' }}
                >
                  <div style={{ fontSize:12,fontWeight:h.active?500:400,color:h.active?'var(--text)':'var(--text2)',marginBottom:3 }}>{h.title}</div>
                  <div style={{ fontSize:11,color:'var(--text3)' }}>{h.time} · {h.msgs} messages</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="card card-sm" style={{ flexShrink:0 }}>
            <div style={{ fontSize:12,fontWeight:500,color:'var(--text2)',marginBottom:10 }}>Usage This Month</div>
            {[['Conversations','24'],['Messages','187'],['Reports Generated','12']].map(([l,v])=>(
              <div key={l} className="stat-row" style={{ padding:'7px 0' }}>
                <span style={{ fontSize:12,color:'var(--text2)' }}>{l}</span>
                <span style={{ fontSize:13,fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Iframe */}
        <div style={{
          borderRadius:14, overflow:'hidden',
          border:'1px solid var(--border)',
          background:'var(--card)',
          display:'flex', flexDirection:'column',
        }}>
          {/* Iframe header */}
          <div style={{ padding:'12px 18px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:10,flexShrink:0 }}>
            <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--green)' }}></div>
            <span style={{ fontSize:13,color:'var(--text2)' }}>Amdox AI · Enterprise Intelligence</span>
            <div style={{ marginLeft:'auto',display:'flex',gap:6 }}>
              <button className="erp-btn-ghost" style={{ fontSize:11,padding:'4px 10px' }}>Clear</button>
              <button className="erp-btn-ghost" style={{ fontSize:11,padding:'4px 10px' }}>Export</button>
            </div>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/Qo13UNSzDfdfBox_SN8YJ"
            width="100%"
            style={{ flex:1,border:'none',minHeight:500 }}
            allow="microphone"
            title="Amdox AI Assistant"
          />
        </div>
      </div>
    </div>
  )
}
