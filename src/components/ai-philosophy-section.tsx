import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useId, useRef } from 'react'
import { Brain, Code2, Rocket } from 'lucide-react'

export function AIPhilosophySection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const flowId = useId()
    const motionPathId = useId()

    return (
        <section ref={ref} className="min-h-screen pt-32 px-6 pb-12 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="font-mono text-5xl md:text-6xl mb-6 leading-tight">
                        <span className="text-white">How I Build</span>
                        <br />
                        <span className="text-[#00D1FF]">Digital Products</span>
                    </h2>

                    <p className="font-mono text-white/60 text-lg max-w-2xl mx-auto">
                        From idea to system to product:
                        <br />
                        bridging the gap between{' '}
                        <span className="text-[#FFDF00]">creative vision</span>{' '}
                        and
                        <br />
                        <span className="text-[#00D1FF]">structured engineering</span>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.03 }}
                        className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FFDF00]/40 transition-all relative z-10"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Brain className="text-[#FFDF00]" size={24} />
                            <h3 className="text-lg font-mono text-[#FFDF00]">01 · IDEA</h3>
                        </div>

                        <p className="text-white/60 text-sm mb-6">
                            Define the problem, the experience, and the vision.
                        </p>

                        <div className="bg-black/40 rounded-xl p-5 border border-[#FFDF00]/20 font-mono text-sm">
                            <div className="text-[#00D1FF] mb-2">// concept.ts</div>
                            <div className="text-white/80">
                                const goal = <span className="text-green-400">"High-end UX"</span>;
                            </div>
                            <div className="text-white/80 mt-1">
                                const direction = <span className="text-green-400">"Interactive + Scalable"</span>;
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="relative flex flex-col items-center justify-center text-center rounded-3xl backdrop-blur-xl bg-white/5 border border-[#00D1FF]/30 px-6 py-10 z-10"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute w-40 h-40 bg-[#00D1FF]/20 rounded-full blur-3xl"
                        />

                        <Code2 className="text-[#00D1FF] mb-3 relative z-10" size={30} />

                        <h3 className="text-sm font-mono text-[#00D1FF] mb-3 relative z-10">
                            02 · SYSTEM
                        </h3>

                        <p className="text-white/50 text-xs leading-relaxed max-w-xs relative z-10">
                            Structured architecture, reusable components, and scalable logic.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ scale: 1.03 }}
                        className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-green-400/40 transition-all relative z-10"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Rocket className="text-green-400" size={24} />
                            <h3 className="text-lg font-mono text-green-400">03 · PRODUCT</h3>
                        </div>

                        <p className="text-white/60 text-sm mb-6">
                            Production-ready, scalable, and visually refined.
                        </p>

                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-green-400/10 border border-green-400/20 text-xs text-white/70">
                                ✔ High performance
                            </div>
                            <div className="p-3 rounded-lg bg-[#00D1FF]/10 border border-[#00D1FF]/20 text-xs text-white/70">
                                ✔ Clean architecture
                            </div>
                            <div className="p-3 rounded-lg bg-[#FFDF00]/10 border border-[#FFDF00]/20 text-xs text-white/70">
                                ✔ Premium UI & interactions
                            </div>
                        </div>
                    </motion.div>

                    <svg
                        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
                        viewBox="0 0 1200 420"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id={flowId} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFDF00" />
                                <stop offset="70%" stopColor="#8BFF7A" />
                                <stop offset="100%" stopColor="#00D1FF" />
                            </linearGradient>

                            <path
                                id={motionPathId}
                                d="M 280 330
   C 410 285, 500 285, 600 325
   S 825 405, 930 380"
                            />
                        </defs>

                        <motion.path
                            d="M 280 330
   C 410 285, 500 285, 600 325"
                            stroke={`url(#${flowId})`}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 1.2 }}
                        />

                        <motion.path
                            d="M 600 325
   C 700 365, 820 405, 930 380"
                            stroke={`url(#${flowId})`}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        />

                        <g opacity={isInView ? 1 : 0}>
                            <circle r="5" fill="#00D1FF">
                                <animateMotion
                                    dur="3.2s"
                                    repeatCount="indefinite"
                                    rotate="auto"
                                >
                                    <mpath href={`#${motionPathId}`} />
                                </animateMotion>
                            </circle>
                        </g>
                    </svg>

                    <svg
                        className="md:hidden absolute inset-y-0 -left-6 w-[100px] h-full pointer-events-none z-10"
                        viewBox="0 0 120 700"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="flowMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFDF00" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.4" />
                            </linearGradient>

                            <path
                                id="mobilePath"
                                d="M60 140
               C20 220, 80 280, 60 360
               S20 520, 60 620"
                            />
                        </defs>

                        <motion.path
                            d="M60 140
           C20 220, 80 280, 60 360
           S20 520, 60 620"
                            stroke="url(#flowMobile)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                            style={{
                                filter: 'drop-shadow(0 0 6px rgba(0,209,255,0.35))'
                            }}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 1.2 }}
                        />

                        <g opacity={isInView ? 1 : 0}>
                            <circle r="4" fill="#00D1FF" opacity="0.8">
                                <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto">
                                    <mpath href="#mobilePath" />
                                </animateMotion>
                            </circle>
                        </g>
                    </svg>
                </div>
            </div>

            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00D1FF]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#FFDF00]/5 rounded-full blur-3xl" />
        </section>
    )
}