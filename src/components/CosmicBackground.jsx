import { useEffect, useRef } from 'react'

export default function CosmicBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random() * 0.7 + 0.2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    const orbs = [
      { x: 0.15, y: 0.2, r: 320, color: [209, 74, 22], speed: 0.0007 },
      { x: 0.85, y: 0.15, r: 260, color: [173, 58, 16], speed: 0.0009 },
      { x: 0.5, y: 0.8, r: 300, color: [230, 208, 176], speed: 0.0006 },
      { x: 0.7, y: 0.55, r: 200, color: [79, 86, 115], speed: 0.001 },
    ]

    const draw = () => {
      t += 0.012
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0, '#e4dbc9')
      bg.addColorStop(0.5, '#efe4d3')
      bg.addColorStop(1, '#f3efe6')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < 3; i += 1) {
        const yOff = H * (0.25 + i * 0.25) + Math.sin(t * 0.4 + i * 2) * 60
        const grad = ctx.createLinearGradient(0, yOff - 120, 0, yOff + 120)
        const colors = [
          ['rgba(209,74,22,0)', 'rgba(209,74,22,0.06)', 'rgba(209,74,22,0)'],
          ['rgba(173,58,16,0)', 'rgba(173,58,16,0.05)', 'rgba(173,58,16,0)'],
          ['rgba(79,86,115,0)', 'rgba(79,86,115,0.04)', 'rgba(79,86,115,0)'],
        ][i]
        grad.addColorStop(0, colors[0])
        grad.addColorStop(0.5, colors[1])
        grad.addColorStop(1, colors[2])
        ctx.fillStyle = grad
        ctx.fillRect(0, yOff - 120, W, 240)
      }

      orbs.forEach((orb, i) => {
        const cx = (orb.x + Math.sin(t * orb.speed * 3 + i) * 0.06) * W
        const cy = (orb.y + Math.cos(t * orb.speed * 2 + i) * 0.05) * H
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r)
        const [r, gr, b] = orb.color
        g.addColorStop(0, `rgba(${r},${gr},${b},0.12)`)
        g.addColorStop(0.5, `rgba(${r},${gr},${b},0.05)`)
        g.addColorStop(1, `rgba(${r},${gr},${b},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      stars.forEach((s) => {
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.2 + s.twinkleOffset))
        ctx.beginPath()
        ctx.arc(s.x, s.y + Math.sin(t * s.speed + s.x) * 0.4, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,250,240,${s.opacity * twinkle})`
        ctx.fill()
      })

      if (Math.sin(t * 0.3) > 0.97) {
        const progress = (Math.sin(t * 0.3) - 0.97) / 0.03
        const sx = W * 0.1 + progress * W * 0.8
        const sy = H * 0.05 + progress * H * 0.3
        const tail = 80
        const sg = ctx.createLinearGradient(sx - tail, sy - tail * 0.4, sx, sy)
        sg.addColorStop(0, 'rgba(255,255,255,0)')
        sg.addColorStop(1, 'rgba(209,74,22,0.6)')
        ctx.strokeStyle = sg
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sx - tail, sy - tail * 0.4)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      ctx.strokeStyle = 'rgba(26,34,64,0.04)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }} />
}
