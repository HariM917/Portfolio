import React, { useState, useEffect } from 'react';

const Navbar = ({ onNavigate }) => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
          hari<span>.dev</span>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
          <a href="#work" onClick={(e) => handleLinkClick(e, 'work')}>Work</a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')}>Skills</a>
          <a href="#education" onClick={(e) => handleLinkClick(e, 'education')}>Education</a>
          <a href="#certifications" onClick={(e) => handleLinkClick(e, 'certifications')}>Certifications</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
