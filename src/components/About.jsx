import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  'React', 'Node.js', 'JavaScript', 'PostgreSQL', 'Express',
  'REST APIs', 'Git', 'Responsive Design',
]

// Datos
const stats = [
  { value: '2+', label: 'años desarrollando' },
  { value: '100%', label: 'proyectos entregados' },
  { value: 'fullstack', label: 'desarrollo completo' },
  { value: 'clean', label: 'código mantenible' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre-mi" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 9rem) 0',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 7vw, 7rem)',
          alignItems: 'start',
        }}>

          {/* Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag">sobre mí</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}>
              Código que resuelve,{' '}
              <span style={{
                color: 'var(--cyan)',
                textShadow: '0 0 20px var(--cyan-glow)',
              }}>
                diseño que potencia.
              </span>
            </h2>

            {/* ✏️ REEMPLAZA con tu historia real */}
            <p style={{
              fontSize: '0.97rem',
              color: 'var(--text-dim)',
              lineHeight: 1.9,
              marginBottom: '1.1rem',
            }}>
              Soy Catalina, desarrolladora fullstack independiente.
              Diseño y construyo sitios web y aplicaciones pensadas no solo para verse bien, sino para funcionar de verdad: rápidas, escalables y alineadas con objetivos de negocio.
            </p>
            <p style={{
              fontSize: '0.97rem',
              color: 'var(--text-dim)',
              lineHeight: 1.9,
              marginBottom: '2rem',
            }}>
              Trabajo con marcas creativas y también con empresas que necesitan algo más que una web básica — desde presencia digital sólida hasta sistemas internos con autenticación, bases de datos y lógica personalizada.
              Cada proyecto se construye desde cero, con foco en rendimiento, claridad y conversión.
            </p>

            <a href="#contacto" className="btn btn-primary">cotizar proyecto</a>
          </motion.div>

          {/* Columna derecha */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {/* Stack */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '1.1rem',
              }}>
                {'// stack & herramientas'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-dim)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '2px',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}>
              {stats.map(({ value, label }) => (
                <div key={label} style={{
                  padding: '1.25rem',
                  background: 'var(--bg-card)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--cyan)',
                    textShadow: '0 0 14px var(--cyan-glow)',
                    marginBottom: '0.25rem',
                  }}>{value}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}