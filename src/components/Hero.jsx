import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1], delay: d },
  }),
}

const capabilities = [
  'sitios rápidos',
  'SEO técnico',
  'dashboards internos',
  'autenticación segura',
  'automatización de procesos',
  'sistemas a medida',
]

export default function Hero() {
  return (
    <section id="inicio" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container">

        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <span className="section-tag">Freelance · Fullstack Dev</span>
        </motion.div>

        <motion.h1
          initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: 'var(--text)',
            maxWidth: '18ch',
            marginBottom: '1.5rem',
          }}
        >
          Webs que{' '}
          <span style={{
            color: 'var(--cyan)',
            textShadow: '0 0 28px var(--cyan-glow)',
            fontStyle: 'italic',
          }}>
            no solo se ven distintas
          </span>{' '}
          — funcionan distinto.
        </motion.h1>

        <motion.p
          initial="hidden" animate="visible" custom={0.2} variants={fadeUp}
          style={{
            fontSize: '1rem',
            color: 'var(--text-dim)',
            maxWidth: '55ch',
            lineHeight: 1.8,
            marginBottom: '0.85rem',
            fontWeight: 300,
          }}
        >
          Desarrollo sitios web y plataformas a medida con{' '}
          <CapabilityRotator items={capabilities} />
          {' '}para marcas y empresas que necesitan más que presencia: velocidad, conversión y sistemas que escalen.
        </motion.p>

        <motion.p
          initial="hidden" animate="visible" custom={0.25} variants={fadeUp}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
            letterSpacing: '0.05em',
          }}
        >
          {'// React · Node · APIs · JWT · DB · Arquitectura limpia'}
        </motion.p>

        <motion.div
          initial="hidden" animate="visible" custom={0.3} variants={fadeUp}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <a href="#proyectos" className="btn btn-primary">ver proyectos →</a>
          <a href="#contacto" className="btn btn-ghost">cotiza tu web</a>
        </motion.div>

      </div>
    </section>
  )
}

function CapabilityRotator({ items }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % items.length)
        setVisible(true)
      }, 300)
    }, 2200)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <span style={{
      marginLeft: '0.5rem',
      color: 'var(--cyan)',
      textShadow: '0 0 18px var(--cyan-glow)',
      fontWeight: 500,
      display: 'inline-block',
      transition: 'opacity 0.3s ease',
      opacity: visible ? 1 : 0,
      minWidth: '200px',
    }}>
      {items[index]}
    </span>
  )
}