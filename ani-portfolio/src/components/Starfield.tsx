import { useEffect, useRef } from 'react'

type Star = {
    x0: number
    y0: number
    x: number
    y: number
    vx: number
    vy: number
    r: number
    a: number
    tw: number
    sp: number
    color: string

}

function StarfieldCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        let raf = 0
        let dpr = Math.min(window.devicePixelRatio || 1, 2)

        let w = 1
        let h = 1

        let stars: Star[] = []

        let mx = -9999
        let my = -9999
        let mdx = 0
        let mdy = 0
        let lastMx = mx
        let lastMy = my

        const rand = (a: number, b: number) => a + Math.random() * (b - a)

        const resize = () => {
            const parent = canvas.parentElement
            const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect()
            w = Math.max(1, Math.floor(rect.width))
            h = Math.max(1, Math.floor(rect.height))
            dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.floor(w * dpr)
            canvas.height = Math.floor(h * dpr)
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const density = w * h > 900000 ? 0.00032 : 0.00038
            const count = Math.floor(w * h * density)

            stars = Array.from({ length: count }, () => {
                const x0 = rand(0, w)
                const y0 = rand(0, h)
                return {
                    x0,
                    y0,
                    x: x0,
                    y: y0,
                    vx: 0,
                    vy: 0,
                    r: rand(0.6, 1.6),
                    a: rand(0.15, 0.9),
                    tw: rand(0, Math.PI * 2),
                    sp: rand(0.6, 1.2),
                    color: Math.random() < 0.25 ? '#00D1FF' : 'rgba(255,255,255,1)'
                }
            })
        }

        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            mx = e.clientX - rect.left
            my = e.clientY - rect.top
        }

        const onLeave = () => {
            mx = -9999
            my = -9999
            mdx = 0
            mdy = 0
        }

        const tick = (tms: number) => {
            const t = tms * 0.001
            raf = requestAnimationFrame(tick)

            mdx = (mx - lastMx) || 0
            mdy = (my - lastMy) || 0
            lastMx = mx
            lastMy = my

            ctx.clearRect(0, 0, w, h)

            const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.max(w, h) * 0.7)
            bg.addColorStop(0, 'rgba(4,4,6,1)')
            bg.addColorStop(0.45, 'rgba(2,1,4,1)')
            bg.addColorStop(1, 'rgba(0,0,1,1)')
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, w, h)

            const influence = 160
            const influence2 = influence * influence
            const mouseSpeed = Math.min(1.8, Math.hypot(mdx, mdy) * 0.03)

            const spring = 0.02
            const damping = 0.86
            const wander = 0.06

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i]

                const dx0 = s.x0 - s.x
                const dy0 = s.y0 - s.y
                s.vx += dx0 * spring
                s.vy += dy0 * spring

                const wx = Math.sin(t * 0.9 + s.tw) * wander * s.sp
                const wy = Math.cos(t * 0.8 + s.tw) * wander * s.sp
                s.vx += wx
                s.vy += wy

                if (mx > -1000) {
                    const dx = s.x - mx
                    const dy = s.y - my
                    const d2 = dx * dx + dy * dy
                    if (d2 < influence2) {
                        const d = Math.sqrt(d2) + 0.0001
                        const falloff = 1 - d / influence
                        const nx = dx / d
                        const ny = dy / d
                        const push = (0.75 + mouseSpeed * 1.2) * falloff
                        const swirl = (0.35 + mouseSpeed * 0.9) * falloff
                        s.vx += nx * push * 3.2 + -ny * swirl * 2.6
                        s.vy += ny * push * 3.2 + nx * swirl * 2.6
                    }
                }

                s.vx *= damping
                s.vy *= damping
                s.x += s.vx
                s.y += s.vy

                s.tw += 0.01 * s.sp
                const twinkle = 0.55 + 0.45 * Math.sin(t * 1.6 + s.tw * 2.4)
                const isCyan = s.color === '#00D1FF'
                const alpha = Math.max(0, Math.min(1, s.a * (isCyan ? 0.85 + twinkle * 0.55 : 0.65 + twinkle * 0.5)))

                ctx.globalAlpha = alpha
                ctx.fillStyle = s.color
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
                ctx.fill()

                if (s.r > 1.25) {
                    ctx.globalAlpha = alpha * 0.35
                    ctx.fillStyle = s.color
                    ctx.beginPath()
                    ctx.arc(s.x, s.y, s.r * 2.8, 0, Math.PI * 2)
                }
            }

            ctx.globalAlpha = 1
        }

        resize()
        raf = requestAnimationFrame(tick)

        window.addEventListener('resize', resize)
        canvas.addEventListener('pointermove', onMove)
        canvas.addEventListener('pointerleave', onLeave)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            canvas.removeEventListener('pointermove', onMove)
            canvas.removeEventListener('pointerleave', onLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10"
            style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        />
    )
}

export default StarfieldCanvas
