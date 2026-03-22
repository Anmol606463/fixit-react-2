interface Props { onStart: () => void }

const CYAN      = '#00d4ff'
const CYAN_DIM  = 'rgba(0,212,255,0.12)'
const CYAN_RING = 'rgba(0,212,255,0.18)'
const CYAN_R4   = 'rgba(0,212,255,0.06)'
const MUTED     = 'rgba(255,255,255,0.45)'

export default function SplashPage({ onStart }: Props) {
  const DOTS = [
    { w:7,  h:7,  style:{ top:'17%',   left:'12%'  }, delay:'0s'   },
    { w:5,  h:5,  style:{ top:'20%',   right:'16%' }, delay:'1s'   },
    { w:8,  h:8,  style:{ bottom:'26%',right:'11%' }, delay:'1.8s' },
    { w:5,  h:5,  style:{ bottom:'20%',left:'15%'  }, delay:'2.6s' },
    { w:4,  h:4,  style:{ top:'40%',   left:'7%'   }, delay:'1.3s' },
  ]

  return (
    <div style={{
      background:'#0f1923', flex:1, display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', textAlign:'center',
      padding:'0 32px', position:'relative', overflow:'hidden',
    }}>
      {/* Rings */}
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
        {[230,360,510].map((s,i) => (
          <div key={i} style={{ position:'absolute', width:s, height:s, borderRadius:'50%', border:`1px solid ${CYAN_RING}` }} />
        ))}
        <div style={{ position:'absolute', width:680, height:680, borderRadius:'50%', border:`1px solid ${CYAN_R4}` }} />
      </div>

      {/* Floating dots */}
      {DOTS.map((d,i) => (
        <div key={i} style={{
          position:'absolute', width:d.w, height:d.h, borderRadius:'50%',
          background:CYAN, animationDelay:d.delay,
          animation:'fdPulse 3s ease-in-out infinite', ...d.style,
        }} />
      ))}

      {/* Icon */}
      <div className="animate-iconIn" style={{
        position:'relative', zIndex:2, marginBottom:22,
        width:88, height:88, borderRadius:'50%',
        background:'linear-gradient(145deg,#00d4ff,#0070a0)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 0 0 12px rgba(0,212,255,0.09),0 0 0 26px rgba(0,212,255,0.04)',
      }}>
        <svg width="44" height="44" viewBox="0 0 48 48" fill="#0f1923">
          <circle cx="24" cy="16" r="9"/>
          <path d="M7 44c0-9.5 7.6-16 17-16s17 6.5 17 16H7z"/>
        </svg>
      </div>

      {/* Eyebrow */}
      <p className="animate-fadeUp" style={{
        position:'relative', zIndex:2, animationDelay:'0.2s',
        fontSize:10, fontWeight:600, letterSpacing:'0.28em',
        color:'rgba(0,212,255,0.6)', textTransform:'uppercase', marginBottom:10,
      }}>Your Requests. Our Agents.</p>

      {/* Brand */}
      <h1 className="animate-fadeUp" style={{
        position:'relative', zIndex:2, animationDelay:'0.32s',
        fontFamily:'"Playfair Display",serif', fontSize:44, fontWeight:800,
        color:'#fff', lineHeight:1, letterSpacing:'-1.5px', marginBottom:4,
      }}>
        <span style={{ color:CYAN }}>Agents</span>24
        <em style={{ fontStyle:'italic', color:CYAN }}>by</em>7
      </h1>

      {/* Sub */}
      <p className="animate-fadeUp" style={{
        position:'relative', zIndex:2, animationDelay:'0.42s',
        fontSize:10.5, fontWeight:500, letterSpacing:'0.2em',
        color:'rgba(0,212,255,0.45)', textTransform:'uppercase', marginBottom:24,
      }}>Curated Provider Network</p>

      {/* Divider */}
      <div className="animate-fadeUp cyan-divider" style={{ animationDelay:'0.5s', marginBottom:24, position:'relative', zIndex:2 }} />

      {/* Tagline */}
      <div className="animate-fadeUp" style={{ position:'relative', zIndex:2, animationDelay:'0.58s', marginBottom:42 }}>
        <p style={{ fontSize:16, fontWeight:600, color:'#fff', marginBottom:8 }}>Tell us what you need.</p>
        <p style={{ fontSize:14, color:MUTED, lineHeight:1.8 }}>
          We get it done through our<br/>
          <span style={{ color:CYAN, fontWeight:600 }}>curated service Providers</span><br/>
          — instantly.
        </p>
      </div>

      {/* CTA pill */}
      <button
        onClick={onStart}
        className="animate-fadeUp"
        style={{
          animationDelay:'0.72s', position:'relative', zIndex:2,
          display:'inline-flex', alignItems:'center', gap:10,
          padding:'14px 28px', borderRadius:100,
          border:'1.5px solid rgba(0,212,255,0.4)', background:CYAN_DIM,
          cursor:'pointer', transition:'all 0.25s', fontFamily:'inherit',
        }}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, {
          background:'rgba(0,212,255,0.2)', transform:'translateY(-2px)',
          boxShadow:'0 14px 40px rgba(0,212,255,0.2)',
        })}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, {
          background:CYAN_DIM, transform:'none', boxShadow:'none',
        })}
      >
        <span className="animate-livePulse" style={{ width:8, height:8, borderRadius:'50%', background:'#4ade80', flexShrink:0, display:'block' }} />
        <span style={{ fontSize:14, fontWeight:600, color:'#fff' }}>Agents online now</span>
      </button>

      {/* Domain */}
      <span className="animate-fadeUp" style={{
        animationDelay:'0.9s', position:'absolute', bottom:34, zIndex:2,
        fontSize:11, color:'rgba(255,255,255,0.15)', letterSpacing:'0.12em',
      }}>agents24by7.com</span>
    </div>
  )
}
