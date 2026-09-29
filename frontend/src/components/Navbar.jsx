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

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="primary-navigation" role="menu">
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} role="menuitem">About</a>
          <a href="#experience" onClick={(e) => handleLinkClick(e, 'experience')} role="menuitem">Experience</a>
          <a href="#work" onClick={(e) => handleLinkClick(e, 'work')} role="menuitem">Work</a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} role="menuitem">Skills</a>
          <a href="#education" onClick={(e) => handleLinkClick(e, 'education')} role="menuitem">Education</a>
          <a href="#certifications" onClick={(e) => handleLinkClick(e, 'certifications')} role="menuitem">Certifications</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} role="menuitem">Contact</a>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
