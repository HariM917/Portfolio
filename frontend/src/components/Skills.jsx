import React from 'react';
import { skillsData } from '../data/skills';

const Skills = ({ addRevealRef }) => {
  return (
    <section className="section" id="skills">
      <div className="section-inner">
        <div className="section-header reveal" ref={addRevealRef}>
          <p className="section-label">Technical Stack</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        <div className="skills-container">
          {Object.entries(skillsData).map(([category, items]) => (
            <div key={category} className="skills-group reveal" ref={addRevealRef}>
              <h3 className="skills-category-title">{category}</h3>
              <div className="skills-pills">
                {items.map((skill, idx) => (
                  <span key={idx} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
