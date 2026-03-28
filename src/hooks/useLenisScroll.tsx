import { useEffect } from "react";
<<<<<<< HEAD
import Lenis from "lenis"
=======
import Lenis from "@studio-freight/lenis";
>>>>>>> cd58224c06944e71269eb2298ed19852f41a71a2

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.1,
      easing: (t: number) => t,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}