import { useState } from 'react'
import { CATEGORIES, type Category } from '../lib/config'

interface Props { onSelect: (cat: Category) => void; onBack: () => void }

const AVATARS = [
  { initials:'RS', bg:'#1c2d3d' },
  { initials:'MK', bg:'#0f1923' },
  { initials:'JP', bg:'#00d4ff', color:'#0f1923' },
]

export default function CategoriesPage({ onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, background:'#f4f8fb' }}>

      {/* Dark header */}
      <div className="page-header" style={{ padding:'48px 22px 52px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
          <div>
            <button className="back-link" onClick={onBack}>← Back</button>
            <div className="header-brand">Agents24<em style={{ fontStyle:'italic' }}>by</em>7</div>
          </div>
          <div className="online-chip">
            <span className="chip-dot" />
            <span className="chip-text">Agents online</span>
          </div>
        </div>
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:27, fontWeight:700, color:'#fff', lineHeight:1.2, marginBottom:7 }}>
          How can we <span style={{ color:'#00d4ff' }}>help</span><br/>you today?
        </h2>
        <p style={{ fontSize:12, color:'rgba(255,255,255,0.38)', lineHeight:1.6 }}>
          Pick a category — we get it done through<br/>our curated service Providers, instantly.
        </p>
        <div className="curve-top" style={{ background:'#f4f8fb' }} />
      </div>

      {/* Scrollable content */}
      <div className="ice-scroll" style={{ padding:'22px 16px 28px' }}>

        {/* Agent banner */}
        <div style={{
          background:'#fff', border:'1px solid rgba(0,212,255,0.25)',
          borderRadius:16, padding:14, display:'flex', alignItems:'center',
          gap:12, marginBottom:14, boxShadow:'0 2px 14px rgba(15,25,35,0.07)',
        }}>
          <div style={{ display:'flex' }}>
            {AVATARS.map((av,i) => (
              <div key={i} style={{
                width:32, height:32, borderRadius:'50%', border:'2.5px solid #fff',
                marginLeft:i===0?0:-9, background:av.bg,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:600, color:av.color ?? '#fff',
              }}>{av.initials}</div>
            ))}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontSize:12.5, fontWeight:600, color:'#0f1923' }}>Real agents, curated providers</p>
            <p style={{ fontSize:11, color:'rgba(15,25,35,0.45)' }}>We get your request done — instantly.</p>
          </div>
          <span style={{ fontSize:20 }}>🤝</span>
        </div>

        {/* Category grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {CATEGORIES.map((cat, i) => {
            const isSel = selected === i
            return (
              <button key={cat.id} onClick={() => setSelected(i)} style={{
                background: isSel ? 'linear-gradient(135deg,#f0fbff,#fff)' : '#fff',
                border: `1px solid ${isSel ? 'rgba(0,212,255,0.55)' : 'rgba(15,25,35,0.08)'}`,
                borderRadius:16, padding:'14px 12px', cursor:'pointer', textAlign:'left',
                position:'relative', fontFamily:'inherit',
                boxShadow: isSel
                  ? '0 0 0 3px rgba(0,212,255,0.15),0 6px 20px rgba(0,212,255,0.12)'
                  : '0 1px 6px rgba(15,25,35,0.04)',
                transition:'all 0.2s',
              }}>
                <span style={{
                  display:'inline-block', fontSize:28, lineHeight:1, marginBottom:10,
                  transition:'transform 0.3s',
                  transform: isSel ? 'scale(1.12) rotate(-4deg)' : 'none',
                }}>{cat.icon}</span>
                <p style={{ fontSize:12.5, fontWeight:600, lineHeight:1.3, color: isSel ? '#007a99' : '#0f1c2e' }}>
                  {cat.name}
                </p>
                <div style={{
                  position:'absolute', bottom:10, right:10, width:20, height:20,
                  borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:10, transition:'opacity 0.2s', opacity: isSel ? 1 : 0,
                  background: isSel ? '#00d4ff' : '#0f1923',
                  color: isSel ? '#0f1923' : '#00d4ff',
                }}>→</div>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop:18, textAlign:'center', fontSize:11, color:'#9ca3af' }}>
          <a href="https://agents24by7.com" target="_blank" rel="noopener"
             style={{ color:'#0088aa', textDecoration:'none', fontWeight:500 }}>
            agents24by7.com
          </a>{' · '}Curated Provider Network
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background:'#fff', borderTop:'1px solid rgba(15,25,35,0.08)', padding:'14px 18px 30px', flexShrink:0 }}>
        <button
          className={`continue-btn ${selected !== null ? 'active' : ''}`}
          onClick={() => selected !== null && onSelect(CATEGORIES[selected])}>
          Connect with an Agent
        </button>
      </div>
    </div>
  )
}
