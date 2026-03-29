import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { projects, type ProjectCardProps } from '../data/projects';

function ProjectCard({
    title,
    description,
    badge,
    angle,
    distance,
    color,
    live,
    repo
}: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    return (
        <motion.div
            animate={{
                rotate: angle + 360,
                x,
                y,
            }}
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
                animate={{
                    rotate: -(angle + 360),
                    scale: isHovered ? 1.08 : 1
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { type: "spring", stiffness: 200, damping: 20 },
                }}
                className="relative"
            >
                <div
                    className="relative w-[360px] p-6 rounded-2xl border overflow-hidden transition-all duration-300"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(28px)",
                        borderColor: `${color}40`,
                        boxShadow: isHovered
                            ? `0 0 50px ${color}40`
                            : `0 0 15px ${color}20`
                    }}
                >
                    <h3 className="text-xl font-bold mb-2" style={{ color }}>
                        {title}
                    </h3>

                    <div
                        className="inline-block px-3 py-1 rounded-full text-xs mb-3"
                        style={{ backgroundColor: `${color}20`, color }}
                    >
                        {badge}
                    </div>

                    <p className="text-white/70 text-sm mb-3">
                        {description}
                    </p>

                    {/* HOVER ACTIONS */}
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-4 flex gap-3 flex-wrap"
                        >
                            {live && (
                                <motion.a
                                    href={live}
                                    target="_blank"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-4 py-2 text-xs font-mono rounded-full border"
                                    style={{
                                        background: "rgba(0, 209, 255, 0.15)",
                                        borderColor: "rgba(0, 209, 255, 0.4)",
                                        color: "#00D1FF"
                                    }}
                                >
                                    View Live
                                </motion.a>
                            )}

                            {repo && (
                                <motion.a
                                    href={repo}
                                    target="_blank"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-4 py-2 text-xs font-mono rounded-full border"
                                    style={{
                                        background: "rgba(255, 223, 0, 0.15)",
                                        borderColor: "rgba(255, 223, 0, 0.4)",
                                        color: "#FFDF00"
                                    }}
                                >
                                    View Code
                                </motion.a>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export function ProjectConstellationSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-200px" });

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (isInView) requestAnimationFrame(() => setReady(true));
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
    const radius = 380;

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
        <section ref={ref} className="min-h-[140vh] pt-20 pb-8 px-6 relative overflow-hidden">

            {/* STARS */}
            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ left: star.left, top: star.top }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
                    />
                ))}
            </div>

            <div className="relative z-10">

                <div className="text-center">
                    <h2 className="font-mono text-6xl md:text-7xl">
                        <span className="text-white mr-5">Project</span>
                        <span className="text-[#FFDF00]">Constellation</span>
                    </h2>
                </div>

                <div className="relative h-[1100px] max-w-[1400px] mx-auto">

                    {/* CORE */}
                    {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 40px rgba(255,223,0,0.4)',
                                    '0 0 80px rgba(0,209,255,0.4)',
                                    '0 0 40px rgba(255,223,0,0.4)',
                                ],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#FFDF00]/20 to-[#00D1FF]/20 flex items-center justify-center border border-white/20"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute w-40 h-40 bg-[#00D1FF]/20 rounded-full blur-3xl"
                            />
                            <Sparkles />
                        </motion.div>
                    </div> */}
                     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 40px rgba(255,223,0,0.4)',
                                    '0 0 80px rgba(0,209,255,0.4)',
                                    '0 0 40px rgba(255,223,0,0.4)',
                                ],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative w-32 h-32 rounded-full backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/20 to-[#00D1FF]/20 border border-white/30 flex items-center justify-center"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute w-40 h-40 bg-[#00D1FF]/20 rounded-full blur-3xl"
                            />

                            <div className="text-center relative z-10">
                                <Sparkles />
                                <div className="text-xs text-white mt-1 font-mono">
                                    MY CREATION
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ORBIT RING */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
                    >
                        <div
                            style={{ width: radius * 2, height: radius * 2 }}
                            className="rounded-full border border-dashed border-white/20"
                        />
                    </motion.div>

                    {/* CONNECTION LINES */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {formattedProjects.map((_, index) => {
                            const angle = index * angleStep;
                            const x = Math.cos((angle * Math.PI) / 180) * (radius - 110);
                            const y = Math.sin((angle * Math.PI) / 180) * (radius - 110);

                            return (
                                <motion.line
                                    key={index}
                                    x1="50%"
                                    y1="50%"
                                    x2={`calc(50% + ${x}px)`}
                                    y2={`calc(50% + ${y}px)`}
                                    stroke="rgba(255,255,255,0.25)"
                                    strokeWidth="1.2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={ready ? { pathLength: 1, opacity: 1 } : {}}
                                    transition={{ duration: 2, delay: index * 0.3 }}
                                />
                            );
                        })}
                    </svg>

                    {/* PROJECTS */}
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