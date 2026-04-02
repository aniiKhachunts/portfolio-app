import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Play, Pause } from 'lucide-react';

function useSmoothedRandomWalk(isPlaying: boolean, target: number, smoothingFactor = 0.1) {
    const [value, setValue] = useState(target);
    const targetRef = useRef(target);

    useEffect(() => {
        targetRef.current = target;
    }, [target]);

    useEffect(() => {
        if (!isPlaying) return;
        let animationFrameId: number;

        const animate = () => {
            setValue(prev => {
                const diff = targetRef.current - prev;
                return prev + diff * smoothingFactor;
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying, smoothingFactor]);

    return value;
}

export function MusicianSection() {
    const ref = useRef(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [dataArray, setDataArray] = useState<Uint8Array<ArrayBuffer> | null>(null);
    const [particlesReady, setParticlesReady] = useState(false);
    const [, setTick] = useState(0);
    const animationRef = useRef<number>(0);

    const [, setAvgLow] = useState(0);
    const [, setAvgMid] = useState(0);
    const [avgHigh, setAvgHigh] = useState(0);

    const smoothHigh = useSmoothedRandomWalk(isPlaying, avgHigh, 0.12);

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
            analyserNode.fftSize = 512;

            const bufferLength = analyserNode.frequencyBinCount;
            const dataArr = new Uint8Array(bufferLength);

            const audio = new Audio('/audio/violin.mp3');
            audio.crossOrigin = 'anonymous';
            audio.loop = false;

            const source = ctx.createMediaElementSource(audio);
            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0, ctx.currentTime);

            source.connect(gainNode);
            gainNode.connect(analyserNode);
            analyserNode.connect(ctx.destination);

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
                if (audioContext) audioContext.close();
                setIsPlaying(false);
            }, 500);
        }
    };

    useEffect(() => {
        if (isPlaying && analyser && dataArray) {
            const draw = () => {
                analyser.getByteFrequencyData(dataArray);
                const bufferLength = analyser.frequencyBinCount;

                const lowEnd = Math.floor(bufferLength * 0.1);
                const midEnd = Math.floor(bufferLength * 0.5);

                let lowSum = 0, midSum = 0, highSum = 0;
                for (let i = 0; i < lowEnd; i++) lowSum += dataArray[i];
                for (let i = lowEnd; i < midEnd; i++) midSum += dataArray[i];
                for (let i = midEnd; i < bufferLength; i++) highSum += dataArray[i];

                setAvgLow(lowSum / lowEnd / 255);
                setAvgMid(midSum / (midEnd - lowEnd) / 255);
                setAvgHigh(highSum / (bufferLength - midEnd) / 255);

                setTick(t => t + 1);
                animationRef.current = requestAnimationFrame(draw);
            };
            draw();
        } else {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            setAvgLow(0); setAvgMid(0); setAvgHigh(0);
        }
    }, [isPlaying, analyser, dataArray]);

    const particles = useMemo(() => {
        return [...Array(50)].map((_, i) => ({
            id: i,
            baseSpeed: 0.1 + Math.random() * 0.3,
            baseSize: 3 + Math.random() * 6,
            angle: Math.random() * Math.PI * 2,
            distance: 100 + Math.random() * 150,
            color: i % 2 ? '#FFDF00' : '#00D1FF'
        }));
    }, []);

    useEffect(() => {
        if (isInView) {
            const t = setTimeout(() => setParticlesReady(true), 300);
            return () => clearTimeout(t);
        }
    }, [isInView]);

    return (
        <section ref={ref} className="min-h-screen py-32 px-6 relative overflow-hidden bg-black text-white">

            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#FFDF00] blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#00D1FF] blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-6xl md:text-8xl mb-6 tracking-tight">
                        <span className="font-sans font-extralight text-white/90">Engineering</span>{' '}
                        <span className="font-sans font-bold text-[#FFDF00]">Harmony</span>
                    </h2>
                    <p className="text-white/50 text-3xl font-mono tracking-wider">Code & Violin</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative h-[700px] flex items-center justify-center group"
                    >
                        <motion.div
                            className="relative z-10 w-full max-w-[400px] aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <img
                                src="/images/ani.jpeg"
                                alt="Ani"
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        </motion.div>

                        <div className="absolute inset-0 pointer-events-none z-0">
                            {particles.map((p) => {
                                const dynamicDist =
                                    p.distance +
                                    (particlesReady ? 80 : 0) +
                                    (isPlaying ? smoothHigh * 100 : 0);

                                const baseX = Math.cos(p.angle) * dynamicDist;
                                const baseY = Math.sin(p.angle) * dynamicDist;

                                const floatOffsetX = Math.sin(Date.now() * 0.001 + p.id) * 6;
                                const floatOffsetY = Math.cos(Date.now() * 0.001 + p.id) * 6;

                                const playingBoostX = isPlaying ? Math.sin(Date.now() * 0.003 + p.id) * 12 : 0;
                                const playingBoostY = isPlaying ? Math.cos(Date.now() * 0.003 + p.id) * 12 : 0;

                                const dynamicSize =
                                    p.baseSize + (isPlaying ? smoothHigh * 10 : 0);

                                return (
                                    <motion.div
                                        key={p.id}
                                        className="absolute rounded-full"
                                        style={{
                                            width: `${dynamicSize}px`,
                                            height: `${dynamicSize}px`,
                                            backgroundColor: p.color,
                                            top: '50%',
                                            left: '50%',
                                        }}
                                        initial={{
                                            x: 0,
                                            y: 0,
                                            opacity: 0,
                                            scale: 0.5,
                                        }}
                                        animate={{
                                            x: baseX + floatOffsetX + playingBoostX,
                                            y: baseY + floatOffsetY + playingBoostY,
                                            opacity: particlesReady ? 0.4 : 0,
                                            scale: particlesReady ? 1 : 0.6,
                                            boxShadow: `0 0 ${dynamicSize * 4}px ${p.color}`,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 40,
                                            damping: 18,
                                            mass: 2,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-12"
                    >
                        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 border border-white/10">
                            <h3 className="text-3xl mb-6 text-white font-sans font-medium tracking-tight">The Unique Intersection</h3>
                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                Years of violin performance trained my ear for precision, timing, and harmony.
                                These same principles drive my approach to code—structuring systems that
                                resonate and perform with elegance.
                            </p>

                            <motion.button
                                onClick={toggleAudio}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-6 rounded-2xl bg-gradient-to-r from-[#FFDF00]/20 to-[#00D1FF]/20
                                border-2 border-[#FFDF00]/40 hover:border-[#FFDF00]
                                transition-all duration-300 flex items-center justify-center gap-4"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#FFDF00]/30 flex items-center justify-center">
                                    {isPlaying ? <Pause className="text-[#FFDF00]" size={28} /> : <Play className="text-[#FFDF00] ml-1" size={28} />}
                                </div>
                                <div className="text-left">
                                    <div className="text-[#FFDF00] font-mono text-base font-bold tracking-widest">{isPlaying ? 'PLAYING' : 'PLAY DEMO'}</div>
                                    <div className="text-white/60 text-sm">Horizontal Frequency Map</div>
                                </div>
                            </motion.button>

                            <div className="mt-8 h-32 rounded-2xl bg-black/60 border border-[#FFDF00]/20 p-5 overflow-hidden">
                                <div className="flex items-end justify-center h-full gap-[3px]">
                                    {Array.from({ length: 64 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex-1 rounded-t-sm bg-gradient-to-t from-[#FFDF00] via-[#00D1FF] to-white"
                                            animate={{
                                                height: isPlaying && dataArray
                                                    ? `${Math.max(6, (dataArray[i * 2] / 255) * 100)}%`
                                                    : '6%',
                                                opacity: isPlaying && dataArray ? 0.3 + (dataArray[i * 2] / 255) * 0.7 : 0.3,
                                            }}
                                            transition={{ type: "spring", bounce: 0, duration: 0.08 }}
                                            style={{ minHeight: '6%' }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5 flex items-center gap-3 text-sm text-white/50 font-mono tracking-wider">
                                <div className={`w-2.5 h-2.5 rounded-full bg-[#FFDF00] ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} />
                                {isPlaying ? 'Live Analysis: Active' : 'System Standby'}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="backdrop-blur-xl bg-gradient-to-br from-[#00D1FF]/10 to-transparent rounded-3xl p-8 border border-[#00D1FF]/20"
                        >
                            <p className="text-white/90 italic text-lg leading-relaxed">
                                "Music taught me that complexity emerges from simple, well-composed elements. Coding is the architecture; performance is the interface."
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}