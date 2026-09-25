// Navbar.jsx.
import { useState, useEffect } from 'react'

const FORM_LINK = '#'

const links = [
  { label: 'método', href: '#metodo' },
  { label: 'proyectos', href: '#proyectos' },
  { label: 'precios', href: '#inversion' },
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

  // Cerrar menú al hacer click en un link
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.1rem 0',
        borderBottom: scrolled || menuOpen ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled || menuOpen ? 'rgba(7,7,9,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        transition: 'var(--transition)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem', zIndex: 101 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>wired</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: 'var(--cyan)', textShadow: '0 0 12px var(--cyan-glow)' }}>_navi</span>
          </a>

          {/* Links — desktop */}
          <nav style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', transition: 'color var(--transition)' }}
                onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Derecha: CTA desktop + burger mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href={FORM_LINK} target="_blank" rel="noreferrer" className="btn btn-primary desktop-cta" style={{ padding: '0.5rem 1.1rem', fontSize: '0.68rem' }}>
              {'> cotizar'}
            </a>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="burger-btn"
              style={{
                background: 'none', border: 'none', padding: '0.25rem',
                display: 'flex', flexDirection: 'column', gap: '5px',
                zIndex: 101,
              }}
            >
              <span style={{
                display: 'block', width: '22px', height: '2px',
                background: 'var(--cyan)',
                transition: 'var(--transition)',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                boxShadow: '0 0 6px var(--cyan-glow)',
              }} />
              <span style={{
                display: 'block', width: '22px', height: '2px',
                background: 'var(--cyan)',
                transition: 'var(--transition)',
                opacity: menuOpen ? 0 : 1,
                boxShadow: '0 0 6px var(--cyan-glow)',
              }} />
              <span style={{
                display: 'block', width: '22px', height: '2px',
                background: 'var(--cyan)',
                transition: 'var(--transition)',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                boxShadow: '0 0 6px var(--cyan-glow)',
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú mobile — overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99,
        background: 'rgba(7,7,9,0.97)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={handleLinkClick}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              transition: 'color var(--transition)',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: `${i * 0.06}s`,
            }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = 'var(--text)'}
          >
            {link.label}
          </a>
        ))}

        <a
          href={FORM_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={handleLinkClick}
          className="btn btn-primary"
          style={{ marginTop: '1rem', fontSize: '0.85rem', padding: '0.85rem 2rem' }}
        >
          {'> cotizar'}
        </a>
      </div>

      <style>{`
        .desktop-nav  { display: flex; }
        .desktop-cta  { display: inline-flex; }
        .burger-btn   { display: none; }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .desktop-cta { display: none; }
          .burger-btn  { display: flex; }
        }
      `}</style>
    </>
  )
}