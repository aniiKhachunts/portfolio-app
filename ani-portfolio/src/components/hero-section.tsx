import { useEffect, useRef, useState } from "react"
import ThreeScene from "./ThreeScene.tsx"
import Starfield from "./Starfield.tsx"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"

export function HeroSection() {
    const leftRef = useRef<HTMLDivElement | null>(null)
    const railRef = useRef<HTMLDivElement | null>(null)

    const [leftH, setLeftH] = useState<number | null>(null)
    const [railH, setRailH] = useState<number>(0)

    useEffect(() => {
        const el = leftRef.current
        if (!el) return

        const ro = new ResizeObserver(() => {
            const h = el.getBoundingClientRect().height
            setLeftH(h)
        })

        ro.observe(el)
        setLeftH(el.getBoundingClientRect().height)

        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const el = railRef.current
        if (!el) return

        const ro = new ResizeObserver(() => {
            setRailH(el.getBoundingClientRect().height)
        })

        ro.observe(el)
        setRailH(el.getBoundingClientRect().height)

        return () => ro.disconnect()
    }, [])

    const gridPadBottom = `calc(env(safe-area-inset-bottom) + ${Math.max(railH, 84)}px + 16px)`

    return (
        <section className="relative overflow-hidden" style={{ height: "var(--vv-h, 100svh)" }}>
            <Starfield />

            <div className="absolute inset-0 z-10 pointer-events-none">
                <ThreeScene />
            </div>

            <div className="relative z-20 h-full pointer-events-none">
                <div className="w-full max-w-6xl mx-auto h-full px-6 sm:px-10 lg:px-20">
                    <div
                        className="grid grid-cols-12 h-full grid-rows-[1fr] lg:grid-rows-[1fr_auto]"
                        style={{ paddingBottom: gridPadBottom }}
                    >
                        <div
                            ref={leftRef}
                            className="
                                col-span-12 lg:col-span-7 row-start-2 hero-rise
                                absolute left-6 top-[52%] w-fit max-w-[70%]
                                lg:static lg:top-auto lg:left-auto lg:w-auto lg:max-w-none
                                space-y-2 sm:space-y-3
                            "
                        >
                            <p className="flex flex-col gap-4 handwritten text-3xl sm:text-4xl text-white/90">
                                <span>Frontend <span className="text-[#00D1FF]">developer</span></span>
                                <span><span>Full-Stack </span>Capable</span>
                            </p>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/15 backdrop-blur-sm border border-green-200/30 badge-float w-fit">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[11px] tracking-[0.18em] uppercase text-green-400">
                                    Open to work
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.5 }}
                            className="absolute bottom-16 flex flex-col items-center gap-2"
                        >
                            <p className="text-[#00D1FF] font-mono text-sm tracking-widest">
                                SCROLL DOWN TO INITIALIZE
                            </p>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ChevronDown className="text-[#FFDF00]" size={32} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
