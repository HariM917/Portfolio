import React from 'react';
import { projects } from '../data/projects';

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feature-check-icon">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Projects = ({ addRevealRef }) => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section className="section projects-section" id="work">
      <div className="section-inner">
        <div className="section-header reveal" ref={addRevealRef}>
          <p className="section-label">Work & Systems</p>
          <h2 className="section-title">Selected Projects</h2>
        </div>

        {/* Featured Projects */}
        <div className="featured-projects-container">
          {featuredProjects.map((project) => (
            <div key={project.id} className="featured-project reveal" ref={addRevealRef}>
              <div className="featured-card">
                <div className="featured-content">
                  <div className="featured-badge-row">
                    <span className="featured-badge">Featured System</span>
                    <span className="category-pill">{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="featured-summary">{project.shortDescription}</p>

                  {project.features && project.features.length > 0 && (
                    <ul className="project-feature-list">
                      {project.features.map((feat, idx) => (
                        <li key={idx}>
                          <CheckIcon />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.highlightMetric && (
                    <div className="highlight-metric-box">
                      <span className="metric-icon">⚡</span>
                      <span>{project.highlightMetric}</span>
                    </div>
                  )}

                  <div className="featured-tech tech-tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="featured-links">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Live Demo <ArrowUpRight />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                      >
                        <GithubIcon /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Grid */}
        <div className="section-subheader reveal" ref={addRevealRef}>
          <h3 className="subheader-title">Other Engineering Projects</h3>
        </div>

        <div className="project-grid reveal-stagger reveal" ref={addRevealRef}>
          {otherProjects.map((project, index) => (
            <div key={project.id} className="project-card">
              <div className="project-card-top">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="category-pill-sm">{project.category}</span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.shortDescription}</p>

              {project.features && (
                <ul className="mini-feature-list">
                  {project.features.slice(0, 2).map((feat, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="tech-tags">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-links">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link primary-link"
                  >
                    Live Demo <ArrowUpRight />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <GithubIcon /> Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
