import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            onClick={scrollToTop}
            style={{ opacity, scale }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="sun"
            className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full
                 bg-gradient-to-br from-[#FFDF00]/20 to-[#00D1FF]/20
                 backdrop-blur-xl border-2 border-[#FFDF00]/40
                 hover:border-[#FFDF00] transition-all duration-300
                 flex items-center justify-center group"
        >
            <ArrowUp
                className="text-[#FFDF00] group-hover:translate-y-[-2px] transition-transform"
                size={24}
            />
        </motion.button>
    );
}
