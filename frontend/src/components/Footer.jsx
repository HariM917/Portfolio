import React from 'react';
import { personalInfo } from '../data/resume';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-text">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Engineered with React, Vite & FastAPI RAG.
        </span>
        <div className="footer-links">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${personalInfo.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
