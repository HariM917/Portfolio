import React, { useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot';

import './App.css';

function App() {
  const revealRefs = useRef([]);

  const addRevealRef = useCallback((el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      {/* Top Navigation */}
      <Navbar onNavigate={scrollTo} />

      <main id="main-content">
        {/* Hero Section */}
        <Hero onNavigate={scrollTo} />

        <div className="divider" />

        {/* About Section */}
        <About addRevealRef={addRevealRef} />

        <div className="divider" />

        {/* Projects Section */}
        <Projects addRevealRef={addRevealRef} />

        <div className="divider" />

        {/* Skills Section */}
        <Skills addRevealRef={addRevealRef} />

        <div className="divider" />

        {/* Education Section */}
        <Education addRevealRef={addRevealRef} />

        <div className="divider" />

        {/* Certifications & Hackathons Section */}
        <Certifications addRevealRef={addRevealRef} />

        <div className="divider" />

        {/* Contact Section */}
        <Contact addRevealRef={addRevealRef} />
      </main>

      {/* Footer */}
      <Footer />

      {/* RAG-Powered AI Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
