import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Wand2, Server, Check } from 'lucide-react';

export function SkillsHarmonySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const frontendSkills = [
        'React & Next.js',
        'Motion & GSAP',
        'Tailwind CSS',
        'Three.js & WebGL',
        'Web Audio API',
        'TypeScript',
    ];

    const backendSkills = [
        'Node.js & Express',
        'Prisma ORM',
        'Supabase',
        'PostgreSQL',
        'REST & GraphQL',
        'Docker',
    ];

    return (
        <section ref={ref} className="min-h-screen px-6 pb-12 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-6xl md:text-7xl mb-6">
                        <span className="font-mono text-white">Full-Stack</span>
                        <br />
                        <span className="font-mono text-[#00D1FF]">Skill Harmony</span>
                    </h2>

                    <p className="font-mono text-white/60 text-lg max-w-xl mx-auto">
                        Frontend and backend working together as one system: connected, synchronized, and scalable.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center relative">
                    {/* FRONTEND */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/10 to-transparent
                            rounded-3xl p-8 border border-[#FFDF00]/30 hover:scale-[1.02] transition-all"
                            data-cursor="sun"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-[#FFDF00]/20 border border-[#FFDF00]/40">
                                    <Wand2 className="text-[#FFDF00]" size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl text-[#FFDF00]">Frontend</h3>
                                    <p className="text-white/60 font-mono text-sm">Experience Layer</p>
                                </div>
                            </div>

                            {/* SOUND WAVE */}
                            <div className="h-24 mb-8 rounded-xl bg-black/40 border border-[#FFDF00]/20 p-4 overflow-hidden">
                                <div className="flex items-center justify-center h-full gap-1">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 bg-gradient-to-t from-[#FFDF00] to-[#FFDF00]/20 rounded-full"
                                            animate={{
                                                height: [
                                                    `${20 + Math.sin(i * 0.5) * 20}%`,
                                                    `${40 + Math.sin(i * 0.5 + 1) * 30}%`,
                                                    `${20 + Math.sin(i * 0.5) * 20}%`,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.05,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {frontendSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-[#FFDF00]/10
                                        hover:border-[#FFDF00]/40 hover:bg-[#FFDF00]/5 transition-all"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#FFDF00]/20 border border-[#FFDF00]/40 flex items-center justify-center">
                                            <Check className="text-[#FFDF00]" size={14} />
                                        </div>
                                        <span className="text-white/90">{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* BACKEND */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="backdrop-blur-xl bg-gradient-to-br from-[#00D1FF]/10 to-transparent
                            rounded-3xl p-8 border border-[#00D1FF]/30 hover:scale-[1.02] transition-all"
                            data-cursor="graph"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-[#00D1FF]/20 border border-[#00D1FF]/40">
                                    <Server className="text-[#00D1FF]" size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl text-[#00D1FF]">Backend</h3>
                                    <p className="text-white/60 font-mono text-sm">System Layer</p>
                                </div>
                            </div>

                            {/* SCHEMA */}
                            <div className="h-24 mb-8 rounded-xl bg-black/40 border border-[#00D1FF]/20 p-4">
                                <div className="grid grid-cols-3 gap-2 h-full">
                                    {[1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="rounded border border-[#00D1FF]/40 bg-[#00D1FF]/5 p-2"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                                        >
                                            <div className="w-full h-1 bg-[#00D1FF]/60 mb-1" />
                                            <div className="w-3/4 h-1 bg-[#00D1FF]/40 mb-1" />
                                            <div className="w-1/2 h-1 bg-[#00D1FF]/30" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {backendSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-[#00D1FF]/10
                                        hover:border-[#00D1FF]/40 hover:bg-[#00D1FF]/5 transition-all"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center justify-center">
                                            <Check className="text-[#00D1FF]" size={14} />
                                        </div>
                                        <span className="text-white/90">{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 🔥 ENHANCED HARMONY FLOW */}
                    <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : {}}
    transition={{ duration: 1 }}
>
    <svg width="260" height="420" className="hidden md:block">
        <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFDF00" />
                <stop offset="50%" stopColor="#00D1FF" />
                <stop offset="100%" stopColor="#FFDF00" />
            </linearGradient>

            <path
                id="desktopFlowPath"
                d="M 0 210 Q 130 80, 260 210 Q 130 340, 0 210"
            />
        </defs>

        <motion.path
            d="M 0 210 Q 130 80, 260 210 Q 130 340, 0 210"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2 }}
        />

        {[0, 1, 2, 3].map((i) => (
            <circle
                key={i}
                r="4"
                fill={i % 2 === 0 ? "#FFDF00" : "#00D1FF"}
            >
                <animateMotion
                    dur="4s"
                    begin={`${i * 1}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                >
                    <mpath href="#desktopFlowPath" />
                </animateMotion>
            </circle>
        ))}
    </svg>

   <svg
    width="200"
    height="220"
    viewBox="0 0 200 220"
    className="block md:hidden overflow-visible"
>
    <defs>
        <linearGradient id="flowGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDF00" />
            <stop offset="50%" stopColor="#00D1FF" />
            <stop offset="100%" stopColor="#FFDF00" />
        </linearGradient>

        {/* 🔥 TRUE VERTICAL LOOP (NOT A LINE) */}
        <path
            id="mobileFlowPath"
            d="M 100 20
               Q 30 160, 100 300
               Q 170 160, 100 20"
        />
    </defs>

    <motion.path
        d="M 100 20
           Q 30 160, 100 300
           Q 170 160, 100 20"
        stroke="url(#flowGradientMobile)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.8 }}
    />

    {/* 🔥 PARTICLES FOLLOW FULL LOOP */}
    {[0, 1, 2].map((i) => (
        <circle
            key={i}
            r="3.5"
            fill={i % 2 === 0 ? "#FFDF00" : "#00D1FF"}
        >
            <animateMotion
                dur="3.2s"
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
                rotate="auto"
            >
                <mpath href="#mobileFlowPath" />
            </animateMotion>
        </circle>
    ))}
</svg>

    <div className="hidden md:block text-center mt-4 text-[10px] font-mono text-white/40">
        DATA FLOW
    </div>
</motion.div>
                </div>
            </div>

            {/* BACKGROUND */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FFDF00]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00D1FF]/5 rounded-full blur-3xl" />
        </section>
    );
}