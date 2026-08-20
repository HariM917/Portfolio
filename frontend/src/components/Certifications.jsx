import React from 'react';
import { certificationsData } from '../data/resume';

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const Certifications = ({ addRevealRef }) => {
  return (
    <section className="section certifications-section" id="certifications">
      <div className="section-inner">
        <div className="section-header reveal" ref={addRevealRef}>
          <p className="section-label">Credentials & Accomplishments</p>
          <h2 className="section-title">Certifications & Hackathons</h2>
        </div>

        <div className="cert-grid reveal-stagger reveal" ref={addRevealRef}>
          {certificationsData.map((cert, idx) => (
            <div key={idx} className="cert-card">
              <div className="cert-card-header">
                <div className="cert-icon-box">
                  <AwardIcon />
                </div>
                <span className="cert-badge">{cert.badge}</span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-desc">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
