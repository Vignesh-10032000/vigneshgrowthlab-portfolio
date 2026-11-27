import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { observeReveals } from './utils/reveals';

import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import About from './components/About';
import ServicesWheel from './components/ServicesWheel';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Process from './components/Process';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import ComparisonTable from './components/ComparisonTable';
import FaqAccordion from './components/FaqAccordion';
import ContactForm from './components/ContactForm';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { trackContactLink } from './utils/conversions';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    document.addEventListener('click', trackContactLink);
    return () => document.removeEventListener('click', trackContactLink);
  }, []);

  useEffect(() => {
    const stopReveals = observeReveals(document.getElementById('root'));
    // Touch scrolling is native. Only enhance wheel input on pointer devices.
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      let active = true;
      let lenis;
      const tick = time => lenis.raf(time * 1000);
      import('lenis').then(({ default: Lenis }) => {
        if (!active) return;
        lenis = new Lenis({
          duration: 1.2,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }).catch(() => { /* Native wheel scrolling remains available. */ });
      return () => {
        active = false;
        gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    });
    return () => {
      stopReveals?.();
      media.revert();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-[#050505] text-white min-h-screen relative font-sans selection:bg-brand-action selection:text-white">
        <NetflixPreloader />

        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <TrustStats />
          <About />
          <ServicesWheel />
          <Portfolio />
          <Skills />
          <Process />
          <WhyWorkWithMe />
          <ComparisonTable />
          <FaqAccordion />
          <ContactForm />
          <ContactCTA />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}

export default App;
