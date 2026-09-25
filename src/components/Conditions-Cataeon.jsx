// Conditions.jsx — classNames para mobile
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FORM_LINK = '#' // Link al formulario de contacto
const glass = { background: 'rgba(15, 15, 21, 0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }

const conditions = [
  { title: 'Forma de pago', body: '50% al comenzar y 50% cuando apruebas el sitio terminado.' },
  { title: 'No incluye', body: 'Dominio, alojamiento, aplicaciones de pago, complementos premium ni suscripciones de terceros.' },
  { title: 'Contenido', body: 'Tú puedes entregar textos, fotos y logo. Si prefieres que te ayude a crearlos, se cotiza aparte.' },
  { title: 'Qué es una ronda de revisiones', body: 'Revisas el sitio completo y me mandas todos tus cambios juntos en una lista. Los aplico y te lo entrego de nuevo. Eso es una ronda. Cambiar textos, colores, fotos y orden de secciones entra sin problema — rehacer el diseño desde cero o agregar páginas nuevas se cotiza aparte.' },
]

export default function Conditions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: '0 0 clamp(5rem, 10vw, 9rem) 0' }}>
      <div className="container">

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="conditions-cta"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', ...glass }}
        >
          <div style={{ maxWidth: '52ch' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', lineHeight: 1.3 }}>¿Listo para empezar?</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
              Cuéntame tu proyecto en una ficha breve — tu marca, lo que necesitas y sitios que te gustan. Con eso te cotizo en serio y arrancamos sin dar vueltas.
            </p>
          </div>
          <a href={FORM_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>llenar la ficha →</a>
        </motion.div>

        {/* Tablero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="conditions-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
        >
          {conditions.map((c) => (
            <div key={c.title} style={{ padding: '1.75rem', ...glass }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--cyan)', opacity: 0.7, marginBottom: '0.75rem' }}>{c.title}</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{c.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}