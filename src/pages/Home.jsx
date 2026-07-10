import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import InteractiveShowcase from '../sections/InteractiveShowcase';
import WhyRafiq from '../sections/WhyRafiq';
import FAQ from '../sections/FAQ';
import Download from '../sections/Download';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main>
      <Hero />
      <Features />
      <InteractiveShowcase />
      <WhyRafiq />
      <FAQ />
      <Download />
    </main>
  );
}
