import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SEO from './components/SEO';
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
import SlideCardsSection from './components/SlideCardsSection';
import FaqAccordion from './components/FaqAccordion';
import ContactForm from './components/ContactForm';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { SEO_DEFAULTS } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      AOS.refresh();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen relative font-sans selection:bg-[#4B72E8] selection:text-white">
      {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

      <SEO
        title={SEO_DEFAULTS.title}
        description={SEO_DEFAULTS.description}
      />
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
        <SlideCardsSection />
        <FaqAccordion />
        <ContactForm />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
