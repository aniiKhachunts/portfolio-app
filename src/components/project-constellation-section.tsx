import { motion, useInView } from 'motion/react'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { projects, type ProjectCardProps } from '../data/projects'

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
    const [isHovered, setIsHovered] = useState(false)

    const x = Math.cos((angle * Math.PI) / 180) * distance
    const y = Math.sin((angle * Math.PI) / 180) * distance

    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                zIndex: 50
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <div
                    className="w-[360px] p-6 rounded-2xl border backdrop-blur-xl"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
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

                    <p className="text-white/70 text-sm mb-4">{description}</p>

                    <div className="flex gap-3">
                        {live && (
                            <a
                                href={live}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 text-xs font-mono rounded-full border"
                                style={{
                                    background: 'rgba(0, 209, 255, 0.15)',
                                    borderColor: 'rgba(0, 209, 255, 0.4)',
                                    color: '#00D1FF'
                                }}
                            >
                                View Live
                            </a>
                        )}

                        {repo && (
                            <a
                                href={repo}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 text-xs font-mono rounded-full border"
                                style={{
                                    background: 'rgba(255, 223, 0, 0.15)',
                                    borderColor: 'rgba(255, 223, 0, 0.4)',
                                    color: '#FFDF00'
                                }}
                            >
                                View Code
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export function ProjectConstellationSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-200px' })
    const [ready, setReady] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isInView) requestAnimationFrame(() => setReady(true))
    }, [isInView])

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const formattedProjects = projects.map((p) => ({
        title: p.title,
        description: p.subtitle,
        badge: p.year,
        color: p.theme?.accent ?? '#22D3EE',
        live: p.live,
        repo: p.repo
    }))

    const count = formattedProjects.length
    const angleStep = 360 / count
    const radius = 380

    const stars = useMemo(
        () =>
            Array.from({ length: 40 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 2
            })),
        []
    )

    return (
        <section
            ref={ref}
            className="pt-20 pb-32 px-5 relative overflow-hidden"
        >
            {/* STARS */}
            < div className="absolute inset-0 pointer-events-none z-0">
                {
                    stars.map((star, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{ left: star.left, top: star.top }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay
                            }}
                        />
                    ))
                }
            </div >

            <div className="relative z-10">

                {/* TITLE (fixed alignment) */}
                <div className="text-center mb-14 md:mb-20 px-2">
                    <h2 className="font-mono leading-tight">
                        <span className="block text-white text-3xl md:text-7xl">
                            Project
                        </span>
                        <span className="block text-[#FFDF00] text-3xl md:text-7xl">
                            Constellation
                        </span>
                    </h2>
                </div>

                <div className="relative max-w-[1200px] mx-auto">

                    {/* MOBILE — CLEAN STACK */}
                    {isMobile ? (
                        <div className="flex flex-col items-center gap-6">

                            {formattedProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={ready ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: index * 0.1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full max-w-[360px]"
                                >
                                    <div
                                        className="p-5 rounded-2xl border backdrop-blur-xl"
                                        style={{
                                            background: `
        linear-gradient(
            180deg,
            rgba(255,255,255,0.03),
            rgba(0,0,0,0.45)
        )
    `,
                                            borderColor: `${project.color}30`,
                                            boxShadow: `0 0 40px ${project.color}20`
                                        }}

                                    >
                                        <h3
                                            className="text-lg font-bold mb-1"
                                            style={{ color: project.color }}
                                        >
                                            {project.title}
                                        </h3>

                                        <div
                                            className="inline-block px-2 py-1 rounded-full text-xs mb-2"
                                            style={{
                                                backgroundColor: `${project.color}20`,
                                                color: project.color
                                            }}
                                        >
                                            {project.badge}
                                        </div>

                                        <p className="text-white/60 text-sm mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex gap-2">
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-3 py-1.5 text-xs font-mono rounded-full border"
                                                    style={{
                                                        background: `${project.color}14`,
                                                        borderColor: `${project.color}50`,
                                                        color: project.color
                                                    }}
                                                >
                                                    Live
                                                </a>
                                            )}

                                            {project.repo && (
                                                <a
                                                    href={project.repo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-3 py-1.5 text-xs font-mono rounded-full border border-white/15 text-white/75"
                                                >
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* DESKTOP (unchanged constellation) */}

                            <div className="flex justify-center mb-16 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/20 to-[#00D1FF]/20 border border-white/30 flex items-center justify-center">
                                    <div className="text-center">
                                        <Sparkles />
                                        <div className="text-[10px] md:text-xs text-white mt-1 font-mono">
                                            MY CREATION
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <svg
                                className="absolute left-1/2 top-1/2 pointer-events-none z-10"
                                width={radius * 2}
                                height={radius * 2}
                                viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                                style={{ transform: 'translate(-50%, -50%)' }}
                            >
                                {formattedProjects.map((_, index) => {
                                    const angle = index * angleStep
                                    const x = Math.cos((angle * Math.PI) / 180) * radius
                                    const y = Math.sin((angle * Math.PI) / 180) * radius

                                    return (
                                        <motion.line
                                            key={index}
                                            x1={0}
                                            y1={0}
                                            x2={x}
                                            y2={y}
                                            stroke="rgba(255,255,255,0.35)"
                                            strokeWidth="1.5"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={ready ? { pathLength: 1, opacity: 1 } : {}}
                                            transition={{
                                                duration: 1.2,
                                                delay: index * 0.2
                                            }}
                                        />
                                    )
                                })}
                            </svg>

                            {ready &&
                                formattedProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.title}
                                        {...project}
                                        angle={index * angleStep}
                                        distance={radius}
                                    />
                                ))}
                        </>
                    )}
                </div>
            </div>
        </section >
    )
}