import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onLoadingComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
        >
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h1 className="text-6xl font-light mb-2">
                        <span className="text-white">ANI</span>
                        <span className="text-[#FFDF00]"> KHACHUNTS</span>
                    </h1>
                    <p className="text-[#00D1FF] font-mono text-sm tracking-widest">
                        INITIALIZING SYSTEM
                    </p>
                </motion.div>

                <div className="w-80 mx-auto">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#FFDF00] to-[#00D1FF]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono text-white/60">
                        <span>Loading...</span>
                        <span>{progress}%</span>
                    </div>
                </div>

                <div className="flex gap-2 justify-center mt-8">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-[#00D1FF]"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
