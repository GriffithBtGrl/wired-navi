// WhyItMatters.jsx 
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const glass = { background: 'rgba(15, 15, 21, 0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)' }

const points = [
  { number: '01', title: 'Tu cliente te busca en Google antes de escribirte.', body: 'Si no encuentra nada, o encuentra algo descuidado, ya perdiste. Una web bien hecha responde sus dudas antes de que te las pregunten.' },
  { number: '02', title: 'Deja de responder lo mismo por DM.', body: 'Precios, horarios, servicios, cómo agendar — todo eso puede estar en tu web. Tú te enfocas en tu trabajo, no en el chat.' },
  { number: '03', title: 'Un negocio con web propia se ve más serio.', body: 'No porque Instagram esté mal, sino porque tener tu propio espacio digital dice que estás comprometido con lo que haces.' },
]

export default function WhyItMatters() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: 'clamp(5rem, 10vw, 9rem) 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ maxWidth: '680px', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <span className="section-tag">¿por qué importa?</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '1.25rem' }}>
            El 75% de las personas busca<br />
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 24px var(--cyan-glow)' }}>en Google antes de escribirte.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.85, maxWidth: '52ch' }}>
            No importa si tienes 5.000 seguidores en Instagram. Si no tienen dónde encontrar tu información clara y rápido, te comparan con el siguiente resultado y ya.
          </p>
        </motion.div>

        {/* Puntos — sin className porque auto-fit ya es responsive */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {points.map((point, i) => (
            <motion.div key={point.number} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }} style={{ padding: '2rem', ...glass }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cyan)', opacity: 0.6, letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>{point.number}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: '0.75rem' }}>{point.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>{point.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Antes / Después */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
          className="before-after-grid"
          style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
        >
          <BeforeAfterCol label="sin web propia" color="var(--text-muted)" items={['Solo Instagram como presencia digital', 'Precios que hay que preguntar por DM', 'Difícil de encontrar en Google', 'Se ve igual a cualquier otro', 'Pierdes clientes sin darte cuenta']} />
          <BeforeAfterCol label="con tu web" color="var(--cyan)" glow items={['Presencia propia con dominio tuyo', 'Servicios, precios y contacto claros', 'Apareces cuando te buscan', 'Una identidad que te diferencia', 'El cliente llega listo para contratar']} />
        </motion.div>
      </div>
    </section>
  )
}

function BeforeAfterCol({ label, color, glow, items }) {
  return (
    <div style={{ padding: '1.75rem', ...glass }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color, textShadow: glow ? '0 0 12px var(--cyan-glow)' : 'none', marginBottom: '1.25rem' }}>// {label}</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {items.map(item => (
          <li key={item} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
            <span style={{ color, opacity: glow ? 1 : 0.4, flexShrink: 0 }}>{glow ? '✓' : '×'}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}