
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Brain, Code2, Rocket } from 'lucide-react';

export function AIPhilosophySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section ref={ref} className="min-h-screen pt-32 px-6 pb-12 md:px-12 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl md:text-7xl mb-6">
                        <span className="text-white">The AI Orchestrator</span>
                        <br />
                        <span className="text-[#00D1FF]">Philosophy</span>
                    </h2>
                    <p className="text-white/60 text-xl max-w-3xl mx-auto font-mono">
                        AI as a Tool, Not a Replacement
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Input Card */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1 p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10
                       hover:border-[#FFDF00]/50 transition-all duration-500 group"
                        data-cursor="graph"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-[#FFDF00]/10 border border-[#FFDF00]/30">
                                <Brain className="text-[#FFDF00]" size={28} />
                            </div>
                            <h3 className="text-2xl font-mono text-[#FFDF00]">INPUT</h3>
                        </div>

                        <div className="bg-black/40 rounded-xl p-6 border border-[#FFDF00]/20 font-mono text-sm">
                            <div className="text-[#00D1FF] mb-2">// Human Idea</div>
                            <div className="text-white/80">
                                <span className="text-[#FFDF00]">const</span> vision ={' '}
                                <span className="text-green-400">"Premium Portfolio"</span>;
                            </div>
                            <div className="text-white/80 mt-1">
                                <span className="text-[#FFDF00]">const</span> requirements ={' '}
                                <span className="text-green-400">"Interactive + Modern"</span>;
                            </div>
                        </div>

                        <p className="text-white/60 mt-6 leading-relaxed">
                            Every project starts with human creativity, vision, and strategic thinking.
                        </p>
                    </motion.div>

                    {/* AI Synthesis Card */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1 p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10
                       hover:border-[#00D1FF]/50 transition-all duration-500 group relative overflow-hidden"
                        data-cursor="graph"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-[#00D1FF]/10 border border-[#00D1FF]/30">
                                <Code2 className="text-[#00D1FF]" size={28} />
                            </div>
                            <h3 className="text-2xl font-mono text-[#00D1FF]">SYNTHESIS</h3>
                        </div>

                        {/* Connection Lines */}
                        <div className="relative h-40 mb-6">
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.line
                                        key={i}
                                        x1="20"
                                        y1={20 + i * 20}
                                        x2="180"
                                        y2="50"
                                        stroke="url(#gradient)"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                    />
                                ))}
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FFDF00" />
                                        <stop offset="100%" stopColor="#00D1FF" />
                                    </linearGradient>
                                </defs>
                                <motion.circle
                                    cx="180"
                                    cy="50"
                                    r="8"
                                    fill="#00D1FF"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 1 }}
                                />
                            </svg>
                        </div>

                        <p className="text-white/60 leading-relaxed">
                            AI accelerates development, generates boilerplate, and optimizes patterns—under human direction.
                        </p>
                    </motion.div>

                    {/* Output Card */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1 p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10
                       hover:border-green-400/50 transition-all duration-500 group"
                        data-cursor="sun"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/30">
                                <Rocket className="text-green-400" size={28} />
                            </div>
                            <h3 className="text-2xl font-mono text-green-400">OUTPUT</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-green-400/10 to-[#FFDF00]/10 rounded-xl p-4 border border-green-400/20">
                                <div className="text-sm font-mono text-green-400 mb-2">✓ Deployed Product</div>
                                <div className="text-xs text-white/60">Lighthouse Score: 99</div>
                            </div>

                            <div className="bg-gradient-to-br from-[#00D1FF]/10 to-green-400/10 rounded-xl p-4 border border-[#00D1FF]/20">
                                <div className="text-sm font-mono text-[#00D1FF] mb-2">✓ User Experience</div>
                                <div className="text-xs text-white/60">Polished & Interactive</div>
                            </div>
                        </div>

                        <p className="text-white/60 mt-6 leading-relaxed">
                            The result: production-ready applications that exceed expectations.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FFDF00]/5 rounded-full blur-3xl" />
        </section>
    );
}
