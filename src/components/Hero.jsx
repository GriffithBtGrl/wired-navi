// Hero.jsx — Layout dos columnas. Título impactante + orbe animado a la derecha.
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '5-7 días', label: 'entrega estimada' },
  { value: 'Cero',     label: 'mensualidades' },
  { value: '100%',     label: 'tuyo — código y dominio' },
]

export default function Hero() {
  return (
    <section id="inicio" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Grilla de fondo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Tag superior */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" style={{ marginBottom: '1.5rem' }}>
            Desarrollo web · Chile
          </span>
        </motion.div>

        {/* Layout dos columnas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
        className="hero-grid"
        >
          {/* Columna izquierda */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: 'var(--text)',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              Tu marca merece una web tan{' '}
              <span style={{
                color: 'var(--cyan)',
                textShadow: '0 0 32px var(--cyan-glow)',
              }}>
                única
              </span>{' '}
              como lo que ofreces.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: '1rem',
                color: 'var(--text-dim)',
                lineHeight: 1.85,
                maxWidth: '46ch',
                marginBottom: '2.5rem',
                fontWeight: 300,
              }}
            >
              Diseño y desarrollo sitios web a medida para negocios y marcas
              con identidad propia. Sin plantillas. Tu cliente te busca en Google
              antes de escribirte — que encuentre algo que dé confianza.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a href="#inversion" className="btn btn-primary">ver precios →</a>
              <a href="#proyectos" className="btn btn-ghost">ver proyectos</a>
            </motion.div>
          </div>

          {/* Columna derecha — orbe animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <GlowOrb />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            marginBottom: 'clamp(1rem, 2vw, 5rem)',
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            flexWrap: 'wrap',
            gap: '0',
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1,
              minWidth: '140px',
              paddingRight: i < stats.length - 1 ? '2rem' : '0',
              paddingLeft: i > 0 ? '2rem' : '0',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 800,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '0.3rem',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}

// Orbe de partículas animado con canvas — placeholder hasta agregar Three.js
function GlowOrb() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let frame    = 0
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const r  = Math.min(width, height) * 0.42

      // Partículas orbitando
      const count = 120
      for (let i = 0; i < count; i++) {
        const t     = (i / count) * Math.PI * 2
        const speed = 0.004 + (i % 5) * 0.001
        const angle = t + frame * speed
        const tilt  = (i / count) * Math.PI

        const x = cx + r * Math.sin(angle) * Math.sin(tilt)
        const y = cy + r * Math.cos(tilt) * 0.6 + r * Math.cos(angle) * Math.sin(tilt) * 0.3

        const depth = (Math.sin(angle) * Math.sin(tilt) + 1) / 2
        const size  = 0.8 + depth * 1.8
        const alpha = 0.15 + depth * 0.55

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`
        ctx.fill()
      }

      // Glow central suave
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.8)
      grad.addColorStop(0, 'rgba(0, 229, 255, 0.04)')
      grad.addColorStop(1, 'rgba(0, 229, 255, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        maxWidth: '620px',
        aspectRatio: '1/1',
        display: 'block',
      }}
    />
  )
}