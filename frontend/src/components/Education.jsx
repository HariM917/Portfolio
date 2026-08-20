import React from 'react';
import { educationData } from '../data/resume';

const Education = ({ addRevealRef }) => {
  return (
    <section className="section education-section" id="education">
      <div className="section-inner">
        <div className="section-header reveal" ref={addRevealRef}>
          <p className="section-label">Academic Background</p>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="timeline-container">
          {educationData.map((edu, idx) => (
            <div key={idx} className="timeline-card reveal" ref={addRevealRef}>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{edu.degree}</h3>
                    <h4 className="timeline-field">{edu.field}</h4>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-duration">{edu.duration}</span>
                    <span className="timeline-grade-badge">{edu.grade}</span>
                  </div>
                </div>

                <p className="timeline-institution">{edu.institution}</p>

                {edu.details && (
                  <ul className="timeline-details">
                    {edu.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
