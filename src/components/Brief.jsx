// Brief.jsx — Completo: secciones 1-5 + botón WhatsApp
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Colores rápidos: neones, oscuros, pasteles ──
const QUICK_COLORS = [
  '#ff0080', '#ff3366', '#ff6600', '#ffcc00', '#00ff88',
  '#00e5ff', '#0099ff', '#7c3aed', '#e040fb', '#ff1744',
  '#1a1a2e', '#16213e', '#0f3460', '#533483', '#2d6a4f',
  '#f8f9fa', '#ffd6e7', '#c8f7c5', '#d4f1f9', '#fff3cd',
]

// ── Generador de paleta ──
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3),16)/255
  let g = parseInt(hex.slice(3,5),16)/255
  let b = parseInt(hex.slice(5,7),16)/255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  let h, s, l = (max+min)/2
  if (max===min) { h=s=0 } else {
    const d = max-min
    s = l>0.5 ? d/(2-max-min) : d/(max+min)
    switch(max) {
      case r: h=((g-b)/d+(g<b?6:0))/6; break
      case g: h=((b-r)/d+2)/6; break
      case b: h=((r-g)/d+4)/6; break
    }
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)]
}
function hslToHex(h,s,l) {
  s/=100; l/=100
  const a=s*Math.min(l,1-l)
  const f=n=>{const k=(n+h/30)%12;const c=l-a*Math.max(-1,Math.min(k-3,9-k,1));return Math.round(255*c).toString(16).padStart(2,'0')}
  return `#${f(0)}${f(8)}${f(4)}`
}
function generatePalette(hex) {
  const [h,s] = hexToHsl(hex)
  return {
    fondo:     hslToHex(h, Math.min(s,15), 96),
    fondo2:    hslToHex(h, Math.min(s,20), 90),
    texto:     hslToHex(h, Math.min(s,25), 25),
    principal: hex,
    claro:     hslToHex(h, Math.max(s-20,20), 70),
    acento:    hslToHex((h+30)%360, s, 35),
  }
}

// ── Estilos base ──
const inputBase = (focused) => ({
  width: '100%',
  background: 'rgba(15,15,21,0.6)',
  border: `1px solid ${focused ? 'var(--cyan-border)' : 'rgba(255,255,255,0.07)'}`,
  borderRadius: '6px',
  color: 'var(--text)',
  fontFamily: 'var(--font-display)',
  fontSize: '0.95rem',
  fontWeight: 300,
  padding: '0.85rem 1rem',
  outline: 'none',
  transition: 'border-color 0.28s ease, box-shadow 0.28s ease',
  boxShadow: focused ? '0 0 14px var(--cyan-glow)' : 'none',
  lineHeight: 1.7,
})

// ── Sub-componentes ──
function TextArea({ label, hint, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label style={{ display:'block', fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600, color:'var(--text)', marginBottom:'0.35rem' }}>{label}</label>
      {hint && <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', marginBottom:'0.75rem', lineHeight:1.6 }}>{hint}</p>}
      <textarea rows={5} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={{...inputBase(focused), resize:'none'}} />
    </div>
  )
}

function TextInput({ label, hint, placeholder, value, onChange, half }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom:'1.5rem', flex: half?'1 1 45%':'1 1 100%', minWidth: half?'200px':'unset' }}>
      <label style={{ display:'block', fontFamily:'var(--font-display)', fontSize:'0.95rem', fontWeight:600, color:'var(--text)', marginBottom:'0.35rem' }}>{label}</label>
      {hint && <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-muted)', marginBottom:'0.6rem', lineHeight:1.5 }}>{hint}</p>}
      <input type="text" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={inputBase(focused)} />
    </div>
  )
}

function SelectInput({ label, hint, options, value, onChange, half }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom:'1.5rem', flex: half?'1 1 45%':'1 1 100%', minWidth: half?'200px':'unset' }}>
      <label style={{ display:'block', fontFamily:'var(--font-display)', fontSize:'0.95rem', fontWeight:600, color:'var(--text)', marginBottom:'0.35rem' }}>{label}</label>
      {hint && <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-muted)', marginBottom:'0.6rem', lineHeight:1.5 }}>{hint}</p>}
      <select value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{...inputBase(focused), appearance:'none', backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2355556a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat:'no-repeat', backgroundPosition:'right 1rem center'}}>
        {options.map(o=><option key={o.value} value={o.value} style={{background:'#0f0f15'}}>{o.label}</option>)}
      </select>
    </div>
  )
}

function Chips({ label, hint, options, selected, onChange }) {
  const toggle = opt => onChange(selected.includes(opt) ? selected.filter(o=>o!==opt) : [...selected, opt])
  return (
    <div style={{ marginBottom:'1.75rem' }}>
      <label style={{ display:'block', fontFamily:'var(--font-display)', fontSize:'0.95rem', fontWeight:600, color:'var(--text)', marginBottom:'0.35rem' }}>{label}</label>
      {hint && <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-muted)', marginBottom:'0.75rem', lineHeight:1.5 }}>{hint}</p>}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
        {options.map(opt => {
          const active = selected.includes(opt)
          return <button key={opt} type="button" onClick={()=>toggle(opt)} style={{ padding:'0.45rem 1rem', borderRadius:'999px', border:`1px solid ${active?'var(--cyan-border)':'rgba(255,255,255,0.1)'}`, background: active?'var(--cyan-dim)':'rgba(15,15,21,0.6)', color: active?'var(--cyan)':'var(--text-muted)', fontFamily:'var(--font-display)', fontSize:'0.85rem', cursor:'pointer', transition:'all 0.2s ease', boxShadow: active?'0 0 10px var(--cyan-glow)':'none' }}>{opt}</button>
        })}
      </div>
    </div>
  )
}

function SectionTitle({ number, title, subtitle }) {
  return (
    <div style={{ borderTop:'1px solid var(--border)', paddingTop:'2.5rem', marginBottom:'2rem' }}>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'var(--text)', marginBottom:'0.4rem' }}>
        <span style={{ color:'var(--cyan)', marginRight:'0.5rem' }}>{number}·</span>{title}
      </h2>
      {subtitle && <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', lineHeight:1.6 }}>{subtitle}</p>}
    </div>
  )
}

function InfoBox({ text }) {
  return <div style={{ marginTop:'-0.75rem', marginBottom:'1.5rem', padding:'0.85rem 1rem', background:'rgba(0,229,255,0.05)', border:'1px solid var(--cyan-border)', borderRadius:'6px', fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-dim)', lineHeight:1.7 }}>ⓘ {text}</div>
}

// ── Sección 4: Color picker ──
function ColorPicker({ color, onChange }) {
  const palette = generatePalette(color)
  const paletteEntries = [
    { key:'fondo', label:'Fondo', desc:'El color de la página' },
    { key:'fondo2', label:'Fondo 2', desc:'Para separar secciones' },
    { key:'texto', label:'Texto', desc:'Todo lo que se lee' },
    { key:'principal', label:'Principal', desc:'Botones y títulos' },
    { key:'claro', label:'Claro', desc:'Detalles suaves' },
    { key:'acento', label:'Acento', desc:'Para destacar algo' },
  ]
  return (
    <div>
      <p style={{ fontFamily:'var(--font-display)', fontSize:'0.95rem', fontWeight:600, color:'var(--text)', marginBottom:'0.5rem' }}>Elige tu color principal</p>
      <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-muted)', marginBottom:'1.25rem', lineHeight:1.5 }}>
        Toca un color de la paleta rápida o usa el selector para elegir cualquier tono — incluyendo neones y brillantes.
      </p>

      {/* Colores rápidos */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1.25rem' }}>
        {QUICK_COLORS.map(c => (
          <button key={c} type="button" onClick={()=>onChange(c)} style={{ width:'32px', height:'32px', borderRadius:'6px', background:c, border: color===c ? '2px solid white' : '2px solid transparent', cursor:'pointer', boxShadow: color===c ? `0 0 12px ${c}` : 'none', transition:'all 0.2s', flexShrink:0 }} title={c} />
        ))}
        {/* Input color nativo para espectro completo */}
        <label style={{ width:'32px', height:'32px', borderRadius:'6px', border:'2px dashed rgba(255,255,255,0.2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', position:'relative', flexShrink:0 }} title="Más colores">
          +
          <input type="color" value={color} onChange={e=>onChange(e.target.value)} style={{ position:'absolute', opacity:0, width:'100%', height:'100%', cursor:'pointer' }} />
        </label>
      </div>

      {/* Color seleccionado */}
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.75rem', padding:'1rem', background:'rgba(15,15,21,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px' }}>
        <div style={{ width:'48px', height:'48px', borderRadius:'8px', background:color, boxShadow:`0 0 20px ${color}88`, flexShrink:0 }} />
        <div>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem', color:'var(--text)', fontWeight:700 }}>{color.toUpperCase()}</p>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--text-muted)' }}>color seleccionado</p>
        </div>
      </div>

      {/* Paleta generada */}
      <div style={{ background:'rgba(15,15,21,0.7)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', padding:'1.5rem', marginBottom:'1.5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.25rem' }}>
          <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:color, boxShadow:`0 0 8px ${color}` }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--cyan)' }}>esta es tu paleta</span>
        </div>
        <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
          {paletteEntries.map(({key,label,desc}) => (
            <div key={key} style={{ flex:'1 1 80px', minWidth:'70px' }}>
              <div style={{ width:'100%', paddingBottom:'80%', position:'relative', borderRadius:'6px', overflow:'hidden', marginBottom:'0.4rem', border:'1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ position:'absolute', inset:0, background:palette[key] }} />
              </div>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', fontWeight:700, color:'var(--text)', textTransform:'uppercase', marginBottom:'0.1rem' }}>{label}</p>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.52rem', color:'var(--text-muted)' }}>{palette[key].toUpperCase()}</p>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.52rem', color:'var(--text-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--text-muted)', lineHeight:1.6 }}>Los tonos salen ajustados para que el texto se lea bien. Nada de esto es definitivo: es el punto de partida.</p>
      </div>

      {/* Preview en vivo */}
      <div style={{ borderRadius:'10px', overflow:'hidden', border:'1px solid rgba(255,255,255,0.08)', marginBottom:'0.5rem' }}>
        <div style={{ background:palette.fondo, padding:'1rem 1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'0.75rem', fontWeight:700, color:palette.principal, letterSpacing:'0.1em', textTransform:'uppercase' }}>tu marca</span>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'0.7rem', padding:'0.3rem 0.9rem', borderRadius:'4px', background:palette.principal, color:palette.fondo, fontWeight:600 }}>contacto</span>
        </div>
        <div style={{ background:palette.fondo2, padding:'1.5rem' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:palette.claro, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.5rem' }}>tu rubro</p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:800, color:palette.principal, marginBottom:'0.4rem' }}>Así se vería tu sitio.</p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'0.85rem', color:palette.texto, marginBottom:'1.25rem', opacity:0.7 }}>Un par de líneas para ver cómo se lee el texto sobre este fondo.</p>
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            <span style={{ padding:'0.45rem 1.1rem', borderRadius:'4px', background:palette.principal, color:palette.fondo, fontFamily:'var(--font-display)', fontSize:'0.8rem', fontWeight:600 }}>Botón principal</span>
            <span style={{ padding:'0.45rem 1.1rem', borderRadius:'4px', border:`1px solid ${palette.principal}`, color:palette.principal, fontFamily:'var(--font-display)', fontSize:'0.8rem' }}>Segundo botón</span>
          </div>
        </div>
      </div>
      <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-muted)', textAlign:'center', marginBottom:'0.5rem' }}>así se vería tu sitio con esos colores</p>
    </div>
  )
}

// ── Sección 5: Qué te gusta + envío WhatsApp ──
function buildWhatsAppMessage(form) {
  const palette = generatePalette(form.colorBase)
  const lines = [
    `🌐 *FICHA DE PROYECTO — WIRED NAVI*`,
    ``,
    `*1 · EN TUS PALABRAS*`,
    `¿Qué tienes hoy? ${form.queTienes || '—'}`,
    `¿Qué quieres tener? ${form.queQuieres || '—'}`,
    `Tu negocio: ${form.deTrataTuNegocio || '—'}`,
    ``,
    `*2 · TU NEGOCIO*`,
    `Nombre: ${form.nombreNegocio || '—'}`,
    `Qué hace: ${form.quéHaces || '—'}`,
    `Para qué quiere el sitio: ${form.paraQueQuieresSitio.join(', ') || '—'}`,
    `Dónde atiende: ${form.dondeAtiendes || '—'}`,
    `Quién es: ${form.quienEres || '—'}`,
    `Cliente · Edad: ${form.clienteEdad.join(', ') || '—'}`,
    `Cliente · Género: ${form.clienteGenero.join(', ') || '—'}`,
    `Le importa: ${form.clienteLeImporta.join(', ') || '—'}`,
    ``,
    `*3 · REDES Y CONTENIDO*`,
    `Instagram: ${form.instagram || '—'}`,
    `Otra red: ${form.otraRed || '—'}`,
    `Correo público: ${form.correoMostrar || '—'}`,
    `Logo: ${form.tieneLogo || '—'}`,
    `Textos: ${form.textoListo || '—'}`,
    `Videos: ${form.tieneVideos || '—'}`,
    `Dominio: ${form.tieneDominio || '—'}`,
    `Fotos: ${form.tieneFotos || '—'}`,
    ``,
    `*4 · COLOR*`,
    `Color principal: ${form.colorBase.toUpperCase()}`,
    `Paleta: Fondo ${palette.fondo} · Principal ${palette.principal} · Acento ${palette.acento}`,
    ``,
    `*5 · QUÉ LE GUSTA*`,
    `Sitios de referencia: ${form.sitiosReferencia || '—'}`,
    `Estilo preferido: ${form.estiloPreferido.join(', ') || '—'}`,
    `Lo que NO quiere: ${form.loQueNoQuiere || '—'}`,
    ``,
    `*¿Cuándo quiere empezar?* ${form.cuandoEmpezar || '—'}`,
    `*Presupuesto:* ${form.presupuesto || '—'}`,
    `*Algo más:* ${form.algoMas || '—'}`,
  ]
  return encodeURIComponent(lines.join('\n'))
}

export default function Brief() {
  const [form, setForm] = useState({
    queTienes:'', queQuieres:'', deTrataTuNegocio:'',
    nombreNegocio:'', quéHaces:'', paraQueQuieresSitio:[],
    dondeAtiendes:'', quienEres:'',
    clienteEdad:[], clienteGenero:[], clienteLeImporta:[],
    instagram:'', otraRed:'', correoMostrar:'',
    tieneLogo:'', textoListo:'', tieneVideos:'', tieneDominio:'', tieneFotos:'',
    colorBase:'#b92d46',
    sitiosReferencia:'', estiloPreferido:[], loQueNoQuiere:'',
    cuandoEmpezar:'', presupuesto:'', algoMas:'',
  })

  const set = key => val => setForm(prev => ({...prev, [key]: val}))

  const infoDominio = () => {
    if (form.tieneDominio==='no-se') return 'El dominio es la dirección de tu sitio: www.tunegocio.cl. Se arrienda por año en nic.cl y cuesta cerca de $12.000 anuales. Queda a tu nombre, no al mío. Tranquila que te acompaño a comprarlo.'
    if (form.tieneDominio==='no') return 'No hay problema. Te ayudo a conseguir uno cuando empecemos.'
    return null
  }
  const infoFotos = () => {
    if (form.tieneFotos==='celular') return 'Perfecto. Las del celular funcionan bien si hay buena luz — mándamelas y te digo cuáles sirven y qué falta.'
    if (form.tieneFotos==='no') return 'Sin problema. Podemos usar imágenes de stock mientras consigues las tuyas.'
    if (form.tieneFotos==='si') return '¡Genial! Mándamelas cuando empecemos para revisarlas juntos.'
    return null
  }

  const handleEnviar = () => {
    const msg = buildWhatsAppMessage(form)
    window.open(`https://wa.me/56978757949?text=${msg}`, '_blank')
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', fontFamily:'var(--font-display)', padding:'6rem 0 6rem' }}>
      <div className="container" style={{ maxWidth:'680px' }}>

        <Link to="/" style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', letterSpacing:'0.1em', display:'inline-flex', alignItems:'center', gap:'0.4rem', marginBottom:'3rem' }}>← volver</Link>

        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--cyan)', opacity:0.75, display:'block', marginBottom:'1rem' }}>// wired_navi · ficha de proyecto</span>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.1, color:'var(--text)', marginBottom:'1.25rem' }}>
          No hago tu página.<br />
          <span style={{ color:'var(--cyan)', textShadow:'0 0 24px var(--cyan-glow)' }}>La creo contigo.</span>
        </h1>
        <p style={{ fontSize:'1rem', color:'var(--text-dim)', lineHeight:1.85, marginBottom:'3.5rem' }}>
          Contesta lo que sepas y salta lo que no — no hay respuestas malas, y lo que falte lo vemos conversando.
        </p>

        {/* S1 */}
        <SectionTitle number="1" title="En tus palabras" subtitle="Escribe sin apuro y como te salga. Esto es lo que más me sirve para que tu sitio no se parezca a ningún otro." />
        <TextArea label="1. ¿Qué tienes hoy?" hint="Lo que ya existe: tu local, tus redes, una página vieja, fotos, catálogo... o nada todavía." placeholder="Ej: Tengo un Instagram con 2.000 seguidores. Página nunca he tenido." value={form.queTienes} onChange={set('queTienes')} />
        <TextArea label="2. ¿Qué te gustaría tener?" hint="Cómo te imaginas tu sitio y qué quieres que pase cuando alguien entre." placeholder="Ej: Algo simple y elegante, donde se vean mis precios y la gente pueda contactarme sin escribirme por DM." value={form.queQuieres} onChange={set('queQuieres')} />
        <TextArea label="3. ¿De qué se trata tu negocio y qué quieres que sienta la gente?" hint="Cómo partió, qué te hace distinto, a quién quieres atraer." placeholder="Ej: Soy tatuadora hace 5 años, especializada en fineline." value={form.deTrataTuNegocio} onChange={set('deTrataTuNegocio')} />

        {/* S2 */}
        <SectionTitle number="2" title="Tu negocio" />
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0 1.5rem' }}>
          <TextInput label="¿Cómo se llama?" placeholder="Nombre de tu negocio" value={form.nombreNegocio} onChange={set('nombreNegocio')} half />
          <TextInput label="¿Qué haces?" hint="En una línea, como se lo dirías a un amigo." placeholder="Ej: vende café de especialidad" value={form.quéHaces} onChange={set('quéHaces')} half />
        </div>
        <Chips label="¿Para qué quieres el sitio?" hint="Lo más importante primero." options={['Que me escriban o me llamen','Vender por internet','Mostrar mis trabajos','Que me encuentren en Google','Que se vea serio y profesional','Explicar bien lo que hago']} selected={form.paraQueQuieresSitio} onChange={set('paraQueQuieresSitio')} />
        <TextInput label="¿Dónde atiendes?" placeholder="Ej: Santiago, todo Chile, online" value={form.dondeAtiendes} onChange={set('dondeAtiendes')} />
        <TextInput label="Cuéntame quién eres (opcional)" hint="Para la sección «Quién soy» de tu página." placeholder="Ej: Llevo 5 años en esto, partí desde mi casa..." value={form.quienEres} onChange={set('quienEres')} />
        <Chips label="¿Quién es tu cliente? · Edad" hint="Toca todo lo que calce." options={['18 a 30','30 a 45','45 a 60','60 y más','De todas']} selected={form.clienteEdad} onChange={set('clienteEdad')} />
        <Chips label="Sobre todo" options={['Mujeres','Hombres','Los dos por igual','Empresas']} selected={form.clienteGenero} onChange={set('clienteGenero')} />
        <Chips label="Lo que más le importa a tu cliente" options={['El precio','La calidad','Que sea rápido','La confianza','Que quede cerca','Que se vea bonito']} selected={form.clienteLeImporta} onChange={set('clienteLeImporta')} />

        {/* S3 */}
        <SectionTitle number="3" title="Tus redes y contenido" />
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0 1.5rem' }}>
          <TextInput label="Instagram" placeholder="@tunegocio" value={form.instagram} onChange={set('instagram')} half />
          <TextInput label="¿Otra red?" hint="LinkedIn, YouTube, Pinterest... la que uses." placeholder="youtube.com/@tunegocio" value={form.otraRed} onChange={set('otraRed')} half />
        </div>
        <TextInput label="Correo para mostrar en tu página" hint="El que verán tus clientes." placeholder="hola@tunegocio.cl" value={form.correoMostrar} onChange={set('correoMostrar')} />
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0 1.5rem' }}>
          <SelectInput label="¿Tienes logo?" options={[{value:'',label:'Selecciona...'},{value:'si',label:'Sí, tengo logo'},{value:'no',label:'No tengo'},{value:'en-proceso',label:'Lo estoy haciendo'}]} value={form.tieneLogo} onChange={set('tieneLogo')} half />
          <SelectInput label="¿Los textos los tienes escritos?" hint="Lo que va a decir cada sección." options={[{value:'',label:'Selecciona...'},{value:'si',label:'Sí, están listos'},{value:'idea',label:'Tengo una idea, hay que ordenarlos'},{value:'no',label:'No, necesito ayuda'}]} value={form.textoListo} onChange={set('textoListo')} half />
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0 1.5rem' }}>
          <SelectInput label="¿Tienes videos?" hint="De tu local, tus productos o tú hablando." options={[{value:'',label:'Selecciona...'},{value:'si',label:'Sí tengo'},{value:'puedo-grabar',label:'Puedo grabar algo'},{value:'no',label:'No, por ahora no'}]} value={form.tieneVideos} onChange={set('tieneVideos')} half />
          <SelectInput label="¿Ya tienes el dominio?" hint="La dirección: www.tunegocio.cl" options={[{value:'',label:'Selecciona...'},{value:'si',label:'Sí, ya lo tengo'},{value:'no',label:'No tengo'},{value:'no-se',label:'No sé qué es eso'}]} value={form.tieneDominio} onChange={set('tieneDominio')} half />
        </div>
        {infoDominio() && <InfoBox text={infoDominio()} />}
        <SelectInput label="¿Tienes fotos propias?" hint="De tu local, tu equipo o tus productos." options={[{value:'',label:'Selecciona...'},{value:'si',label:'Sí, tengo buenas fotos'},{value:'celular',label:'Algunas, del celular'},{value:'no',label:'No tengo fotos'}]} value={form.tieneFotos} onChange={set('tieneFotos')} />
        {infoFotos() && <InfoBox text={infoFotos()} />}

        {/* S4 */}
        <SectionTitle number="4" title="Tus colores" subtitle="Elige el color de tu marca. Si todavía no tienes uno, elige el que más te guste." />
        <ColorPicker color={form.colorBase} onChange={set('colorBase')} />

        {/* S5 */}
        <SectionTitle number="5" title="Qué te gusta" subtitle="Esta es la parte más importante. Decir «quiero algo moderno y elegante» no me sirve de nada. Tres enlaces sí." />
        <TextArea label="Sitios web que te gustan" hint="Pega los links directamente. No importa el rubro — lo que importa es cómo se ven o cómo se sienten." placeholder="https://ejemplo1.com&#10;https://ejemplo2.com&#10;https://ejemplo3.com" value={form.sitiosReferencia} onChange={set('sitiosReferencia')} />
        <Chips label="Estilo que te atrae" hint="Toca todo lo que calce." options={['Minimalista','Oscuro / dark','Colorido','Elegante / lujoso','Divertido / pop','Industrial / rústico','Moderno / tech','Natural / orgánico']} selected={form.estiloPreferido} onChange={set('estiloPreferido')} />
        <TextArea label="¿Qué NO quieres que tenga tu sitio?" hint="Colores, estilos, elementos que definitivamente no van contigo." placeholder="Ej: No quiero nada muy colorido ni infantil. Tampoco fuentes muy decorativas." value={form.loQueNoQuiere} onChange={set('loQueNoQuiere')} />

        {/* Cierre */}
        <SectionTitle number="6" title="Para cerrar" />
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0 1.5rem' }}>
          <SelectInput label="¿Cuándo quieres empezar?" options={[{value:'',label:'Selecciona...'},{value:'ahora',label:'Lo antes posible'},{value:'este-mes',label:'Este mes'},{value:'proximo-mes',label:'El próximo mes'},{value:'sin-apuro',label:'Sin apuro, estoy explorando'}]} value={form.cuandoEmpezar} onChange={set('cuandoEmpezar')} half />
          <SelectInput label="¿Tienes presupuesto en mente?" options={[{value:'',label:'Selecciona...'},{value:'landing',label:'Landing (~$120.000)'},{value:'sitio',label:'Sitio completo (~$280.000)'},{value:'fullstack',label:'Plataforma (desde $600.000)'},{value:'no-se',label:'No sé, quiero que me orientes'}]} value={form.presupuesto} onChange={set('presupuesto')} half />
        </div>
        <TextArea label="¿Algo más que quieras contarme?" hint="Cualquier cosa que no cupiera en las preguntas anteriores." placeholder="Ej: Tengo una fecha límite para el lanzamiento, o tengo dudas sobre..." value={form.algoMas} onChange={set('algoMas')} />

        {/* Botón enviar */}
        <div style={{ marginTop:'2rem', padding:'2rem', background:'rgba(0,229,255,0.04)', border:'1px solid var(--cyan-border)', borderRadius:'var(--radius-md)', textAlign:'center' }}>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'var(--text)', marginBottom:'0.5rem' }}>¿Todo listo?</p>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', marginBottom:'1.5rem', lineHeight:1.6 }}>
            Al tocar el botón se abre WhatsApp con toda tu información lista. Yo la reviso y te respondo en menos de 24 horas.
          </p>
          <button onClick={handleEnviar} className="btn btn-primary" style={{ padding:'1rem 2.5rem', fontSize:'0.85rem', width:'100%', justifyContent:'center' }}>
            enviar ficha por WhatsApp →
          </button>
        </div>

      </div>
    </div>
  )
}