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

    const x = angle
    const y = distance

    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                zIndex: isHovered ? 100 : 50
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <div
                    className="w-[300px] p-6 rounded-2xl border backdrop-blur-xl"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: `${color}40`,
                        boxShadow: isHovered
                            ? `0 0 60px ${color}30`
                            : `0 0 20px ${color}15`
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

    const layout = [
        { x: -40, y: -300 },   // top (slightly left, not centered)
        { x: 340, y: -120 },   // right top (higher + further)
        { x: 280, y: 220 },    // right bottom (closer inward)
        { x: -320, y: 180 },   // left bottom (wider)
        { x: -260, y: -60 },   // left top (closer to center)
    ]

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
        <section ref={ref} className="pt-32 pb-32 px-5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                {stars.map((star, i) => (
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
                ))}
            </div>

            <div className="relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-mono leading-tight">
                        <span className="block text-white text-3xl md:text-7xl">
                            Project
                        </span>
                        <span className="block text-[#FFDF00] text-3xl md:text-7xl">
                            Constellation
                        </span>
                    </h2>
                </div>

                <div className="relative max-w-[1200px] mx-auto h-[950px]">

                    {isMobile ? (
                        <div className="flex flex-col items-center gap-6">
                            {formattedProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={ready ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: index * 0.1 }}
                                    className="w-full max-w-[360px]"
                                >
                                    <div
                                        className="p-5 rounded-2xl border backdrop-blur-xs"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: `${project.color}30`,
                                            boxShadow: `0 0 30px ${project.color}15`
                                        }}
                                    >
                                        <h3 className="text-lg font-bold mb-1" style={{ color: project.color }}>
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
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className="w-32 h-32 rounded-full backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/20 to-[#00D1FF]/20 border border-white/30 flex items-center justify-center">
                                    <div className="text-center">
                                        <Sparkles />
                                        <div className="text-xs text-white mt-1 font-mono">
                                            MY CREATION
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <svg
                                className="absolute left-1/2 top-1/2 pointer-events-none z-10"
                                width={800}
                                height={800}
                                viewBox="-400 -400 800 800"
                                style={{ transform: 'translate(-50%, -50%)' }}
                            >
                                {layout.map((pos, index) => (
                                    <motion.line
                                        key={index}
                                        x1={0}
                                        y1={0}
                                        x2={pos.x}
                                        y2={pos.y}
                                        stroke="rgba(255,255,255,0.35)"
                                        strokeWidth="1.5"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={ready ? { pathLength: 1, opacity: 1 } : {}}
                                        transition={{ duration: 1, delay: index * 0.15 }}
                                    />
                                ))}
                            </svg>

                            {ready &&
                                formattedProjects.map((project, index) => {
                                    const pos = layout[index]

                                    return (
                                        <ProjectCard
                                            key={project.title}
                                            {...project}
                                            angle={pos.x}
                                            distance={pos.y}
                                        />
                                    )
                                })}
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}