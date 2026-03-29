import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

export function MusicianSection() {
    const ref = useRef(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [dataArray, setDataArray] = useState<Uint8Array<ArrayBuffer> | null>(null);
    const [, setTick] = useState(0);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (audioContext) audioContext.close();
        };
    }, [audioContext]);

    const toggleAudio = async () => {
        if (!isPlaying) {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

            if (ctx.state === 'suspended') await ctx.resume();

            const analyserNode = ctx.createAnalyser();
            analyserNode.fftSize = 256;

            const bufferLength = analyserNode.frequencyBinCount;
            const dataArr = new Uint8Array(bufferLength);

            // 🎵 CREATE AUDIO ELEMENT
            const audio = new Audio('/audio/violin.mp3');
            audio.crossOrigin = 'anonymous';
            audio.loop = false;

            // 🎵 CONNECT TO AUDIO CONTEXT
            const source = ctx.createMediaElementSource(audio);

            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0, ctx.currentTime);

            source.connect(gainNode);
            gainNode.connect(analyserNode);
            analyserNode.connect(ctx.destination);

            // fade in
            gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1);

            gainRef.current = gainNode;
            audioRef.current = audio;

            audio.play();

            audio.onended = () => {
                setIsPlaying(false);
                ctx.close();
            };

            setAudioContext(ctx);
            setAnalyser(analyserNode);
            setDataArray(dataArr);
            setIsPlaying(true);
        } else {
            if (gainRef.current && audioContext) {
                gainRef.current.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
            }

            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }

                if (audioContext) {
                    audioContext.close();
                }

                setIsPlaying(false);
            }, 500);

            if (audioContext) {
                await audioContext.close();
            }

            setIsPlaying(false);
        }
    };

    // Visualizer animation loop
    useEffect(() => {
        if (isPlaying && analyser && dataArray) {
            const draw = () => {
                analyser.getByteFrequencyData(dataArray);
                setTick(t => t + 1); // Trigger re-render to update bar heights
                animationRef.current = requestAnimationFrame(draw);
            };
            draw();
        } else {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
    }, [isPlaying, analyser, dataArray]);

    return (
        <section ref={ref} className="min-h-screen py-32 px-6 relative overflow-hidden bg-black">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl md:text-7xl mb-6">
                        <span className="font-mono text-white">Engineering</span>{' '}
                        <span className="font-mono text-[#FFDF00]">Harmony</span>
                    </h2>
                    <p className="text-white/60 text-2xl font-mono">Code & Violin</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/10 to-[#00D1FF]/10
                            border border-white/20 p-8 aspect-square flex items-center justify-center">
                            <svg viewBox="0 0 200 400" className="w-full h-full opacity-20">
                                <defs>
                                    <linearGradient id="violinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FFDF00" />
                                        <stop offset="100%" stopColor="#00D1FF" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M 100 50 Q 80 80, 85 120 Q 90 140, 85 170 Q 80 200, 85 230 Q 90 260, 85 290 Q 80 320, 100 350 Q 120 320, 115 290 Q 110 260, 115 230 Q 120 200, 115 170 Q 110 140, 115 120 Q 120 80, 100 50"
                                    stroke="url(#violinGradient)" strokeWidth="2" fill="none"
                                />
                                <path d="M 90 180 Q 85 200, 90 220" stroke="url(#violinGradient)" strokeWidth="2" fill="none" />
                                <path d="M 110 180 Q 115 200, 110 220" stroke="url(#violinGradient)" strokeWidth="2" fill="none" />
                                <line x1="100" y1="60" x2="100" y2="340" stroke="url(#violinGradient)" strokeWidth="1" opacity="0.5" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#FFDF00]/20 to-[#00D1FF]/20
                               border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                                    <Music className="text-white/60" size={64} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Audio Visualizer Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-2xl mb-4 text-white">The Unique Intersection</h3>
                            <p className="text-white/70 leading-relaxed mb-6">
                                Years of violin performance trained my ear for precision, timing, and harmony.
                                These same principles drive my approach to code.
                            </p>

                            <motion.button
                                onClick={toggleAudio}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-6 rounded-2xl bg-gradient-to-r from-[#FFDF00]/20 to-[#00D1FF]/20
                                border-2 border-[#FFDF00]/40 hover:border-[#FFDF00]
                                transition-all duration-300 flex items-center justify-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#FFDF00]/30 flex items-center justify-center">
                                    {isPlaying ? <Pause className="text-[#FFDF00]" size={24} /> : <Play className="text-[#FFDF00] ml-1" size={24} />}
                                </div>
                                <div className="text-left">
                                    <div className="text-[#FFDF00] font-mono text-sm">{isPlaying ? 'PLAYING' : 'PLAY DEMO'}</div>
                                    <div className="text-white/60 text-xs">Horizontal Frequency Map</div>
                                </div>
                            </motion.button>

                            {/* Frequency Visualizer - 64 bars for high horizontal density */}
                            <div className="mt-6 h-32 rounded-2xl bg-black/40 border border-[#FFDF00]/20 p-4 overflow-hidden">
                                <div className="flex items-end justify-center h-full gap-[2px]">
                                    {Array.from({ length: 64 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex-1 rounded-t-full bg-gradient-to-t from-[#FFDF00] via-[#00D1FF] to-white"
                                            animate={{
                                                height: isPlaying && dataArray
                                                    ? `${Math.max(8, (dataArray[i * 2] / 255) * 100)}%`
                                                    : '8%',
                                            }}
                                            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                                            style={{ minHeight: '8%' }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-white/50 font-mono">
                                <div className={`w-2 h-2 rounded-full bg-[#FFDF00] ${isPlaying ? 'animate-pulse' : ''}`} />
                                {isPlaying ? 'Live Analysis' : 'System Standby'}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="backdrop-blur-xl bg-gradient-to-br from-[#00D1FF]/5 to-transparent rounded-2xl p-6 border border-[#00D1FF]/20"
                        >
                            <p className="text-white/80 italic leading-relaxed">
                                "Music taught me that complexity emerges from simple, well-composed elements."
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}