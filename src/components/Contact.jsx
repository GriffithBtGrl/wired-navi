// Contact.jsx — Con glass effect.
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EMAIL         = 'service.wired.navi@outlook.com'
const EMAIL_SUBJECT = 'Consulta desde Wired Navi'
const EMAIL_BODY    = 'Hola Catalina, me interesa cotizar un proyecto. Te cuento brevemente lo que necesito:'
const WHATSAPP_DISPLAY = '+56 9 7875 7949'
const WHATSAPP_NUMBER  = '56978757949'
const WHATSAPP_MSG     = 'Hola Catalina, vi tu portafolio y me interesa cotizar un proyecto.'

const glass = {
  background: 'rgba(15, 15, 21, 0.55)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

const channels = [
  {
    icon: '✉', label: 'email', value: EMAIL,
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}&subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`,
    external: true,
  },
  {
    icon: '💬', label: 'whatsapp', value: WHATSAPP_DISPLAY,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`,
    external: true,
  },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contacto" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 9rem) 0',
      borderTop: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{ maxWidth: '600px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag">contacto</span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
              fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08,
              color: 'var(--text)', marginBottom: '1.1rem',
            }}>
              ¿Tienes una visión?<br />
              <span style={{ color: 'var(--cyan)', textShadow: '0 0 28px var(--cyan-glow)' }}>Hagámosla real.</span>
            </h2>
            <p style={{ fontSize: '0.97rem', color: 'var(--text-dim)', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '46ch' }}>
              Cuéntame qué necesitas. Respondo en menos de 24 horas y agendamos una reunión.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
          >
            {channels.map(ch => <ContactRow key={ch.label} {...ch} />)}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            <span style={{
              display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
              background: 'rgb(34, 197, 94)', boxShadow: 'rgb(34, 197, 94) 0px 0px 8px',
            }} />
            disponible para nuevos proyectos
          </motion.p>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(4rem, 8vw, 7rem)', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text)' }}>wired</span>
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 10px var(--cyan-glow)' }}>_navi</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} · diseñado y construido a mano por Catalina Ossandón
          </span>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon, label, value, href, external }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem',
        border: `1px solid ${hovered ? 'var(--cyan-border)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)', transition: 'all var(--transition)',
        boxShadow: hovered ? '0 0 20px var(--cyan-glow)' : 'none', color: 'inherit',
        ...glass,
        background: hovered ? 'rgba(0,229,255,0.08)' : 'rgba(15, 15, 21, 0.55)',
      }}
    >
      <span style={{ fontSize: '1rem', opacity: 0.7 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>{label}</div>
        <div style={{ fontSize: '0.9rem', color: hovered ? 'var(--cyan)' : 'var(--text)', transition: 'color var(--transition)', textShadow: hovered ? '0 0 14px var(--cyan-glow)' : 'none' }}>{value}</div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: hovered ? 'var(--cyan)' : 'var(--text-muted)', transition: 'color var(--transition)' }}>→</span>
    </a>
  )
}