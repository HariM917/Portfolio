import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        (process.env.REACT_APP_API_URL || 'https://portfolio-backend-qw1a.onrender.com/') + '/api/projects'
      );
      setProjects(response.data);
    } catch (err) {
      console.log('Using default projects');
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  const defaultProjects = [
    {
      _id: '1',
      title: 'Applicant Tracking System (ATS)',
      description: 'AI-powered recruitment platform featuring resume screening with NLP-based candidate ranking. Streamlines hiring workflows with automated resume analysis, candidate ranking, admin dashboard, and real-time status tracking. Reduces hiring time by 60% through intelligent candidate-job matching.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'NLP'],
      link: 'https://ats-demo.example.com',
      githubLink: 'https://github.com/HariM917/ATS',
      featured: true,
    },
    {
      _id: '2',
      title: 'Smart Traffic Management System (STMS)',
      description: 'AI-driven urban traffic optimization system using YOLO for vehicle detection and Reinforcement Learning for adaptive signal control. Integrates IoT sensors for real-time monitoring, predicts congestion patterns, detects accidents, and adapts to weather conditions. Smart India Hackathon-level solution designed for scalable smart city deployment.',
      technologies: ['YOLO', 'Reinforcement Learning', 'IoT', 'Python', 'React', 'TensorFlow'],
      link: 'https://stms-demo.example.com',
      githubLink: 'https://github.com/HariM917/STMS',
      featured: false,
    },
    {
      _id: '3',
      title: 'Enterprise Document Intelligence Platform',
      description: 'Enterprise-grade AI platform for automated document processing and intelligent data extraction. Features advanced OCR with Tesseract, NLP-based entity recognition using spaCy, and PII detection for sensitive data protection. Handles multiple document formats, extracts structured data, and provides secure dashboard access for compliance.',
      technologies: ['Python', 'FastAPI', 'React', 'MongoDB', 'Tesseract', 'spaCy', 'NLP'],
      link: 'https://doc-intelligence.example.com',
      githubLink: 'https://github.com/HariM917/DocumentIntelligence',
      featured: false,
    },
    {
      _id: '4',
      title: 'AI Resume Screening & Candidate Matching System',
      description: 'Intelligent resume analysis system using TF-IDF and cosine similarity for job-candidate matching. Automatically parses resumes, extracts skills, and ranks candidates based on job description alignment. Reduces bias in hiring, provides Excel/DB export capabilities, and achieves 95% accuracy in skill matching.',
      technologies: ['Python', 'TF-IDF', 'NLP', 'scikit-learn', 'FastAPI', 'React', 'MongoDB'],
      link: 'https://resume-matcher.example.com',
      githubLink: 'https://github.com/HariM917/ResumeMatcher',
      featured: false,
    },
    {
      _id: '5',
      title: 'Real-Time Multilingual Lecture Assistant',
      description: 'AI-powered educational tool providing live lecture transcription, multilingual translation, and auto-generated summaries. Leverages OpenAI Whisper for speech-to-text, supports 50+ languages, and uses BART for intelligent note generation. Improves accessibility and helps students overcome language barriers in education.',
      technologies: ['Whisper API', 'BART', 'Python', 'React', 'Translation APIs', 'FastAPI'],
      link: 'https://lecture-assistant.example.com',
      githubLink: 'https://github.com/HariM917/LectureAssistant',
      featured: false,
    },
    {
      _id: '6',
      title: 'Personal Portfolio Website',
      description: 'Full-stack portfolio website showcasing projects with dynamic content management. Built with React frontend and Node.js backend, featuring SEO optimization, responsive design, and MongoDB integration for scalable project storage.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
      link: 'https://yourportfolio.com',
      githubLink: 'https://github.com/HariM917/Portfolio',
      featured: false,
    },
  ];

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>Hari M</h1>
          <p className="subtitle">Full-Stack Developer | AI/ML Enthusiast | Problem Solver</p>
          <div className="contact-links">
            <a href="mailto:harimurali@email.com" target="_blank" rel="noopener noreferrer">Email</a>
            <a href="https://github.com/HariM917" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/harim917" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </header>

      <main className="container">
        {/* About Section */}
        <section className="about">
          <h2>About Me</h2>
          <p>
            I'm a full-stack developer with specialized expertise in building AI-powered applications that solve real-world problems. 
            With proficiency in React, Node.js, Python, and modern machine learning frameworks, I design intelligent systems that combine 
            robust backend architecture with seamless frontend experiences. My passion lies at the intersection of full-stack development 
            and artificial intelligence—building applications that don't just work, but learn and adapt.
          </p>
          <p>
            I have hands-on experience developing production-grade AI/ML systems including recruitment platforms with NLP-based resume screening, 
            computer vision systems for traffic management, enterprise document intelligence platforms, and real-time AI assistants. 
            I'm deeply interested in solving complex problems through machine learning, from semantic matching algorithms to real-time 
            speech processing and multilingual NLP.
          </p>
          <p>
            Beyond coding, I believe in system design, scalability, and creating technology with measurable real-world impact. 
            I've participated in national-level hackathons (Smart India Hackathon) and thrive in collaborative environments where 
            innovative thinking drives development. Let's build something intelligent together.
          </p>
        </section>

        {/* Featured Projects Section */}
        <section className="projects">
          <h2>⭐ Featured Projects</h2>
          {loading && <p>Loading projects...</p>}
          {error && <p className="error">{error}</p>}
          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.filter(p => p.featured).map((project) => (
                <div key={project._id} className="project-card featured-badge">
                  <div className="featured-label">★ Featured</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Live Demo →
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              !loading && <p>No featured projects found.</p>
            )}
          </div>
        </section>

        {/* All Projects Section */}
        <section className="projects">
          <h2>All Projects</h2>
          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Live Demo →
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              !loading && <p>No projects found.</p>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React.js & React Hooks</li>
                <li>HTML5 / CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>Tailwind CSS & Bootstrap</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js & Express.js</li>
                <li>FastAPI (Python)</li>
                <li>RESTful APIs</li>
                <li>Server Architecture</li>
                <li>Authentication & Security</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Database</h3>
              <ul>
                <li>MongoDB</li>
                <li>SQL (MySQL)</li>
                <li>Database Design</li>
                <li>Query Optimization</li>
                <li>Data Modeling</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>AI / ML</h3>
              <ul>
                <li>PyTorch & TensorFlow</li>
                <li>YOLO (Computer Vision)</li>
                <li>NLP (spaCy, Transformers)</li>
                <li>OCR (Tesseract)</li>
                <li>TF-IDF & Cosine Similarity</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>ML Frameworks</h3>
              <ul>
                <li>scikit-learn</li>
                <li>BART (Summarization)</li>
                <li>Whisper (Speech-to-Text)</li>
                <li>Reinforcement Learning</li>
                <li>Semantic Matching</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Platforms</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>Postman</li>
                <li>VS Code</li>
                <li>Docker</li>
                <li>AWS / Cloud Services</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="achievements">
          <h2>Achievements</h2>
          <div className="achievements-list">
            <div className="achievement-item">
              <h3>🤖 AI-Powered Full-Stack Solutions</h3>
              <p>Architected and deployed 6+ AI-integrated applications combining React frontends with Python ML backends, handling real-world complexity in recruitment, traffic management, document processing, and education sectors.</p>
            </div>
            <div className="achievement-item">
              <h3>🧠 Machine Learning Expertise</h3>
              <p>Implemented advanced ML techniques including YOLO-based computer vision, NLP with spaCy and Transformers, semantic text matching with TF-IDF and cosine similarity, and reinforcement learning for adaptive systems.</p>
            </div>
            <div className="achievement-item">
              <h3>🏆 Smart India Hackathon Participant</h3>
              <p>Developed Smart Traffic Management System at national hackathon level, building production-grade solution with IoT integration, real-time processing, and smart city deployment potential.</p>
            </div>
            <div className="achievement-item">
              <h3>📊 Enterprise-Scale Development</h3>
              <p>Designed document intelligence and recruitment platforms processing thousands of records with 95%+ accuracy. Strong emphasis on scalability, security, and real-world impact.</p>
            </div>
            <div className="achievement-item">
              <h3>🔍 NLP & Computer Vision Specialist</h3>
              <p>Expert in OCR, resume parsing, entity recognition, speech-to-text processing, and multilingual translation systems serving diverse applications and users.</p>
            </div>
            <div className="achievement-item">
              <h3>💡 Problem-Solver & System Designer</h3>
              <p>Strong understanding of system architecture, database optimization, API design, and full-stack workflow. Focus on delivering solutions that solve real problems with measurable impact.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <h2>Get In Touch</h2>
          <p>I'm open to opportunities, collaborations, and interesting projects. Feel free to reach out!</p>
          <div className="contact-methods">
            <a href="mailto:harimurali@email.com" className="contact-btn email-btn">
              📧 Email Me
            </a>
            <a href="https://github.com/HariM917" target="_blank" rel="noopener noreferrer" className="contact-btn github-btn">
              💻 GitHub
            </a>
            <a href="https://www.linkedin.com/in/harim917" target="_blank" rel="noopener noreferrer" className="contact-btn linkedin-btn">
              🔗 LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Hari M. All rights reserved. | Full-Stack Developer | AI/ML Enthusiast</p>
      </footer>
    </div>
  );
}

export default App;
