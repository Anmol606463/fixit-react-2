import { type Category, buildWAMessage, buildWALink } from '../lib/config'

interface Props { category: Category; name: string; desc: string; onBack: () => void }

function WAIcon({ size=18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const STEPS = [
  { icon:'✅', text:'Request saved and categorised' },
  { icon:'👤', text:'Agent assigned in Respond.io' },
  { icon:'💬', text:'Agent replies on your WhatsApp' },
  { icon:'📱', text:'Your number captured automatically' },
]

export default function SuccessPage({ category, name, desc, onBack }: Props) {
  const msg = buildWAMessage(name, category, desc)

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1 }}>

      {/* Dark top */}
      <div style={{
        background:'#0f1923', flexShrink:0, padding:'52px 24px 44px',
        display:'flex', flexDirection:'column', alignItems:'center',
        textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Rings */}
        {[130,210,300].map((s,i) => (
          <div key={i} style={{
            position:'absolute', width:s, height:s, borderRadius:'50%',
            border:'1px solid rgba(0,212,255,0.1)',
            top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          }} />
        ))}

        {/* WA circle */}
        <div className="animate-pop" style={{
          position:'relative', zIndex:2, width:76, height:76, borderRadius:'50%',
          background:'#25D366', marginBottom:16,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 0 0 12px rgba(37,211,102,0.08),0 20px 50px rgba(37,211,102,0.2)',
        }}>
          <WAIcon size={38} />
        </div>

        <h1 style={{ position:'relative', zIndex:2, fontFamily:'"Playfair Display",serif', fontSize:24, fontWeight:700, color:'#fff', marginBottom:4 }}>
          WhatsApp opened!
        </h1>
        <p style={{ position:'relative', zIndex:2, fontSize:12, color:'rgba(0,212,255,0.55)' }}>
          Request saved ✓
        </p>
        <div className="cyan-divider" style={{ marginTop:14, marginBottom:14, position:'relative', zIndex:2 }} />
        <p style={{ position:'relative', zIndex:2, fontSize:13, lineHeight:1.65, color:'rgba(255,255,255,0.5)', maxWidth:230 }}>
          Your message is pre-filled. Hit send — your agent will reply shortly.
        </p>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:36, background:'#f4f8fb', borderRadius:'22px 22px 0 0' }} />
      </div>

      {/* Ice bottom */}
      <div className="ice-scroll" style={{ padding:'18px 18px 28px', display:'flex', flexDirection:'column', gap:12 }}>

        {/* Steps */}
        <div style={{ background:'#fff', borderRadius:18, padding:16, border:'1px solid rgba(0,212,255,0.2)', boxShadow:'0 2px 14px rgba(15,25,35,0.05)' }}>
          <p style={{ fontSize:9, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', color:'rgba(15,25,35,0.35)', marginBottom:12 }}>
            What happens next
          </p>
          {STEPS.map((s,i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'5px 0' }}>
              <span style={{ fontSize:15, flexShrink:0, marginTop:1 }}>{s.icon}</span>
              <p style={{ fontSize:13, color:'#374151', lineHeight:1.45 }}>{s.text}</p>
            </div>
          ))}
        </div>

        {/* Open WA */}
        <button className="wa-btn" onClick={() => window.open(buildWALink(msg), '_blank')}>
          <WAIcon size={18} /> Open WhatsApp again
        </button>

        {/* New request */}
        <button onClick={onBack} style={{
          width:'100%', padding:14, borderRadius:14, cursor:'pointer',
          background:'#fff', border:'1px solid rgba(15,25,35,0.12)',
          color:'#0f1923', fontFamily:'"DM Sans",sans-serif', fontSize:14, fontWeight:600,
          transition:'background 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background='#f4f8fb')}
          onMouseLeave={e => (e.currentTarget.style.background='#fff')}>
          Submit another request
        </button>

        <div style={{ textAlign:'center', fontSize:11, color:'#9ca3af' }}>
          <a href="https://agents24by7.com" target="_blank" rel="noopener"
             style={{ color:'#0088aa', textDecoration:'none', fontWeight:500 }}>
            agents24by7.com
          </a>{' · '}Curated Provider Network
        </div>
      </div>
    </div>
  )
}
