import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    return (
        <>
            {/* Top progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFDF00] via-[#00D1FF] to-[#FFDF00] origin-left z-[9999]"
                style={{ scaleX }}
            />

            {/* Side progress indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                <div className="flex flex-col gap-4">
                    {['Hero', 'Philosophy', 'Projects', 'Skills', 'Music', 'Contact'].map((section, i) => {
                        const isActive = useTransform(
                            scrollYProgress,
                            [(i / 6), ((i + 1) / 6)],
                            [0, 1]
                        );

                        return (
                            <motion.div
                                key={section}
                                className="group relative"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <motion.div
                                    className="w-2 h-2 rounded-full border-2 border-white/30 transition-all duration-300"
                                    style={{
                                        backgroundColor: useTransform(
                                            isActive,
                                            [0, 1],
                                            ['rgba(255, 255, 255, 0)', '#FFDF00']
                                        )
                                    }}
                                />
                                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                              transition-opacity whitespace-nowrap">
                                    <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20
                                text-xs font-mono text-white">
                                        {section}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}