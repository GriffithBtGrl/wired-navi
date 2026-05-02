// Navbar.jsx — Logo Wired Navi + navegación con línea de acento neon.
import { useState, useEffect } from 'react'

const links = [
  { label: 'proyectos', href: '#proyectos' },
  { label: 'sobre mí',  href: '#sobre-mi'  },
  { label: 'contacto',  href: '#contacto'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '1.1rem 0',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      background: scrolled ? 'rgba(7,7,9,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'var(--transition)',
    }}>
      
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}>
            wired
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--cyan)',
            letterSpacing: '-0.01em',
            textShadow: '0 0 12px var(--cyan-glow)',
          }}>
            _navi
          </span>
        </a>

        {/* Links */}
        <nav style={{ display: 'flex', gap: '2.5rem' }} className="desktop-nav">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                transition: 'color var(--transition)',
                position: 'relative',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contacto" className="btn btn-primary" style={{
          padding: '0.5rem 1.1rem',
          fontSize: '0.68rem',
        }}>
          {'> hablemos'}
        </a>
      </div>

      <style>{`
        @media (max-width: 640px) { .desktop-nav { display: none; } }
      `}</style>
    </header>
  )
}