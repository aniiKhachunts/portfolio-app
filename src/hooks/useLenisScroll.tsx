import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

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