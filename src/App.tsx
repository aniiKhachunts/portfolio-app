import { useEffect, useState } from 'react';
import { ScrollProgress } from './components/scroll-progress';
import { ScrollToTop } from './components/scroll-to-top';
import { LoadingScreen } from './components/loading-screen';
import { HeroSection } from './components/hero-section';
import { AIPhilosophySection } from './components/ai-philosophy-section';
import { ProjectConstellationSection } from './components/project-constellation-section';
import { SkillsHarmonySection } from './components/skills-harmony-section';
import { MusicianSection } from './components/musician-section';
import { ContactSection } from './components/contact-section';
import CustomCursor from './components/custom-cursor';
import { useLenisScroll } from './hooks/useLenisScroll';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useLenisScroll();

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    if (isLoading) {
        return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
    }


    return (
        <>
            <CustomCursor />
            <div className="min-h-screen bg-black text-white overflow-x-hidden">
                {!menuOpen && <ScrollProgress />}
                <ScrollToTop />

                <main>
                    <section id="hero">
                        <HeroSection menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                    </section>

                    <section id="philosophy">
                        <AIPhilosophySection />
                    </section>

                    <section id="projects">
                        <ProjectConstellationSection />
                    </section>

                    <section id="skills">
                        <SkillsHarmonySection />
                    </section>

                    <section id="musician">
                        <MusicianSection />
                    </section>

                    <section id="contact">
                        <ContactSection />
                    </section>
                </main>

                <div
                    className="fixed inset-0 pointer-events-none opacity-[0.02]"
                    style={{
                        backgroundImage: `
            linear-gradient(#FFDF00 1px, transparent 1px),
            linear-gradient(90deg, #00D1FF 1px, transparent 1px)
          `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>
        </>
    );
}