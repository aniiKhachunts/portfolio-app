import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { projects, type ProjectCardProps } from '../data/projects';

function ProjectCard({ title, description, badge, angle, distance, color, live, repo }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    const fastTransition = {
        type: "spring",
        stiffness: 600,
        damping: 30,
        mass: 0.5
    } as const;

    return (
        <motion.div
            initial={{ rotate: angle, x, y }}
            animate={{ rotate: angle + 360, x, y }}
            transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                x: { duration: 0 },
                y: { duration: 0 },
            }}
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                translateX: "-50%",
                translateY: "-50%",
                zIndex: isHovered ? 50 : 2,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.div
                initial={{ rotate: -angle }}
                animate={{
                    rotate: -(angle + 360),
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: fastTransition,
                }}
                className="relative cursor-pointer"
            >
                <motion.div
                    animate={{
                        boxShadow: isHovered
                            ? `
            0 0 25px ${color}80,
            0 0 60px ${color}50,
            0 0 120px ${color}30
          `
                            : `
            0 0 15px ${color}20
          `,
                        borderColor: isHovered ? color : `${color}30`,
                    }}
                    className="relative w-72 p-5 rounded-2xl border overflow-hidden transition-all duration-300"
                    style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(28px)",
                        WebkitBackdropFilter: "blur(28px)",
                    }}
                >
                    {/* 🔥 GLASS GRADIENT (THIS IS WHAT YOU WERE MISSING) */}
                    <div
                        className="absolute inset-0 opacity-60 pointer-events-none"
                        style={{
                            background: `
                linear-gradient(120deg, rgba(255,255,255,0.15), transparent 40%),
                linear-gradient(300deg, ${color}20, transparent 50%)
            `
                        }}
                    />

                    {/* ✨ EDGE LIGHT */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

                    {/* ✨ TOP LIGHT LINE */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30" />

                    {/* CONTENT */}
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2" style={{ color }}>
                            {title}
                        </h3>

                        <div
                            className="inline-block px-2 py-1 rounded-full text-[10px] mb-2"
                            style={{ backgroundColor: `${color}20`, color }}
                        >
                            {badge}
                        </div>

                        <p className="text-white/70 text-sm">
                            {description}
                        </p>

                        <div className="flex gap-2 mt-4 flex-wrap">
                            {live && (
                                <a
                                    href={live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 hover:bg-white/20 transition"
                                >
                                    Live
                                </a>
                            )}

                            {repo && (
                                <a
                                    href={repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 hover:bg-white/20 transition"
                                >
                                    Repo
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function ProjectConstellationSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-200px" });

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (isInView) {
            requestAnimationFrame(() => setReady(true));
        }
    }, [isInView]);

    const formattedProjects = projects.map((p) => ({
        title: p.title,
        description: p.subtitle,
        badge: p.year,
        color: p.theme?.accent ?? "#22D3EE",
        live: p.live,
        repo: p.repo,
    }));

    const count = formattedProjects.length;
    const angleStep = 360 / count;
    const radius = Math.max(300, count * 65);
    const stars = useMemo(
        () =>
            Array.from({ length: 40 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 2,
            })),
        []
    );

    return (
        <section ref={ref} className="min-h-[140vh] py-40 px-6 relative overflow-hidden">

            {/* ⭐ STARS */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ left: star.left, top: star.top }}
                        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
                        transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
                    />
                ))}
            </div>

            <div className="relative z-10">

                <div className="text-center">
                    <h2 className="text-6xl md:text-7xl">
                        <span className="text-white">Project</span>
                        <br />
                        <span className="text-[#FFDF00]">Constellation</span>
                    </h2>
                </div>

                <div className="relative h-[1200px] max-w-[1400px] mx-auto">
                    {/* 🌕 CORE */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 40px rgba(255,223,0,0.4), 0 0 80px rgba(0,209,255,0.2)',
                                    '0 0 60px rgba(0,209,255,0.4), 0 0 100px rgba(255,223,0,0.2)',
                                    '0 0 40px rgba(255,223,0,0.4), 0 0 80px rgba(0,209,255,0.2)',
                                ],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-32 h-32 rounded-full backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/20 to-[#00D1FF]/20 border border-white/30 flex items-center justify-center"
                        >
                            <div className="text-center">
                                <Sparkles />
                                <div className="text-xs text-white mt-1">Core</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 🟡 ORBIT RING */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                        <div
                            style={{
                                width: radius * 2,
                                height: radius * 2,
                            }}
                            className="rounded-full border border-white/20"
                        />                    </div>

                    {/* 🔗 CONNECTION LINES */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {formattedProjects.map((_, index) => {
                            const angle = index * angleStep;

                            const lineOffset = 110;

                            const x = Math.cos((angle * Math.PI) / 180) * (radius - lineOffset);
                            const y = Math.sin((angle * Math.PI) / 180) * (radius - lineOffset);

                            return (
                                <motion.line
                                    key={index}
                                    x1="50%"
                                    y1="50%"
                                    x2={`calc(50% + ${x}px)`}
                                    y2={`calc(50% + ${y}px)`}
                                    strokeWidth="1.2"
                                    stroke="rgba(255,255,255,0.25)"
                                    style={{
                                        filter: "drop-shadow(0 0 6px rgba(255,255,255,0.2))"
                                    }}
                                    initial={{
                                        pathLength: 0,
                                        opacity: 0
                                    }}

                                    animate={ready ? {
                                        pathLength: 1,
                                        opacity: 1
                                    } : {}}

                                    transition={{
                                        duration: 2.8,
                                        delay: index * 0.35,
                                        ease: [0.22, 1, 0.36, 1] // smooth “ease-out” (feels premium)
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {/* 🧩 PROJECTS */}
                    {ready &&
                        formattedProjects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                {...project}
                                angle={index * angleStep}
                                distance={radius}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
}