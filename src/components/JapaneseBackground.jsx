import { useEffect, useRef } from 'react'

const CHARS = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほアイウエオカキクケコサシスセソタチツテトナニヌネノ電波世界接続存在記憶夢現実'

export default function JapaneseBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const fontSize = 16
    const colGap = fontSize * 1.6
    let columns, drops

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / colGap)
      drops = Array.from({ length: columns }, () => Math.random() * -60)
    }

    const draw = () => {
      // Trail suave pero que no deje manchas
      ctx.fillStyle = 'rgba(7, 7, 9, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * colGap
        const y = drops[i] * fontSize

        const roll = Math.random()
        if (roll > 0.96) {
          ctx.fillStyle = 'rgba(0, 229, 255, 0.55)' // brillante — puntual
        } else if (roll > 0.7) {
          ctx.fillStyle = 'rgba(0, 229, 255, 0.18)' // medio
        } else {
          ctx.fillStyle = 'rgba(0, 229, 255, 0.07)' // sutil
        }

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0
        }
        drops[i] += 0.1 // velocidad 
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const onResize = () => { cancelAnimationFrame(animId); init(); draw() }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}