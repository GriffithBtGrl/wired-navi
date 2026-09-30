// Hero.jsx 
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '5-7 días', label: 'entrega estimada' },
  { value: 'Cero', label: 'mensualidades' },
  { value: '100%', label: 'tuyo — código y dominio' },
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="section-tag" style={{ marginBottom: '1.5rem' }}>Desarrollo web · Chile</span>
        </motion.div>

        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '1.5rem', textTransform: 'uppercase' }}
            >
              Tu marca merece una web tan{' '}
              <span style={{ color: 'var(--cyan)', textShadow: '0 0 32px var(--cyan-glow)' }}>única</span>{' '}
              como lo que ofreces.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.85, maxWidth: '46ch', marginBottom: '2.5rem', fontWeight: 300 }}
            >
              Diseño y desarrollo sitios web a medida para negocios y marcas con identidad propia. Sin plantillas. Tu cliente te busca en Google antes de escribirte — que encuentre algo que dé confianza.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a href="#inversion" className="btn btn-primary">ver precios →</a>
              <a href="#proyectos" className="btn btn-ghost">ver proyectos</a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <GlowOrb />
          </motion.div>
        </div>

        {/* className="hero-stats" para responsive */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hero-stats"
          style={{ display: 'flex', marginTop: 'clamp(3rem, 6vw, 5rem)', marginBottom: 'clamp(1rem, 2vw, 5rem)', borderTop: '1px solid var(--border)', paddingTop: '2rem', flexWrap: 'wrap' }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1,
              minWidth: '120px',
              paddingRight: i < stats.length - 1 ? '2rem' : '0',
              paddingLeft: i > 0 ? '2rem' : '0',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.3rem' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// GlowOrb 
function GlowOrb() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let mouse = { x: 0, y: 0 } // posición del cursor relativa al canvas
    let smoothMouse = { x: 0, y: 0 } // posición suavizada con lerp

    // ── Redimensionar canvas al tamaño real del elemento ──
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Seguimiento del cursor ──
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', onMouseMove)

    // ── Generar partículas distribuidas en una esfera ──
    const COUNT = 160
    const particles = Array.from({ length: COUNT }, (_, i) => {
      // Distribución uniforme en superficie esférica (método de Fibonacci)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      return {
        phi,
        theta,
        speed: 0.0015 + Math.random() * 0.002, // velocidad de rotación
        bright: Math.random() > 0.85,            // 15% de partículas más brillantes
      }
    })

    let frame = 0

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const r = Math.min(width, height) * 0.50

      // Lerp — interpola suavemente hacia la posición real del cursor
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05

      // Leve inclinación del orbe basada en posición del cursor
      const tiltX = smoothMouse.x ? (smoothMouse.x - cx) / cx * 0.2 : 0
      const tiltY = smoothMouse.y ? (smoothMouse.y - cy) / cy * 0.2 : 0


      // ── Calcular posición 3D de cada partícula ──
      const projected = particles.map((p, i) => {
        const theta = p.theta + frame * p.speed
        const phi = p.phi

        // Coordenadas esféricas → cartesianas con tilt del cursor
        const x3 = Math.sin(phi) * Math.cos(theta)
        const y3 = Math.sin(phi) * Math.sin(theta) + tiltX
        const z3 = Math.cos(phi) + tiltY

        // Proyección 2D
        const scale = (z3 + 2) / 3
        const px = cx + r * x3 * scale
        const py = cy + r * y3 * scale * 0.85 // ligera compresión vertical

        // Profundidad para opacidad y tamaño
        const depth = (z3 + 1) / 2

        return { px, py, depth, bright: p.bright, x3, y3, z3, scale }
      })

      // ── Dibujar líneas de conexión entre partículas cercanas ──
      const CONNECTION_DIST = r * 0.55
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]
          const dx = a.px - b.px
          const dy = a.py - b.py
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            // Opacidad inversamente proporcional a la distancia
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12 * ((a.depth + b.depth) / 2)
            ctx.beginPath()
            ctx.moveTo(a.px, a.py)
            ctx.lineTo(b.px, b.py)
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // ── Dibujar partículas ──
      projected.forEach(({ px, py, depth, bright }) => {
        const size = bright ? 2.2 + depth * 1.8 : 0.8 + depth * 1.4
        const alpha = bright ? 0.5 + depth * 0.5 : 0.1 + depth * 0.45

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`
        ctx.fill()

        // Glow extra en partículas brillantes
        if (bright && depth > 0.6) {
          ctx.beginPath()
          ctx.arc(px, py, size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.15})`
          ctx.fill()
        }
      })

      // ── Glow central suave ──
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.7)
      grad.addColorStop(0, 'rgba(0, 229, 255, 0.03)')
      grad.addColorStop(1, 'rgba(0, 229, 255, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', maxWidth: '620px', aspectRatio: '1/1', display: 'block' }}
    />
  )
}