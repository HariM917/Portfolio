import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './App.css';

// SVG Icons — inline to avoid dependencies
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

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const revealRefs = useRef([]);

  const defaultProjects = [
    {
      _id: '1',
      title: 'Applicant Tracking System (ATS)',
      description: 'AI-powered recruitment platform featuring resume screening with NLP-based candidate ranking. Streamlines hiring workflows with automated resume analysis, candidate ranking, admin dashboard, and real-time status tracking. Reduces hiring time by 60% through intelligent candidate-job matching.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'NLP'],
      link: 'https://ats-silk-alpha.vercel.app/',
      githubLink: 'https://github.com/HariM917/ATS',
      featured: true,
    },
    {
      _id: '2',
      title: 'Smart Traffic Management System',
      description: 'AI-driven urban traffic optimization using YOLO for vehicle detection and Reinforcement Learning for adaptive signal control. Integrates IoT sensors for real-time monitoring, congestion prediction, and weather-adaptive operation. Built for Smart India Hackathon.',
      technologies: ['YOLO', 'Reinforcement Learning', 'IoT', 'Python', 'React', 'TensorFlow'],
      githubLink: 'https://github.com/HariM917/STMS',
      featured: false,
    },
    {
      _id: '3',
      title: 'Enterprise Document Intelligence Platform',
      description: 'Enterprise-grade AI platform for automated document processing and intelligent data extraction. Features OCR with Tesseract, NLP-based entity recognition using spaCy, and PII detection. Handles multiple document formats with secure dashboard access.',
      technologies: ['Python', 'FastAPI', 'React', 'MongoDB', 'Tesseract', 'spaCy', 'NLP'],
      githubLink: 'https://github.com/HariM917/DocumentIntelligence',
      featured: false,
    },
    {
      _id: '4',
      title: 'Real-Time Multilingual Lecture Assistant',
      description: 'AI-powered educational tool providing live lecture transcription, multilingual translation, and auto-generated summaries. Uses OpenAI Whisper for speech-to-text, supports 50+ languages, and leverages BART for intelligent note generation.',
      technologies: ['Whisper API', 'BART', 'Python', 'React', 'Translation APIs', 'FastAPI'],
      githubLink: 'https://github.com/HariM917/Lecture_Assistant',
      featured: false,
    },
    {
      _id: '5',
      title: 'TN Smart Public Transport Platform',
      description: 'Intelligent public transit management system for Tamil Nadu featuring real-time bus/train tracking, dynamic route optimization, integrated smart ticketing, and commuter dashboards with IoT sensor integration.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'IoT', 'Google Maps API'],
      githubLink: 'https://github.com/HariM917/Tamil-Nadu-Smart-Public-Transport-Platform',
      featured: false,
    },
    {
      _id: '6',
      title: 'Task Manager',
      description: 'Full-stack task management application with real-time collaboration features, intuitive UI, seamless integration, and MongoDB persistence.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
      link: 'https://taskmanager-beta-opal.vercel.app',
      githubLink: 'https://github.com/HariM917/Task-Manager',
      featured: false,
    },
  ];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          (process.env.REACT_APP_API_URL || 'https://portfolio-backend-qw1a.onrender.com') + '/api/projects'
        );
        setProjects(response.data);
      } catch (err) {
        setError(null);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nav scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-reveal
  const addRevealRef = useCallback((el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

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

    revealRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  // Skills data
  const skills = {
    'Languages & Frameworks': ['React.js', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'JavaScript ES6+', 'HTML5', 'CSS3'],
    'AI & Machine Learning': ['PyTorch', 'TensorFlow', 'YOLO', 'spaCy', 'scikit-learn', 'BART', 'Whisper', 'NLP', 'Reinforcement Learning'],
    'Data & Infrastructure': ['MongoDB', 'MySQL', 'REST APIs', 'Docker', 'AWS', 'Git', 'Tesseract OCR'],
  };

  // Highlights data
  const highlights = [
    { title: 'AI-Integrated Systems', desc: 'Architected and deployed 6+ applications combining React frontends with Python ML backends across recruitment, traffic management, and document processing.' },
    { title: 'Smart India Hackathon', desc: 'Built a production-grade Smart Traffic Management System with IoT integration and real-time processing for national-level competition.' },
    { title: 'ML Pipeline Development', desc: 'Implemented YOLO-based computer vision, NLP with Transformers, semantic matching with TF-IDF, and reinforcement learning for adaptive systems.' },
    { title: 'Enterprise Solutions', desc: 'Designed document intelligence and recruitment platforms processing thousands of records with 95%+ accuracy, emphasis on scalability and security.' },
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo('hero')}>
            hari<span>.dev</span>
          </div>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>Work</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
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

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <p className="hero-label">Full-Stack Developer & AI Engineer</p>
          <h1>
            I'm <span className="accent">Hari M</span>,<br />
            I build intelligent systems.
          </h1>
          <p className="hero-description">
            I design and develop production-grade applications at the intersection of 
            full-stack engineering and artificial intelligence — systems that don't just 
            work, but learn and adapt.
          </p>
          <div className="hero-cta">
            <a href="#work" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>
              View my work <ArrowUpRight />
            </a>
            <a href="https://github.com/HariM917" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* About */}
      <section className="section" id="about">
        <div className="section-inner">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">About</p>
            <h2 className="section-title">Background</h2>
          </div>

          <div className="about-grid">
            <div className="about-text reveal" ref={addRevealRef}>
              <p>
                I'm a full-stack developer with a deep focus on AI-powered applications. 
                My work spans the entire stack — from designing responsive React interfaces 
                to building Python ML backends that process real-world data at scale.
              </p>
              <p>
                I've worked on NLP-based recruitment systems, computer vision for traffic 
                management, enterprise document intelligence, and real-time speech processing. 
                I care about system design, measurable impact, and building software that 
                solves actual problems.
              </p>
            </div>

            <div className="about-stats reveal-stagger reveal" ref={addRevealRef}>
              <div className="stat-card">
                <div className="stat-number">6+</div>
                <div className="stat-label">Projects Shipped</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">AI/ML Domains</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <div className="stat-label">System Accuracy</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">SIH</div>
                <div className="stat-label">Hackathon Level</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Projects */}
      <section className="section projects-section" id="work">
        <div className="section-inner">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">Work</p>
            <h2 className="section-title">Selected Projects</h2>
          </div>

          {/* Featured */}
          {featuredProjects.map((project) => (
            <div key={project._id} className="featured-project reveal" ref={addRevealRef}>
              <div className="featured-card">
                <div>
                  <div className="featured-badge">Featured Project</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="featured-tech tech-tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="featured-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Live Demo <ArrowUpRight />
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        <GithubIcon /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Other Projects */}
          {loading && (
            <div className="loading-indicator">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </div>
          )}
          {error && <p className="error">{error}</p>}

          <div className="project-grid reveal-stagger reveal" ref={addRevealRef}>
            {otherProjects.map((project, index) => (
              <div key={project._id} className="project-card">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo <ArrowUpRight />
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <GithubIcon /> Source
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Skills */}
      <section className="section" id="skills">
        <div className="section-inner">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">Skills</p>
            <h2 className="section-title">Technologies I work with</h2>
          </div>

          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skills-group reveal" ref={addRevealRef}>
              <h3 className="skills-category-title">{category}</h3>
              <div className="skills-pills">
                {items.map((skill, idx) => (
                  <span key={idx} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Highlights */}
      <section className="section" id="highlights">
        <div className="section-inner">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">Highlights</p>
            <h2 className="section-title">Experience & achievements</h2>
          </div>

          <div className="highlights-list">
            {highlights.map((item, idx) => (
              <div key={idx} className="highlight-item reveal" ref={addRevealRef}>
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact */}
      <section className="section contact-section" id="contact">
        <div className="section-inner">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">Contact</p>
            <h2 className="section-title">Get in touch</h2>
          </div>

          <p className="contact-text reveal" ref={addRevealRef}>
            Open to opportunities, collaborations, and interesting projects. 
            Feel free to reach out.
          </p>

          <div className="contact-links-row reveal" ref={addRevealRef}>
            <a href="mailto:harimurali10a@gmail.com" className="contact-link">
              harimurali10a@gmail.com
            </a>
            <a href="https://github.com/HariM917" target="_blank" rel="noopener noreferrer" className="contact-link">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/harim917" target="_blank" rel="noopener noreferrer" className="contact-link">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-text">&copy; 2026 Hari M</span>
          <div className="footer-links">
            <a href="https://github.com/HariM917" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/harim917" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:harimurali10a@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
