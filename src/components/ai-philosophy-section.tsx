import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Brain, Code2, Rocket } from 'lucide-react';

export function AIPhilosophySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="min-h-screen pt-32 px-6 pb-12 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative">

                {/* HEADER */}
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
                        and{' '}
                        <br />
                        <span className="text-[#00D1FF]">structured engineering</span>.
                    </p>
                </motion.div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">

                    {/* IDEA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.03 }}
                        className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FFDF00]/40 transition-all"
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

                    {/* SYSTEM CORE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="relative flex flex-col items-center justify-center text-center rounded-3xl backdrop-blur-xl bg-white/5 border border-[#00D1FF]/30 px-6 py-10"
                    >
                        {/* PULSE */}
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

                    {/* PRODUCT */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ scale: 1.03 }}
                        className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-green-400/40 transition-all"
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

                    {/* FLOW LINES */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <linearGradient id="flow" x1="0%" y1="0%" x2="100%">
                                <stop offset="0%" stopColor="#FFDF00" />
                                <stop offset="70%" stopColor="#00D1FF" />
                            </linearGradient>
                        </defs>

                        {/* LEFT → CENTER */}
                        <motion.path
                            d="M300 250 C450 200, 550 200, 650 250"
                            stroke="url(#flow)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 1.5 }}
                        />

                        {/* CENTER → RIGHT */}
                        <motion.path
                            d="M650 250 C750 300, 900 300, 1000 280"
                            stroke="url(#flow)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 1.5, delay: 0.3 }}
                        />

                        {/* PARTICLE */}
                        <motion.circle
                            r="4"
                            fill="#00D1FF"
                            style={{
                                offsetPath: "path('M300 250 C450 200, 550 200, 650 250 C750 300, 900 300, 1000 280')"
                            }}
                            animate={{
                                offsetDistance: ["0%", "100%"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </svg>

                </div>

            </div>

            {/* BACKGROUND */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00D1FF]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#FFDF00]/5 rounded-full blur-3xl" />
        </section>
    );
}