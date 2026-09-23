// Pricing.jsx — Cards de inversión con precio de lanzamiento tachado.
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const plans = [
  {
    id: 'landing',
    name: 'Landing',
    tagline: 'Para negocios que quieren empezar con el pie derecho.',
    priceOld: '$200.000',
    price: '$120.000',
    period: 'CLP · pago único',
    includes: [
      '1 página a medida',
      'Diseño responsive (mobile first)',
      'Formulario o botón de WhatsApp',
      'SEO base instalado',
      'Dominio configurado',
      '1 ronda de revisiones',
    ],
    notIncludes: null,
    cta: 'Quiero mi landing',
    highlight: false,
    deliveryDays: '5 a 7 días',
  },
  {
    id: 'completo',
    name: 'Sitio completo',
    tagline: 'El más elegido. Para marcas que tienen más que mostrar.',
    priceOld: '$400.000',
    price: '$280.000',
    period: 'CLP · pago único',
    includes: [
      'Hasta 4 páginas a medida',
      'Diseño responsive (mobile first)',
      'Formulario de contacto',
      'SEO base instalado',
      'Dominio configurado',
      'Galería o sección de proyectos',
      '2 rondas de revisiones',
    ],
    notIncludes: null,
    cta: 'Quiero mi sitio',
    highlight: true,
    deliveryDays: '10 a 15 días',
  },
  {
    id: 'fullstack',
    name: 'Fullstack / Sistema',
    tagline: 'Plataformas con backend, base de datos y panel de administración.',
    priceOld: '$900.000',
    price: 'desde $600.000',
    period: 'CLP · cotización personalizada',
    includes: [
      'Plataforma web completa',
      'Backend con Node.js + Express',
      'Base de datos PostgreSQL',
      'Panel de administración',
      'Autenticación de usuarios',
      'API REST documentada',
      'Rondas de revisión según proyecto',
    ],
    notIncludes: null,
    cta: 'Cotizar proyecto',
    highlight: false,
    deliveryDays: 'A convenir',
  },
]

const WHATSAPP = '56978757949'

export default function Pricing() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="inversion" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 9rem) 0',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '640px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <span className="section-tag">inversión</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text)',
            marginBottom: '1.25rem',
          }}>
            Precios claros,{' '}
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 24px var(--cyan-glow)' }}>
              sin letra chica.
            </span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-dim)',
            lineHeight: 1.85,
            maxWidth: '50ch',
          }}>
            Pago único, sin mensualidades ni comisiones.
            El sitio queda a tu nombre — sin amarres.
          </p>

          {/* Badge precio lanzamiento */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '0.4rem 0.9rem',
            background: 'var(--magenta-dim)',
            border: '1px solid var(--magenta-glow)',
            borderRadius: '2px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: 'var(--magenta)',
          }}>
            <span style={{
              width: '5px', height: '5px',
              borderRadius: '50%',
              background: 'var(--magenta)',
              boxShadow: '0 0 6px var(--magenta-glow)',
              display: 'inline-block',
            }} />
            precios de lanzamiento — por tiempo limitado
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.25rem',
          alignItems: 'start',
        }}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} inView={inView} whatsapp={WHATSAPP} />
          ))}
        </div>

        {/* Lo que siempre incluyen los tres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: '1.25rem',
            padding: '1.75rem 2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '1.25rem',
          }}>
            // los tres planes siempre incluyen
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem 2rem',
          }}>
            {[
              'Diseño a medida, sin plantillas',
              'Mobile first',
              'Código limpio y mantenible',
              'Publicación incluida',
              'Sin mensualidades',
              'El dominio queda a tu nombre',
            ].map(item => (
              <span key={item} style={{
                fontSize: '0.88rem',
                color: 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ color: 'var(--cyan)', fontSize: '0.75rem' }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function PlanCard({ plan, index, inView, whatsapp }) {
  const [hovered, setHovered] = useState(false)
  const msg = encodeURIComponent(`Hola Catalina, me interesa el plan ${plan.name}. Te cuento mi proyecto:`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: plan.highlight ? 'var(--bg-card)' : 'var(--bg-card)',
        border: `1px solid ${plan.highlight ? 'var(--cyan-border)' : hovered ? 'var(--cyan-border)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        position: 'relative',
        transition: 'border-color var(--transition), box-shadow var(--transition)',
        boxShadow: plan.highlight
          ? '0 0 28px var(--cyan-glow)'
          : hovered ? '0 0 20px var(--cyan-glow)' : 'none',
      }}
    >
      {/* Badge "más elegido" */}
      {plan.highlight && (
        <div style={{
          position: 'absolute',
          top: '-1px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--bg)',
          background: 'var(--cyan)',
          padding: '0.2rem 0.75rem',
          borderRadius: '0 0 4px 4px',
        }}>
          más elegido
        </div>
      )}

      {/* Nombre del plan */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--cyan)',
        marginBottom: '0.5rem',
        marginTop: plan.highlight ? '0.75rem' : '0',
      }}>
        {plan.name}
      </p>

      <p style={{
        fontSize: '0.88rem',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        marginBottom: '1.5rem',
        minHeight: '2.8rem',
      }}>
        {plan.tagline}
      </p>

      {/* Precio */}
      <div style={{ marginBottom: '1.75rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          textDecoration: 'line-through',
          display: 'block',
          marginBottom: '0.2rem',
          opacity: 0.6,
        }}>
          {plan.priceOld}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          {plan.price}
        </span>
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--text-muted)',
          marginTop: '0.35rem',
          letterSpacing: '0.05em',
        }}>
          {plan.period}
        </span>
      </div>

      {/* Entrega */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱</span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.04em',
        }}>
          Entrega en {plan.deliveryDays}
        </span>
      </div>

      {/* Lista de incluidos */}
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.55rem',
        marginBottom: '2rem',
      }}>
        {plan.includes.map(item => (
          <li key={item} style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'flex',
            gap: '0.6rem',
            alignItems: 'flex-start',
            lineHeight: 1.5,
          }}>
            <span style={{ color: 'var(--cyan)', flexShrink: 0, fontSize: '0.75rem', marginTop: '0.1rem' }}>✓</span>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`https://wa.me/${whatsapp}?text=${msg}`}
        target="_blank"
        rel="noreferrer"
        className={plan.highlight ? 'btn btn-primary' : 'btn btn-ghost'}
        style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
      >
        {plan.cta} →
      </a>
    </motion.div>
  )
}