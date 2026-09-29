import React from 'react';
import { experienceData } from '../data/resume';

const Experience = ({ addRevealRef }) => {
  return (
    <section className="section experience-section" id="experience">
      <div className="section-inner">
        <div className="section-header reveal" ref={addRevealRef}>
          <p className="section-label">Career Journey</p>
          <h2 className="section-title">Experience</h2>
        </div>

        <div className="timeline-container">
          {experienceData.map((exp, idx) => (
            <div key={idx} className="timeline-card reveal" ref={addRevealRef}>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{exp.role}</h3>
                    <h4 className="timeline-field">{exp.company}</h4>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-duration">{exp.duration}</span>
                    <span className="timeline-location">{exp.location}</span>
                  </div>
                </div>

                <p className="timeline-description">{exp.description}</p>

                {exp.skills && (
                  <ul className="timeline-details skills-tags">
                    {exp.skills.map((skill, i) => (
                      <li key={i} className="skill-tag">{skill}</li>
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

export default Experience;
