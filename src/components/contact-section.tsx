import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { SiGithub, SiInstagram } from '@icons-pack/react-simple-icons';

const Medium = ({ className, size = 32 }: { className?: string; size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 1043.63 592.71"
        fill="currentColor"
        className={className}
    >
        <circle cx="296.96" cy="296.35" r="296.35" />
        <ellipse cx="683.43" cy="296.35" rx="185.38" ry="296.35" />
        <ellipse cx="921.99" cy="296.35" rx="121.64" ry="296.35" />
    </svg>
);

const Linkedin = ({ className, size = 24 }: { className?: string, size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

type ChatMessage = {
    role: 'user' | 'ai';
    text: string;
};

export function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [command, setCommand] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'ai', text: 'Hi 👋 I’m Ani’s assistant.' },
        { role: 'ai', text: 'You can ask about projects, skills, or type “contact” to send a message.' }
    ]);

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = messagesContainerRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [messages]);

    const appendAiMessages = (responses: string[]) => {
        responses.forEach((text, index) => {
            window.setTimeout(() => {
                setMessages((prev) => [...prev, { role: 'ai', text }]);
            }, 250 + index * 450);
        });
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();

        const input = command.trim();
        if (!input) return;

        const lower = input.toLowerCase();

        setMessages((prev) => [...prev, { role: 'user', text: input }]);
        setCommand('');

        const openContact = () => {
            window.setTimeout(() => setShowModal(true), 700);
        };

        const openGithub = () => {
            window.setTimeout(() => window.open('https://github.com/aniiKhachunts', '_blank', 'noopener,noreferrer'), 700);
        };

        const openLinkedin = () => {
            window.setTimeout(() => window.open('https://linkedin.com/in/ani-khachunts', '_blank', 'noopener,noreferrer'), 700);
        };

        if (/\b(hi|hello|hey)\b/.test(lower)) {
            appendAiMessages([
                'Hey 👋',
                'You can ask about my projects, skills, or how we can work together.'
            ]);
            return;
        }

        if (/\b(project|projects|portfolio|work)\b/.test(lower)) {
            appendAiMessages([
                'Ani builds premium interactive web experiences with strong UI, motion, and system thinking.',
                'You can explore the projects above, or type “contact” if you want to build something similar.'
            ]);
            return;
        }

        if (/\b(skill|skills|stack|tech|technology|frontend|backend)\b/.test(lower)) {
            appendAiMessages([
                'Core stack includes React, Next.js, TypeScript, Motion, Tailwind, Node.js, Prisma, and Supabase.',
                'The focus is always on performance, clarity, and premium UI quality.'
            ]);
            return;
        }

        if (/\b(contact|hire|collab|collaborate|message|build together)\b/.test(lower)) {
            appendAiMessages([
                'Amazing — let’s build something great 🚀',
                'Opening the message form now.'
            ]);
            setTimeout(() => setShowModal(true), 800);
            return;
        }

        if (/\b(email|mail)\b/.test(lower)) {
            appendAiMessages([
                'You can reach out directly at:',
                'ani.khachunts@example.com'
            ]);
            return;
        }

        if (/\b(github|code|repo|repositories)\b/.test(lower)) {
            appendAiMessages([
                'Opening GitHub profile...'
            ]);
            openGithub();
            return;
        }

        if (/\b(linkedin|profile|cv|resume)\b/.test(lower)) {
            appendAiMessages([
                'Opening LinkedIn profile...'
            ]);
            openLinkedin();
            return;
        }

        if (/\b(help)\b/.test(lower)) {
            appendAiMessages([
                'You can ask me about:',
                '• projects',
                '• skills',
                '• contact',
                '• email',
                '• github',
                '• linkedin'
            ]);
            return;
        }

        if (/\b(clear|reset)\b/.test(lower)) {
            setMessages([
                { role: 'ai', text: 'Chat cleared.' },
                { role: 'ai', text: 'Ask about projects, skills, or type “contact”.' }
            ]);
            return;
        }

        appendAiMessages([
            'I’m not fully sure what you mean yet.',
            'Try asking about projects, skills, or type “contact” to send a message.'
        ]);
    };

    return (
        <section ref={ref} className="min-h-screen py-32 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl md:text-7xl mb-6">
                        <span className="font-mono text-white">Let&apos;s Build </span>
                        <span className="font-mono text-[#00D1FF]">Together</span>
                    </h2>
                    <p className="text-white/60 text-xl font-mono">
                        Have an idea? Let&apos;s turn it into a product
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="backdrop-blur-xl bg-black/60 rounded-3xl border border-[#00D1FF]/30 overflow-hidden"
                    data-cursor="graph"
                >
                    <div className="bg-gradient-to-r from-[#00D1FF]/20 to-[#FFDF00]/20 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        </div>
                        <span className="text-white font-mono text-sm">assistant.chat</span>
                    </div>

                    <div className="p-6 font-mono text-sm">
                        <div className="mb-4 text-white/60 text-xs">
                            Ask anything or type “contact”
                        </div>

                        <div
                            ref={messagesContainerRef}
                            className="h-72 overflow-y-auto pr-2 space-y-3 overscroll-contain"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={`${msg.role}-${i}-${msg.text}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-[#00D1FF]/20 text-white border border-[#00D1FF]/20'
                                            : 'bg-white/5 text-white/80 border border-white/10'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <form
                            onSubmit={handleCommand}
                            className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10"
                        >
                            <span className="text-[#FFDF00]">{'>'}</span>
                            <input
                                type="text"
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                placeholder="Ask something or type 'contact'..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30"
                            />
                        </form>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12"                >
                    <motion.a
                        href="mailto:khachunts.ani@gmail.com"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/10 to-transparent 
    border border-[#FFDF00]/30 hover:border-[#FFDF00] 
    transition-all duration-300 group relative overflow-hidden transform-gpu"
                        data-cursor="sun"
                    >
                        {/* FIXED overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[#FFDF00]/0 group-hover:bg-[#FFDF00]/5 transition duration-300" />

                        <Mail
                            className="text-[#FFDF00] mb-4 transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                            size={32}
                        />

                        <h3 className="text-xl text-white mb-2 pointer-events-none">
                            Email
                        </h3>

                        <p className="text-white/60 text-sm font-mono pointer-events-none">
                            Direct Contact
                        </p>
                    </motion.a>

                    <motion.a
                        href="https://github.com/aniiKhachunts"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#00D1FF]/10 to-transparent 
                       border border-[#00D1FF]/30 hover:border-[#00D1FF] transition-all duration-300 group"
                        data-cursor="coin"
                    >
                        <SiGithub className="text-[#00D1FF] mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="text-xl text-white mb-2">GitHub</h3>
                        <p className="text-white/60 text-sm font-mono">View Code</p>
                    </motion.a>

                    <motion.a
                        href="https://linkedin.com/in/ani-khachunts"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent 
                       border border-purple-500/30 hover:border-purple-500 transition-all duration-300 group"
                        data-cursor="graph"
                    >
                        <Linkedin className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="text-xl text-white mb-2">LinkedIn</h3>
                        <p className="text-white/60 text-sm font-mono">Connect</p>
                    </motion.a>

                    <motion.a
                        href="https://medium.com/@anikhachunts"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-transparent 
    border border-white/10 hover:border-white/40 
    transition-all duration-300 group relative overflow-hidden transform-gpu"
                    >
                        <div className="absolute inset-0 pointer-events-none bg-white/0 group-hover:bg-white/5 transition duration-300" />

                        <Medium
                            className="text-white mb-4 transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                            size={32}
                        />

                        <h3 className="text-xl text-white mb-2 pointer-events-none">
                            Medium
                        </h3>

                        <p className="text-white/60 text-sm font-mono pointer-events-none">
                            Thoughts & Articles
                        </p>
                    </motion.a>

                    <motion.a
                        href="https://instagram.com/ani__lucie"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent 
    border border-pink-500/30 hover:border-pink-400 
    transition-all duration-300 group relative overflow-hidden transform-gpu"
                    >
                        <div className="absolute inset-0 pointer-events-none bg-pink-500/0 group-hover:bg-pink-500/5 transition duration-300" />

                        <SiInstagram
                            className="text-pink-400 mb-4 transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                            size={32}
                        />

                        <h3 className="text-xl text-white mb-2 pointer-events-none">
                            Instagram
                        </h3>

                        <p className="text-white/60 text-sm font-mono pointer-events-none">
                            Visual Experiments
                        </p>
                    </motion.a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-24 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl 
                         bg-white/5 border border-white/10 font-mono text-sm text-white/60">
                        © 2026 Ani Khachunts
                    </div>
                </motion.div>
            </div>

            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                    onClick={() => setShowModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-lg w-full backdrop-blur-xl bg-black/90 rounded-3xl border border-[#00D1FF]/30 p-8"
                    >
                        <h3 className="text-3xl mb-6 text-[#00D1FF]">Send Message</h3>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();

                                console.log("🚀 FORM SUBMIT TRIGGERED");

                                const formData = new FormData(e.currentTarget);

                                const payload = {
                                    name: formData.get("name"),
                                    email: formData.get("email"),
                                    message: formData.get("message"),
                                };

                                console.log("📦 Payload:", payload);

                                try {
                                    const res = await fetch("http://localhost:4000/send-email", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(payload),
                                    });

                                    console.log("📡 Response status:", res.status);

                                    if (res.ok) {
                                        const data = await res.json();
                                        console.log("✅ Success:", data);

                                        setShowModal(false);

                                        appendAiMessages([
                                            'Message sent successfully ✅',
                                            'I’ll get back to you soon.'
                                        ]);
                                    } else {
                                        const errorText = await res.text();
                                        console.error("❌ Server error:", errorText);

                                        appendAiMessages([
                                            'Server error ❌',
                                            'Check console'
                                        ]);
                                    }
                                } catch (err) {
                                    console.error("❌ Fetch failed:", err);

                                    appendAiMessages([
                                        'Network error ❌',
                                        'Is backend running?'
                                    ]);
                                }
                            }}
                            className="space-y-4"
                        >
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/30 focus:border-[#00D1FF] 
                         focus:outline-none transition-all"
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/30 focus:border-[#00D1FF] 
                         focus:outline-none transition-all"
                            />
                            <textarea
                                name="message"
                                rows={5}
                                placeholder="Your Message"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/30 focus:border-[#00D1FF] 
                         focus:outline-none transition-all resize-none"
                            />

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 
                           text-white hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00D1FF]/20 to-[#FFDF00]/20 
                           border border-[#00D1FF]/40 text-white hover:border-[#00D1FF] 
                           transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Send
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#FFDF00]/5 rounded-full blur-3xl" />
        </section>
    );
}