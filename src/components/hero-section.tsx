import { useEffect, useRef, useState } from "react"
import ThreeScene from "./ThreeScene.tsx"
import Starfield from "./Starfield.tsx"
import { ChevronDown, Menu } from "lucide-react"
import { motion } from "motion/react"

export function HeroSection() {
    const leftRef = useRef<HTMLDivElement | null>(null)
    const railRef = useRef<HTMLDivElement | null>(null)

    const [, setLeftH] = useState<number | null>(null)
    const [railH, setRailH] = useState<number>(0)
    const [active, setActive] = useState<string>("")

    useEffect(() => {
        const el = leftRef.current
        if (!el) return
        const ro = new ResizeObserver(() => setLeftH(el.getBoundingClientRect().height))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const el = railRef.current
        if (!el) return
        const ro = new ResizeObserver(() => setRailH(el.getBoundingClientRect().height))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id))

            let current = ""

            sections.forEach((section) => {
                if (!section) return
                const rect = section.getBoundingClientRect()

                if (rect.top <= window.innerHeight * 0.4) {
                    current = section.id
                }
            })

            setActive(current)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { label: "Philosophy", id: "philosophy" },
        { label: "Projects", id: "projects" },
        { label: "Skills", id: "skills" },
        { label: "Music", id: "musician" },
        { label: "Contact", id: "contact" }
    ]
    return (
        <section className="relative overflow-hidden bg-[#020617]" style={{ height: "var(--vv-h, 100svh)" }}>
            <Starfield />

            {/* NAV */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-6 left-0 w-full z-50 px-6 pointer-events-none"
            >
                <div className="relative flex items-center pointer-events-auto">

                    {/* CENTER NAV */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <div className="
                            hidden md:flex items-center gap-1 rounded-full
                            bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]
                            backdrop-blur-xl
                            border border-white/10
                            shadow-[0_8px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]
                            relative
                            before:absolute before:inset-0 before:rounded-full
                            before:bg-[radial-gradient(circle_at_top,rgba(0,209,255,0.25),transparent_70%)]
                            before:opacity-40 before:pointer-events-none
                        ">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    whileHover={{ scale: 1.05 }}
                                    className={`
        relative px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.2em]
        transition-all duration-300 group
        ${active === item.id ? "text-white" : "text-white/60 hover:text-white"}
    `}
                                >
                                    <span className="relative z-10">{item.label}</span>

                                    {/* ACTIVE + HOVER GLOW */}
                                    <span
                                        className={`
            absolute inset-0 rounded-full
            bg-[#00D1FF]/10
            transition duration-300 blur-[6px]
            ${active === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
                                    />

                                    {/* ACTIVE + HOVER BORDER */}
                                    <span
                                        className={`
            absolute inset-0 rounded-full
            border transition duration-300
            ${active === item.id
                                                ? "border-[#00D1FF]/30"
                                                : "border-[#00D1FF]/0 group-hover:border-[#00D1FF]/30"}
        `}
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT BUTTON */}
                    <div className="ml-auto">
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            className="
                                hidden md:flex items-center gap-2
                                font-mono text-[10px] tracking-[0.2em]
                                text-white
                                px-4 py-2 rounded-full
                                bg-[linear-gradient(135deg,rgba(0,209,255,0.15),rgba(0,209,255,0.05))]
                                backdrop-blur-lg
                                border border-[#00D1FF]/30
                                shadow-[0_0_20px_rgba(0,209,255,0.2)]
                                hover:shadow-[0_0_30px_rgba(0,209,255,0.4)]
                                transition-all duration-300
                            "
                        >
                            RESUME
                        </motion.a>
                    </div>

                    {/* MOBILE */}
                    <div className="ml-auto md:hidden text-white/60">
                        <Menu size={24} />
                    </div>
                </div>
            </motion.nav>

            {/* BACKGROUND */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <ThreeScene />
            </div>

            {/* CONTENT */}
            <div className="relative z-20 h-full pointer-events-none">
                <div className="hidden lg:flex absolute right-64 top-[75%] -translate-y-1/2 flex-col gap-4 pointer-events-auto">

                    {/* PRIMARY CTA */}
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.98 }}
                        className="
            group relative px-8 py-4 rounded-full
            font-mono text-[11px] tracking-[0.25em] uppercase
            text-white
            backdrop-blur-xl
            bg-[linear-gradient(135deg,rgba(255,223,0,0.15),rgba(255,223,0,0.05))]
            border border-[#FFDF00]/40
            shadow-[0_0_25px_rgba(255,223,0,0.25)]
            hover:shadow-[0_0_50px_rgba(255,223,0,0.6)]
            transition-all duration-500
            overflow-hidden
        "
                        data-cursor="sun"
                    >
                        {/* glow layer */}
                        <span className="absolute inset-0 bg-[#FFDF00]/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500 pointer-events-none" />

                        <span className="relative z-10 flex items-center gap-3">
                            Let’s Talk
                        </span>
                    </motion.a>

                    {/* SECONDARY CTA */}
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="
            group px-6 py-3 rounded-full
            font-mono text-[10px] tracking-[0.2em] uppercase
            text-white/70
            border border-white/10
            backdrop-blur-xl
            bg-white/5
            hover:text-white
            hover:border-[#00D1FF]/40
            hover:bg-[#00D1FF]/5
            transition-all duration-300
        "
                        data-cursor="graph"
                    >
                        My Work
                    </motion.a>

                </div>
                <div className="w-full max-w-6xl mx-auto h-full px-6 sm:px-10 lg:px-20">
                    <div
                        className="grid grid-cols-12 h-full grid-rows-[1fr] lg:grid-rows-[1fr_auto]"
                        style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + ${Math.max(railH, 84)}px + 16px)` }}
                    >
                        <div
                            ref={leftRef}
                            className="
                                col-span-12 lg:col-span-7 row-start-2 hero-rise
                                absolute left-6 top-[52%] w-fit max-w-[70%]
                                lg:static lg:top-auto lg:left-auto lg:w-auto lg:max-w-none
                                space-y-4
                            "
                        >
                            <p className="flex flex-col gap-4 handwritten text-4xl sm:text-5xl text-white/95 leading-tight">
                                <span>Frontend <span className="text-[#00D1FF] drop-shadow-[0_0_15px_rgba(0,209,255,0.5)]">developer</span></span>
                                <span><span className="opacity-60">Full-Stack </span>Capable</span>
                            </p>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/10 backdrop-blur-sm border border-[#00D1FF]/20 badge-float w-fit">
                                <span className="h-2 w-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66] animate-pulse" />
                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#00FF66]/80 font-medium">
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
                            className="absolute bottom-12 flex flex-col items-center gap-2"
                        >
                            <p className="text-[#00D1FF]/60 font-mono text-[10px] tracking-[0.3em] uppercase">
                                Scroll to Initialize
                            </p>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronDown className="text-[#FFDF00] opacity-80" size={28} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection