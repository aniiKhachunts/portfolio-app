export interface ProjectCardProps {
    title: string;
    description: string;
    badge: string;
    angle: number;
    distance: number;
    color: string;
    live?: string;
    repo?: string;
}

export type ProjectBlock =
    | { type: "paragraph"; title?: string; text: string }
    | { type: "quote"; text: string; author?: string }
    | { type: "bullets"; title?: string; items: string[] }
    | { type: "image"; src: string; alt: string; caption?: string }
    | { type: "twoCol"; leftTitle?: string; left: string; rightTitle?: string; right: string }

export type ProjectTheme = {
    kind: "fluxsim" | "aurum" | "qb" | "aurora" | "solaris"
    base: string
    accent: string
    accent2: string
    glow1: string
    glow2: string
    pattern: "grid" | "dots" | "diagonal"
}

export type Project = {
    slug: string
    title: string
    subtitle: string
    year: string
    cover: string
    hero?: string
    repo?: string
    live?: string
    theme?: ProjectTheme
    intro: string
    brief: {
        context: string
        goal: string
        constraints?: string
    }
    highlights: string[]
    outcomes: {
        title: string
        text: string
    }[]
    details: {
        role: string
        timeline: string
        stack: string
        responsibilities: string
    }
    links?: {
        label: string
        href: string
    }[]
    gallery: Array<{ src: string; alt: string; caption?: string }>
    story: ProjectBlock[]
}

export const projects: Project[] = [
    {
        slug: "aurum-admin",
        title: "Aurum Admin",
        subtitle: "Lighthouse 99",
        year: "2026",
        cover: "/images/projects/aurum-admin/cover.png",
        hero: "/images/projects/aurum-admin/hero.png",
        repo: "https://github.com/aniiKhachunts/aurum-admin",
        live: "https://aurum-admin-pied.vercel.app/dashboard",
        theme: {
            kind: "aurum",
            base: "#0B0E14",
            accent: "#2563EB",
            accent2: "#22D3EE",
            glow1: "rgba(37,99,235,0.20)",
            glow2: "rgba(34,211,238,0.16)",
            pattern: "grid"
        },
        intro:
            "A full admin dashboard built like a real internal tool: sign-in, protected routes, structured data tables, and an interface designed for day-to-day operations. The focus is clarity, speed, and control — the UI is calm and consistent, while the system underneath supports real CRUD flows and traceable actions.",
        brief: {
            context:
                "Dashboards fail when they’re just “screens”: real admins need predictable structure, fast scanning, and confidence that actions are recorded and reversible. This project was built to feel like a production panel — not a demo page.",
            goal:
                "Deliver an admin that supports authenticated access, data management workflows, and audit-friendly patterns (clear entities, consistent tables, stable navigation, and action visibility).",
            constraints:
                "Keep the UI fast and clean even with data-heavy views, and structure the codebase so new entities and sections can be added without rewriting the foundation."
        },
        highlights: [
            "Authentication + protected routes for a real admin flow",
            "Data-driven tables and detail views designed for fast scanning",
            "Audit-aware structure: actions and changes are treated as first-class UX",
            "Componentized layout system for consistent pages and predictable extension"
        ],
        outcomes: [
            {
                title: "Operational UX",
                text: "The dashboard is structured around real usage: quick navigation, stable layouts, and clear action patterns that reduce mistakes and improve confidence."
            },
            {
                title: "Backend-ready foundation",
                text: "The app is wired to a real data layer and built to scale: adding a new entity is a repeatable process, not a redesign."
            }
        ],
        details: {
            role: "Front-end Development + Data Integration",
            timeline: "1–2 weeks",
            stack: "React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Router",
            responsibilities:
                "Auth + protected routing, data layer integration, dashboard layout system, table UX, error/loading states, deployment to Vercel"
        },
        links: [
            { label: "View", href: "https://aurum-admin-pied.vercel.app" },
            { label: "Repository", href: "https://github.com/aniiKhachunts/aurum-admin" }
        ],
        gallery: [
            {
                src: "/images/projects/aurum-admin/hero.png",
                alt: "Aurum Admin dashboard overview",
                caption: "Dashboard: a clean layout built for day-to-day admin work."
            },
            {
                src: "/videos/projects/aurum-admin/sections.mov",
                alt: "Aurum Admin sections overview",
                caption: "Dashboard: a clean layout built for day-to-day admin work."
            }
        ],
        story: [
            {
                type: "paragraph",
                title: "What this is",
                text:
                    "Aurum Admin is an internal-style dashboard used to manage entities through authenticated access. It’s designed around real operational needs: consistent navigation, repeatable page layouts, and data views that support scanning, filtering, and action-driven workflows."
            },
            {
                type: "twoCol",
                leftTitle: "UX focus",
                left:
                    "Calm structure, consistent spacing, and predictable components so the interface stays easy to use even when the data grows.",
                rightTitle: "Engineering focus",
                right:
                    "A scalable foundation: typed API mapping, centralized data fetching patterns, and page composition that makes adding sections straightforward."
            },
            {
                type: "bullets",
                title: "System patterns",
                items: [
                    "Protected routes and session-aware UI states",
                    "Server state handled through a predictable query layer",
                    "Clear loading / empty / error handling across pages",
                    "Reusable layout primitives for dashboard pages"
                ]
            },
            {
                type: "quote",
                text:
                    "The goal wasn’t to make it flashy — it was to make it feel reliable. Admin tools should feel like control, not chaos.",
                author: "Project note"
            }
        ]
    },
    {
        slug: "solaris-light-system",
        title: "Solaris",
        subtitle: "Physics and UI masterpiece",
        year: "2026",
        cover: "/images/projects/solaris/cover.png",
        hero: "/images/projects/solaris/hero.png",
        repo: "https://github.com/aniiKhachunts/solar-toggle",
        live: "https://solar-toggle.vercel.app/",
        theme: {
            kind: "solaris",
            base: "#0A0B10",
            accent: "#FFD60A",
            accent2: "#FFF3A3",
            glow1: "rgba(255,214,10,0.35)",
            glow2: "rgba(255,243,163,0.22)",
            pattern: "diagonal"
        },
        intro:
            "Solaris is an experimental, interaction-first UI playground where a draggable sun becomes the source of truth for the entire interface. Light is treated as a design driver: it shapes atmosphere, shadow direction, rim highlights, and the overall mood in real time — creating a cohesive, tactile system instead of a static theme toggle.",
        brief: {
            context:
                "Most UI systems are built on static tokens: fixed elevation, predefined themes, isolated motion. Solaris explores a different model — a physical, UI-driven system where one interactive light source defines how surfaces behave and how the interface feels.",
            goal:
                "Build a single-viewport playground where users manipulate a simulated sun and watch the UI respond as a coordinated system: day/night transitions, atmospheric blending, and cards that react with depth, shadow offset, and rim lighting.",
            constraints:
                "Keep the experience performant and readable in both modes, with effects that feel intentional rather than noisy — all within one viewport, without scrolling or layout breaks."
        },
        highlights: [
            "Draggable sun / moon controller as the primary interaction model",
            "Horizon-based day/night transition driven by sun height",
            "Atmospheric layering: sky, glow, aurora, and stars blend dynamically",
            "Position-aware cards with real-time shadow vectors and rim lighting",
            "Single-viewport layout with strict no-scroll UX"
        ],
        outcomes: [
            {
                title: "A physical interaction model",
                text: "Instead of switching themes, the user moves the light. The UI responds through coordinated depth cues — shadow direction, softness, glow intensity, and atmospheric mood."
            },
            {
                title: "System-level UI thinking",
                text: "Solaris demonstrates how global CSS variables can act as design tokens driven by interaction, keeping multiple components visually coherent under one rule set."
            }
        ],
        details: {
            role: "Concept, Design Direction, Front-end Development",
            timeline: "Exploratory build (several days)",
            stack: "React, TypeScript, Tailwind CSS, Motion, CSS Custom Properties",
            responsibilities:
                "Interaction model design, light math, atmospheric layering, typographic contrast tuning, card material system, viewport layout control"
        },
        links: [
            { label: "View", href: "https://solar-toggle.vercel.app/" },
            { label: "Repository", href: "https://github.com/aniiKhachunts/solar-toggle" },
        ],
        gallery: [
            {
                src: "/images/projects/solaris/hero.png",
                alt: "Solaris hero with draggable sun controller",
                caption: "A draggable sun drives atmosphere, depth, and mood across the UI."
            },
            {
                src: "/videos/projects/solaris/interaction.mp4",
                alt: "Solaris interaction demo",
                caption: "Crossing the horizon transitions the world from day to night in a single continuous system."
            }
        ],
        story: [
            {
                type: "paragraph",
                title: "The core idea",
                text:
                    "Solaris is a premium UI exploration built around one principle: light should drive design, not decorate it. A draggable sun defines a global light vector, and every surface responds — from atmospheric gradients to component shadows and rim highlights — as one coherent system."
            },
            {
                type: "twoCol",
                leftTitle: "Design direction",
                left:
                    "Minimal, typography-led composition with controlled glow. The goal is calm clarity, where light adds depth and mood without turning into visual noise.",
                rightTitle: "Engineering direction",
                right:
                    "A single source of truth powered by CSS custom properties. Components compute their response from shared variables, keeping behavior consistent and scalable across the interface."
            },
            {
                type: "bullets",
                title: "System mechanics",
                items: [
                    "Global --sun-x and --sun-y variables drive lighting across the UI",
                    "Horizon threshold controls a dusk coefficient for smooth transitions",
                    "Shadows offset in real time based on the light vector",
                    "Rim lighting uses masked radial gradients for material edges",
                    "Viewport-only layout to keep interaction intentional and uninterrupted"
                ]
            },
            {
                type: "quote",
                text: "Light should drive design, not decorate it.",
                author: "Solaris concept"
            }
        ]
    },
    {
        slug: "aurora-x1-landing",
        title: "Aurora X1 Landing",
        subtitle: "Future-Gen UI",
        year: "2025",
        cover: "/images/projects/aurora-x1/cover.png",
        hero: "/images/projects/aurora-x1/hero.png",
        repo: "https://github.com/aniiKhachunts/aurora-x1-landing",
        live: "https://aurora-x1-landing.vercel.app",
        theme: {
            kind: "aurora",
            base: "#070512",
            accent: "#C084FC",
            accent2: "#22D3EE",
            glow1: "rgba(192,132,252,0.22)",
            glow2: "rgba(34,211,238,0.14)",
            pattern: "diagonal"
        },
        intro:
            "A one-page landing that feels like a high-end product reveal. The layout is minimal and decisive, with motion used to lead attention through the narrative and create a sense of depth.",
        brief: {
            context:
                "The goal was to communicate a futuristic product identity quickly: a strong hero, a clean feature flow, and smooth interactions without visual overload.",
            goal:
                "Create a maintainable component-based landing page that stays crisp across devices and feels premium through motion and typography.",
            constraints:
                "Animations needed to stay smooth on lower-end devices and avoid layout shifts that break the “expensive” feel."
        },
        highlights: [
            "Hero moment built around typography + controlled glow",
            "Reusable section blocks for feature storytelling",
            "Motion system with consistent easing and timing"
        ],
        outcomes: [
            {
                title: "Clarity at speed",
                text: "Information is structured so users can scan fast, while motion reinforces hierarchy instead of adding noise."
            },
            {
                title: "Premium feel through restraint",
                text: "The design leans on contrast, spacing and subtle light rather than heavy gradients or decorations."
            }
        ],
        details: {
            role: "Design + Front-end Development",
            timeline: "1–2 weeks",
            stack: "React, TypeScript, Tailwind CSS, Framer Motion",
            responsibilities:
                "Layout composition, responsive implementation, motion design, UI polish, component refactor for reuse"
        },
        links: [
            { label: "View", href: "https://aurora-x1-landing.vercel.app" },
            { label: "Repository", href: "https://github.com/aniiKhachunts/aurora-x1-landing" }
        ],
        gallery: [
            {
                src: "/images/projects/aurora-x1/hero.png",
                alt: "Aurora X1 hero",
                caption: "Hero section: decisive typography and controlled glow."
            },
            {
                src: "/videos/projects/aurora-x1/sections.mp4",
                alt: "Aurora X1 sections",
                caption: "Section rhythm: consistent spacing and readable feature blocks."
            }
        ],
        story: [
            {
                type: "paragraph",
                title: "The concept",
                text:
                    "Instead of building a “feature list”, the page is structured like a guided reveal: establish the vibe, deliver benefits, then reinforce trust with consistent structure."
            },
            {
                type: "twoCol",
                leftTitle: "Motion rules",
                left:
                    "Animations are subtle and predictable: reveal on entry, micro-feedback on hover, and minimal parallax-like cues to add depth.",
                rightTitle: "Layout rules",
                right:
                    "Text-first sections, strict spacing, and stable containers to prevent shifts and keep the page calm."
            },
            {
                type: "bullets",
                title: "Key decisions",
                items: [
                    "Keep typography as the primary visual material",
                    "Use one highlight color, never a rainbow",
                    "Structure sections as reusable blocks",
                    "Prefer stable motion over “flashy” motion"
                ]
            }
        ]
    },
    {
        slug: "qb-leaders-site",
        title: "QB Leaders",
        subtitle: "Fintech Excellence",
        year: "2025",
        cover: "/images/projects/qb-leaders/cover.png",
        hero: "/images/projects/qb-leaders/hero.png",
        repo: "https://github.com/aniiKhachunts/qb-leaders",
        live: "https://qbleaders.com",
        theme: {
            kind: "qb",
            base: "#070707",
            accent: "#22C55E",
            accent2: "#4ADE80",
            glow1: "rgba(34,197,94,0.22)",
            glow2: "rgba(74,222,128,0.16)",
            pattern: "dots"
        },
        intro:
            "A finance website designed to feel trustworthy and modern: minimal styling, clean typography, and subtle motion that adds polish without reducing credibility.",
        brief: {
            context:
                "For a finance company, trust comes from clarity. The site needed a clean structure, strong readability, and a calm visual tone.",
            goal:
                "Design and implement a minimal, professional site with premium spacing and small interactions that feel modern and intentional.",
            constraints:
                "Avoid “too much” visual experimentation — the brand should feel stable and credible."
        },
        highlights: [
            "Trust-first typography and section hierarchy",
            "Subtle motion to add modern polish",
            "Designed and deployed end-to-end"
        ],
        outcomes: [
            {
                title: "Credibility through clarity",
                text: "The layout prioritizes readability and structure, which is crucial for finance-oriented audiences."
            },
            {
                title: "Modern but restrained",
                text: "Motion is minimal and supportive, giving the site a contemporary feel without looking playful."
            }
        ],
        details: {
            role: "Design + Development + Deployment",
            timeline: "1–2 weeks",
            stack: "React, TypeScript, Tailwind CSS",
            responsibilities:
                "Full design, responsive build, content structure, deployment setup and delivery"
        },
        links: [
            { label: "View", href: "https://qbleaders.com/" },
            {
                label: "Repository",
                href: "https://github.com/aniiKhachunts/qb-leaders"
            }
        ],
        gallery: [
            {
                src: "/images/projects/qb-leaders/hero.png",
                alt: "QB Leaders hero",
                caption: "Minimal hero composition designed for trust and clarity."
            }
        ],
        story: [
            {
                type: "paragraph",
                title: "Why it works",
                text:
                    "Finance websites should feel calm. This project focuses on typography, spacing, and a clean information flow that makes the content easy to trust."
            },
            {
                type: "twoCol",
                leftTitle: "Design focus",
                left:
                    "Clean sections, consistent rhythm, and careful contrast so the page feels stable and professional.",
                rightTitle: "Build focus",
                right:
                    "Componentized sections with predictable layouts, making content updates straightforward."
            }
        ]
    },
    {
        slug: "fluxsim-crypto",
        title: "FluxSim",
        subtitle: "Web3 Visualization",
        year: "2025",
        cover: "/images/projects/fluxsim/cover.png",
        hero: "/images/projects/fluxsim/hero.png",
        repo: "https://github.com/aniiKhachunts/fluxsim-crypto",
        live: "https://fluxsim-crypto.vercel.app",
        theme: {
            kind: "fluxsim",
            base: "#05090B",
            aaccent: "#2AF7DE",
            accent2: "#22D3EE",
            glow1: "rgba(42,247,222,0.22)",
            glow2: "rgba(34,211,238,0.16)",
            pattern: "grid"
        },
        intro:
            "A clean, modern crypto landing focused on hierarchy and atmosphere. The page is intentionally minimal, with polished interactions that make the experience feel responsive and expensive.",
        brief: {
            context:
                "Crypto pages often become visually noisy. The aim here was the opposite: calm, confident UI with careful details and smooth performance.",
            goal:
                "Deliver a landing that feels premium through spacing, contrast, and micro-interactions, while staying responsive and fast.",
            constraints:
                "Keep effects light and controllable so the page doesn’t turn into a heavy animation demo."
        },
        highlights: [
            "Minimal composition with strong hierarchy",
            "Micro-interactions that make UI feel tactile",
            "Responsive design that keeps the same vibe on mobile"
        ],
        outcomes: [
            {
                title: "Premium minimalism",
                text: "A dark, clean surface with consistent spacing creates a premium feel without relying on heavy visuals."
            },
            {
                title: "Maintainable structure",
                text: "Sections follow a predictable structure to make updates and iteration easy."
            }
        ],
        details: {
            role: "Front-end Development",
            timeline: "Several days",
            stack: "React, TypeScript, Tailwind CSS",
            responsibilities:
                "Responsive layout, UI polish, component structure, interaction tuning"
        },
        links: [
            { label: "View", href: "https://fluxsim-crypto.vercel.app" },
            { label: "Repository", href: "https://github.com/aniiKhachunts/fluxsim-crypto" }
        ],
        gallery: [
            {
                src: "/images/projects/fluxsim/hero.png",
                alt: "FluxSim hero",
                caption: "Hero: calm layout, strong type, minimal highlights."
            },
            {
                src: "/videos/projects/fluxsim/sections.mov",
                alt: "FluxSim sections",
                caption: "Section rhythm: consistent spacing and readable feature blocks."
            }
        ],
        story: [
            {
                type: "paragraph",
                title: "Approach",
                text:
                    "The page is built to feel calm and confident. Instead of stacking visuals, the design uses whitespace and typographic hierarchy to create structure."
            },
            {
                type: "bullets",
                title: "Polish details",
                items: [
                    "Hover feedback tuned to feel responsive",
                    "Consistent spacing rhythm between sections",
                    "Text contrast calibrated for readability on black"
                ]
            }
        ]
    },
]