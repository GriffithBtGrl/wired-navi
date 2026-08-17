// Navbar.jsx — Logo Wired Navi + navegación con línea de acento neon.
import { useState, useEffect } from 'react'

const links = [
  { label: 'proyectos', href: '#proyectos' },
  { label: 'sobre mí', href: '#sobre-mi' },
  { label: 'contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú mobile automáticamente si la pantalla vuelve a ser grande
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 640) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '1.1rem 0',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      background: scrolled || menuOpen ? 'rgba(7,7,9,0.9)' : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
      transition: 'var(--transition)',
    }}>

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem' }} onClick={closeMenu}>
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
        <a href="#contacto" className="btn btn-primary desktop-nav" style={{
          padding: '0.5rem 1.1rem',
          fontSize: '0.68rem',
        }}>
          {'> hablemos'}
        </a>


        {/* Botón burger — solo mobile */}
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.4rem',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{
            width: '22px', height: '2px',
            background: 'var(--cyan)',
            transition: 'transform var(--transition), opacity var(--transition)',
            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            width: '22px', height: '2px',
            background: 'var(--cyan)',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity var(--transition)',
          }} />
          <span style={{
            width: '22px', height: '2px',
            background: 'var(--cyan)',
            transition: 'transform var(--transition), opacity var(--transition)',
            transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </div>

      {/* Menú desplegable mobile */}
      {menuOpen && (
        <nav className="mobile-nav" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '2rem 0',
          borderTop: '1px solid var(--border)',
        }}>
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            className="btn btn-primary"
            onClick={closeMenu}
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.7rem' }}
          >
            {'> hablemos'}
          </a>
        </nav>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}