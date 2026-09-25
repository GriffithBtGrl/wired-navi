// Method.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const glass = {
  background: 'rgba(15, 15, 21, 0.55)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

const points = [
  { number: '01', title: 'Sin reuniones innecesarias.', body: 'Me cuentas tu proyecto por WhatsApp o email. Te envío un formulario breve para entender tu negocio y lo que necesitas. Solo agendamos una llamada si tú la necesitas.' },
  { number: '02', title: 'Sin plantillas, sin genérico.', body: 'Cada sitio parte de tu identidad real. No copio estructuras de otros — construyo algo tuyo desde cero.' },
  { number: '03', title: 'Sin mensualidades ni amarres.', body: 'Pagas una vez. El dominio, el código y el contenido quedan a tu nombre. Sin comisiones ni letra chica.' },
  { number: '04', title: 'No necesitas saber nada de código.', body: 'Solo contarme qué necesitas. Del resto me encargo yo — diseño, desarrollo, publicación y configuración incluidos.' },
]

export default function Method() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="metodo" ref={ref} style={{ padding: 'clamp(5rem, 10vw, 9rem) 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '640px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <span className="section-tag">método</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '1.25rem' }}>
            Simple, directo{' '}
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 24px var(--cyan-glow)' }}>y sin vueltas.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.85, maxWidth: '50ch' }}>
            No necesitas saber nada de desarrollo web para trabajar conmigo. Solo contarme qué necesitas — del resto me encargo yo.
          </p>
        </motion.div>

        <div className="method-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {points.map((point, i) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', ...glass }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--cyan)', opacity: 0.6, letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>{point.number}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.6rem', lineHeight: 1.3 }}>{point.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}