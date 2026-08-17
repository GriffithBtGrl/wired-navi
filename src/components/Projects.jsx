// Projects.jsx — Cards con borde neon en hover y etiquetas de stack.
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import richardImg from '../assets/httpsrichardpereznetlifyapp.jpeg'
import weltschmerzImg from '../assets/weltschmerz.jpg'
import matcargoImg from '../assets/matcargo.jpg'

const projects = [
  {
    id: 1,
    title: 'Matcargo — Plataforma logística para empresa de transportes',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Vite'],
    problem: 'La empresa necesitaba digitalizar su operación logística y tener visibilidad en tiempo real sobre sus envíos y clientes.',
    solution: 'Plataforma web fullstack con panel de administración, gestión de envíos y sistema de seguimiento. Actualmente en desarrollo.',
    image: matcargoImg,
    demo: 'https://matcargo.vercel.app/',
    code: null, // Proyecto privado de cliente
    year: '2025',
    badge: 'en desarrollo', // Quitar cuando esté lista
  },
  {
    id: 2,
    title: 'Sistema de captación de clientes para entrenador personal',
    tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    problem: 'El negocio no contaba con una estructura digital clara para captar clientes, lo que generaba pérdida constante de oportunidades y baja conversión.',
    solution: 'Página optimizada para captación de clientes, con estructura enfocada en conversión, integración de contacto directo y mejora del flujo de decisión del usuario.',
    image: richardImg,
    demo: 'https://richardperez.netlify.app/',
    code: 'https://github.com/GriffithBtGrl/richard-perez-preparador-fisico',
    year: '2025',
  },
  {
    id: 3,
    title: 'Weltschmerz — Foro anónimo dark cyberpunk',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    problem: 'Proyecto personal para explorar el desarrollo fullstack con una identidad visual fuerte y funcionalidades de comunidad anónima.',
    solution: 'Plataforma web con autenticación, publicaciones, sistema de respuestas y estética cyberpunk oscura construida de cero como proyecto de portafolio.',
    image: weltschmerzImg,
    demo: 'https://weltschmerz-s2ar.vercel.app/',
    code: 'https://github.com/GriffithBtGrl/weltschmerz',
    year: '2025',
  },
]

function GridPlaceholder() {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '16/9',
      background: 'var(--bg-surface)',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: 'var(--cyan)',
        boxShadow: '0 0 16px var(--cyan-glow)',
        opacity: 0.5,
      }} />
      <span style={{
        position: 'absolute',
        bottom: '1rem', right: '1rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
      }}>mockup / próximamente</span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--cyan-border)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        transition: 'border-color var(--transition), box-shadow var(--transition), transform var(--transition)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 0 32px var(--cyan-glow)' : 'none',
        position: 'relative',
      }}
    >
      {/* Badge "en desarrollo" si aplica */}
      {project.badge && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--magenta)',
          background: 'var(--magenta-dim)',
          border: '1px solid var(--magenta-glow)',
          padding: '0.25rem 0.6rem',
          borderRadius: '2px',
        }}>
          {project.badge}
        </div>
      )}

      {project.image
        ? <img src={project.image} alt={project.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
        : <GridPlaceholder />
      }

      <div style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.08em',
                color: 'var(--cyan)',
                background: 'var(--cyan-dim)',
                border: '1px solid rgba(0,229,255,0.12)',
                padding: '0.2rem 0.55rem',
                borderRadius: '2px',
              }}>{tag}</span>
            ))}
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
          }}>{project.year}</span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--text)',
          marginBottom: '0.9rem',
        }}>{project.title}</h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '0.6rem' }}>
          <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>problema — </span>
          {project.problem}
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>solución — </span>
          {project.solution}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.68rem' }}
          >
            ver proyecto
          </a>
          {/* Solo muestra "ver código" si hay link */}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ padding: '0.55rem 1rem', fontSize: '0.68rem' }}
            >
              ver código
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="proyectos" style={{
      padding: 'clamp(5rem, 10vw, 9rem) 0',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          <span className="section-tag">proyectos seleccionados</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text)',
          }}>
            Trabajo real,<br />
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 22px var(--cyan-glow)' }}>
              resultados concretos.
            </span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))',
          gap: '1.25rem',
        }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}