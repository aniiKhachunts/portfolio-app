import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Send, Terminal } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
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

export function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [command, setCommand] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [output, setOutput] = useState<string[]>([
        '> System initialized...',
        '> Type "help" for available commands',
    ]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = command.trim().toLowerCase();

        const newOutput = [...output, `> ${command}`];

        if (cmd === 'help') {
            newOutput.push('Available commands:');
            newOutput.push('  contact --send    Open contact form');
            newOutput.push('  email             Display email address');
            newOutput.push('  github            Open GitHub profile');
            newOutput.push('  linkedin          Open LinkedIn profile');
            newOutput.push('  clear             Clear terminal');
        } else if (cmd === 'contact --send') {
            setShowModal(true);
            newOutput.push('Opening contact form...');
        } else if (cmd === 'email') {
            newOutput.push('📧 ani.khachunts@example.com');
        } else if (cmd === 'github') {
            newOutput.push('🔗 Opening GitHub...');
            setTimeout(() => window.open('https://github.com', '_blank'), 500);
        } else if (cmd === 'linkedin') {
            newOutput.push('🔗 Opening LinkedIn...');
            setTimeout(() => window.open('https://linkedin.com', '_blank'), 500);
        } else if (cmd === 'clear') {
            setOutput([]);
            setCommand('');
            return;
        } else if (cmd) {
            newOutput.push(`Command not found: ${cmd}`);
            newOutput.push('Type "help" for available commands');
        }

        setOutput(newOutput);
        setCommand('');
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
                        <span className="text-white">Contact</span>{' '}
                        <span className="text-[#00D1FF]">Nexus</span>
                    </h2>
                    <p className="text-white/60 text-xl font-mono">Initialize Connection</p>
                </motion.div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="backdrop-blur-xl bg-black/60 rounded-3xl border border-[#00D1FF]/30 overflow-hidden"
                    data-cursor="graph"
                >
                    {/* Terminal Header */}
                    <div className="bg-gradient-to-r from-[#00D1FF]/20 to-[#FFDF00]/20 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                        <Terminal className="text-[#00D1FF]" size={20} />
                        <span className="text-white font-mono text-sm">contact_terminal.sh</span>
                        <div className="ml-auto flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        </div>
                    </div>

                    {/* Terminal Output */}
                    <div className="p-6 font-mono text-sm">
                        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                            {output.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className={line.startsWith('>') ? 'text-[#00D1FF]' : 'text-white/70'}
                                >
                                    {line}
                                </motion.div>
                            ))}
                        </div>

                        {/* Command Input */}
                        <form onSubmit={handleCommand} className="flex items-center gap-2">
                            <span className="text-[#FFDF00]">$</span>
                            <input
                                type="text"
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                placeholder="Type a command..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30"
                            />
                        </form>
                    </div>
                </motion.div>

                {/* Quick Action Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                    <motion.a
                        href="mailto:ani.khachunts@example.com"
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#FFDF00]/10 to-transparent 
                       border border-[#FFDF00]/30 hover:border-[#FFDF00] transition-all duration-300 group"
                        data-cursor="sun"
                    >
                        <Mail className="text-[#FFDF00] mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="text-xl text-white mb-2">Email</h3>
                        <p className="text-white/60 text-sm font-mono">Direct Contact</p>
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
                </motion.div>

                {/* Footer */}
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

            {/* Contact Modal */}
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

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/30 focus:border-[#00D1FF] 
                         focus:outline-none transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                         text-white placeholder:text-white/30 focus:border-[#00D1FF] 
                         focus:outline-none transition-all"
                            />
                            <textarea
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

            {/* Background Elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#FFDF00]/5 rounded-full blur-3xl" />
        </section>
    );
}
