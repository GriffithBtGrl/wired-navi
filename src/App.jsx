import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyItMatters from './components/WhyItMatters'
import Method from './components/Method'
import Pricing from './components/Pricing'
import Conditions from './components/Conditions'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import JapaneseBackground from './components/JapaneseBackground'
import Brief from './components/Brief'

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const move = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }
    const expand = (e) => {
      if (e.target.closest('a, button')) cursor.classList.add('expanded')
    }
    const shrink = (e) => {
      if (e.target.closest('a, button')) cursor.classList.remove('expanded')
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', expand)
    document.addEventListener('mouseout', shrink)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', expand)
      document.removeEventListener('mouseout', shrink)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" />
}

function HomePage() {
  return (
    <>
      <JapaneseBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <WhyItMatters />
        <Method />
        <Pricing />
        <Conditions />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brief" element={<Brief />} />
      </Routes>
    </>
  )
}