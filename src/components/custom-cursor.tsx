import {useEffect, useRef, useState} from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; size: number };

const MAX = 140;

export default function CustomCursor() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const target = useRef({ x: 0, y: 0 });
    const core = useRef({ x: 0, y: 0 });
    const last = useRef({ x: 0, y: 0 });

    const parts = useRef<P[]>(
        Array.from({ length: MAX }, () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0, size: 0 }))
    );
    const head = useRef(0);

    const reduceRef = useRef(false);
    const visibleRef = useRef(false);
    const activeRef = useRef(false);

    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const isTouch = window.matchMedia("(hover: none)").matches || "ontouchstart" in window;
        if (isTouch) return;

        reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const resize = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            const w = window.innerWidth;
            const h = window.innerHeight;

            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const isInteractive = (el: Element | null) => {
            if (!el) return false;
            return Boolean(
                (el as HTMLElement).closest(
                    'a,button,[role="button"],input,textarea,select,summary,[data-cursor="link"]'
                )
            );
        };

        const onMove = (e: PointerEvent) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;

            if (!visibleRef.current) {
                visibleRef.current = true;
                setVisible(true);
            }
        };

        const onOver = (e: Event) => {
            const next = isInteractive(e.target as Element | null);
            if (next !== activeRef.current) {
                activeRef.current = next;
                setActive(next);
            }
        };

        const onLeave = () => {
            if (!visibleRef.current) return;
            visibleRef.current = false;
            setVisible(false);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onOver, { passive: true });
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("resize", resize, { passive: true });

        resize();

        const spawn = (dx: number, dy: number, speed: number) => {
            const reduce = reduceRef.current;
            const count = reduce ? 1 : speed > 9 ? 3 : speed > 4 ? 2 : 1;
            const mult = activeRef.current ? 1.12 : 1;

            for (let i = 0; i < count; i++) {
                const jx = (Math.random() - 0.5) * 1.8;
                const jy = (Math.random() - 0.5) * 1.8;

                const idx = head.current;
                head.current = (head.current + 1) % MAX;

                const p = parts.current[idx];
                p.x = core.current.x + jx;
                p.y = core.current.y + jy;
                p.vx = -dx * (0.06 + Math.random() * 0.05) * mult;
                p.vy = -dy * (0.06 + Math.random() * 0.05) * mult;
                p.life = activeRef.current ? 1 : 0.9;
                p.size = (activeRef.current ? 2.4 : 2.0) + Math.random() * 1.4;
            }
        };

        const drawStar = (x: number, y: number, r: number, a: number) => {
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, `rgba(255,255,255,${a})`);
            g.addColorStop(0.35, `rgba(255,255,255,${a * 0.55})`);
            g.addColorStop(1, `rgba(255,255,255,0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        };

        let raf = 0;

        const tick = () => {
            const reduce = reduceRef.current;

            const tx = target.current.x;
            const ty = target.current.y;

            const ease = reduce ? 1 : 0.62;
            core.current.x += (tx - core.current.x) * ease;
            core.current.y += (ty - core.current.y) * ease;

            const dx = core.current.x - last.current.x;
            const dy = core.current.y - last.current.y;
            const speed = Math.hypot(dx, dy);

            if (speed > (reduce ? 6 : 0.9)) {
                spawn(dx, dy, speed);
                last.current.x = core.current.x;
                last.current.y = core.current.y;
            }

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.globalCompositeOperation = "lighter";

            for (let i = 0; i < MAX; i++) {
                const p = parts.current[i];
                if (p.life <= 0) continue;

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.92;
                p.vy *= 0.92;
                p.life -= activeRef.current ? 0.028 : 0.035;

                const a = p.life < 0 ? 0 : p.life > 1 ? 1 : p.life;
                drawStar(p.x, p.y, p.size, a);
            }

            ctx.globalCompositeOperation = "source-over";

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerover", onOver);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div
            className={[
                "startrail-cursor",
                visible ? "is-visible" : "",
                active ? "is-active" : ""
            ].join(" ")}
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="startrail-canvas" />
        </div>
    );
}
