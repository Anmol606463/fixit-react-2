import { useState } from 'react'
import { type Category, buildWAMessage, buildWALink, saveRequest } from '../lib/config'

interface Props { category: Category; onBack: () => void; onSubmit: (name: string, desc: string) => void }

function WAIcon({ size=18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function RequestPage({ category, onBack, onSubmit }: Props) {
  const [name,    setName]    = useState('')
  const [desc,    setDesc]    = useState('')
  const [errors,  setErrors]  = useState({ name: false, desc: false })
  const [loading, setLoading] = useState(false)

  const preview = name.trim() && desc.trim()
    ? buildWAMessage(name.trim(), category, desc.trim()) : ''

  function validate() {
    const e = { name: !name.trim(), desc: !desc.trim() }
    setErrors(e); return !e.name && !e.desc
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    const msg = buildWAMessage(name.trim(), category, desc.trim())
    window.open(buildWALink(msg), '_blank')
    try { await saveRequest({ name: name.trim(), category: category.name, categoryIcon: category.icon, description: desc.trim(), waMessage: msg }) }
    catch { /* silent */ }
    finally { setLoading(false); onSubmit(name.trim(), desc.trim()) }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1 }}>

      {/* Header */}
      <div className="page-header" style={{ padding:'48px 22px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
          <div>
            <button className="back-link" onClick={onBack}>← Back</button>
            <div className="header-brand">Agents24<em style={{ fontStyle:'italic' }}>by</em>7</div>
          </div>
          <div className="online-chip">
            <span className="chip-dot" />
            <span className="chip-text">Agents online</span>
          </div>
        </div>
        {/* Category pill */}
        <div style={{
          display:'flex', alignItems:'center', gap:12, borderRadius:14,
          padding:'11px 16px', background:'rgba(255,255,255,0.06)',
          border:'1px solid rgba(0,212,255,0.2)',
        }}>
          <span style={{ fontSize:24, lineHeight:1 }}>{category.icon}</span>
          <div>
            <p style={{ fontSize:14, fontWeight:600, color:'#fff' }}>{category.name}</p>
            <p style={{ fontSize:11, color:'rgba(0,212,255,0.55)', marginTop:2 }}>Agent replies on WhatsApp</p>
          </div>
        </div>
        <div className="curve-top" style={{ background:'#f4f8fb' }} />
      </div>

      {/* Ice form area */}
      <div className="ice-scroll" style={{ padding:'20px 20px 32px', display:'flex', flexDirection:'column', gap:16 }}>

        {/* Name */}
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <label style={{ fontSize:12, fontWeight:600, color:'#0f1923', display:'flex', alignItems:'center', gap:3 }}>
            Your name <span style={{ color:'#00d4ff' }}>*</span>
          </label>
          <input className={`en-field ${errors.name ? 'err' : ''}`} type="text"
                 placeholder="Ahmed Al Rashid" value={name}
                 onChange={e => { setName(e.target.value); if (errors.name && e.target.value.trim()) setErrors(p=>({...p,name:false})) }} />
          {errors.name && <p style={{ fontSize:11, color:'#dc2626' }}>Please enter your name</p>}
        </div>

        {/* Description */}
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <label style={{ fontSize:12, fontWeight:600, color:'#0f1923', display:'flex', alignItems:'center', gap:3 }}>
            Describe what you need <span style={{ color:'#00d4ff' }}>*</span>
          </label>
          <textarea className={`en-field ${errors.desc ? 'err' : ''}`} rows={5}
                    placeholder={category.placeholder} value={desc}
                    onChange={e => { setDesc(e.target.value); if (errors.desc && e.target.value.trim()) setErrors(p=>({...p,desc:false})) }} />
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            {errors.desc ? <p style={{ fontSize:11, color:'#dc2626' }}>Please describe your request</p> : <span/>}
            <p style={{ fontSize:11, color:'rgba(15,25,35,0.35)', marginLeft:'auto' }}>{desc.length} / 500</p>
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div style={{ background:'#fff', borderRadius:12, padding:'12px 14px', border:'1px solid rgba(0,212,255,0.25)', boxShadow:'0 2px 10px rgba(15,25,35,0.05)' }}>
            <p style={{ fontSize:9, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', color:'rgba(15,25,35,0.35)', marginBottom:7 }}>Message preview</p>
            <p style={{ fontSize:11.5, lineHeight:1.8, color:'rgba(15,25,35,0.6)', whiteSpace:'pre-line', fontFamily:'monospace' }}>{preview}</p>
          </div>
        )}

        {/* WA note */}
        <div style={{ display:'flex', alignItems:'flex-start', gap:10, borderRadius:12, padding:'11px 14px', background:'rgba(37,211,102,0.06)', border:'1px solid rgba(37,211,102,0.2)' }}>
          <div style={{ width:22, height:22, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
            <WAIcon size={11} />
          </div>
          <p style={{ fontSize:12, color:'#166534', lineHeight:1.55 }}>
            WhatsApp opens with your message ready. Your agent will reply shortly.
          </p>
        </div>

        {/* Submit */}
        <button className="wa-btn" onClick={handleSubmit} disabled={loading}>
          <WAIcon size={18} />
          {loading ? 'Opening…' : 'Open WhatsApp'}
        </button>
      </div>
    </div>
  )
}
