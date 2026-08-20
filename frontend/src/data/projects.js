/**
 * Static Projects Data
 * Source of truth for portfolio project showcase.
 * Loaded instantly on the frontend with zero backend dependency.
 */

export const projects = [
  {
    id: 'talentflow',
    title: 'TalentFlow: Elite AI Hiring Intelligence System',
    shortDescription: 'AI-powered Applicant Tracking System using React.js, Flask, and SQLite with modern NLP-driven candidate discovery and automated ranking.',
    fullDescription: 'Enterprise recruitment intelligence platform featuring semantic resume screening, candidate ranking with FAISS vector embeddings, automated workflows, and an administrative dashboard.',
    technologies: ['React.js', 'Python', 'Flask', 'SQLite', 'FAISS', 'Hugging Face', 'RAG', 'NLP'],
    features: [
      'Semantic candidate matching with vector embeddings',
      'FAISS vector index for real-time similarity search',
      'Retrieval-Augmented Generation (RAG) for resume screening',
      'Hugging Face Transformers for entity extraction & scoring',
      'Automated screening workflows and real-time status tracking'
    ],
    highlightMetric: 'Improved candidate discovery accuracy by 30% and reduced manual recruitment effort.',
    github: 'https://github.com/HariM917/ATS',
    demo: 'https://ats-silk-alpha.vercel.app/',
    featured: true,
    category: 'AI / Fullstack'
  },
  {
    id: 'emergency-response',
    title: 'AI Emergency Response System',
    shortDescription: 'Real-time emergency response and crisis management platform with interactive 3D tactical mapping and automated incident triage.',
    fullDescription: 'High-concurrency platform engineered for rapid disaster coordination. Combines 3D spatial tactical maps, multi-floor visualization, automated incident classification, and responder monitoring.',
    technologies: ['React Three Fiber', 'Three.js', 'Python', 'FastAPI', 'WebSockets', 'AI Classification', 'REST APIs'],
    features: [
      'Interactive 3D tactical interior/exterior building visualization',
      'Real-time incident tracking & dynamic responder geolocation',
      'Multi-floor level rendering with live status badges',
      'AI-driven incident classification & urgency scoring',
      'Automated Standard Operating Procedure (SOP) recommendations'
    ],
    github: 'https://github.com/HariM917/Rapid-Crisis-Problem',
    demo: null,
    featured: true,
    category: 'AI / 3D Graphics'
  },
  {
    id: 'traffic-management',
    title: 'Smart Traffic Management System',
    shortDescription: 'AI-driven urban traffic optimization platform using computer vision and reinforcement learning. Built for Smart India Hackathon 2025.',
    fullDescription: 'Intelligent traffic control architecture using YOLO for live vehicle detection, reinforcement learning for adaptive traffic signal timing, and IoT sensor integration.',
    technologies: ['YOLO', 'Reinforcement Learning', 'IoT Sensors', 'Python', 'React.js', 'TensorFlow'],
    features: [
      'Real-time vehicle detection and queue counting with YOLO',
      'Adaptive signal control using Reinforcement Learning',
      'Congestion prediction and weather-adaptive operations',
      'Live IoT sensor telemetry and municipal analytics dashboard'
    ],
    highlightMetric: 'Built and demonstrated for Smart India Hackathon 2025.',
    github: 'https://github.com/HariM917/STMS',
    demo: null,
    featured: false,
    category: 'Computer Vision & RL'
  },
  {
    id: 'document-intelligence',
    title: 'Enterprise Document Intelligence Platform',
    shortDescription: 'Enterprise AI platform for automated document parsing, data extraction, named entity recognition, and PII masking.',
    fullDescription: 'Automated OCR pipeline with Tesseract and spaCy NLP for structured data extraction from enterprise documents with high accuracy.',
    technologies: ['Python', 'FastAPI', 'React.js', 'MongoDB', 'Tesseract OCR', 'spaCy', 'NLP'],
    features: [
      'Automated OCR text extraction across PDF, DOCX, and scanned images',
      'NLP named entity recognition (NER) with spaCy',
      'Automated PII detection and redaction for compliance',
      'Secure web dashboard with document search and filtering'
    ],
    github: 'https://github.com/HariM917/DocumentIntelligence',
    demo: null,
    featured: false,
    category: 'NLP & Document AI'
  },
  {
    id: 'lecture-assistant',
    title: 'Real-Time Multilingual Lecture Assistant',
    shortDescription: 'AI educational assistant delivering live lecture transcription, translation into 50+ languages, and BART abstractive summarization.',
    fullDescription: 'Speech-to-text platform leveraging OpenAI Whisper API for live classroom capture, multilingual translation, and BART transformer for note generation.',
    technologies: ['OpenAI Whisper', 'BART', 'Python', 'React.js', 'FastAPI', 'Translation APIs'],
    features: [
      'Real-time acoustic speech-to-text transcription',
      'Multilingual translation supporting 50+ languages',
      'Abstractive note summarization using BART models',
      'Searchable, timestamped lecture transcripts and notes'
    ],
    github: 'https://github.com/HariM917/Lecture_Assistant',
    demo: null,
    featured: false,
    category: 'Speech & NLP'
  },
  {
    id: 'smart-public-transport',
    title: 'TN Smart Public Transport Platform',
    shortDescription: 'Intelligent transit management system for Tamil Nadu featuring live GPS tracking, route optimization, and smart commuter dashboards.',
    fullDescription: 'Public mobility infrastructure solution with IoT sensors, Google Maps integration, and real-time scheduling for public buses and trains.',
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'IoT', 'Google Maps API'],
    features: [
      'Live GPS bus/train telemetry and arrival estimation',
      'Dynamic route optimization based on traffic conditions',
      'Commuter web portal with ticketing and timetable view'
    ],
    github: 'https://github.com/HariM917/Tamil-Nadu-Smart-Public-Transport-Platform',
    demo: null,
    featured: false,
    category: 'IoT & Fullstack'
  },
  {
    id: 'task-manager',
    title: 'Task Manager Platform',
    shortDescription: 'Full-stack task management and collaboration tool featuring real-time state synchronization, clean UX, and MongoDB persistence.',
    fullDescription: 'Responsive project and task tracking application designed for team productivity with intuitive Kanban workflows.',
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
    features: [
      'Real-time task creation, assignment, and status updates',
      'Responsive design with priority sorting and search',
      'Clean REST API architecture with robust database persistence'
    ],
    github: 'https://github.com/HariM917/Task-Manager',
    demo: 'https://taskmanager-beta-opal.vercel.app',
    featured: false,
    category: 'Web Application'
  }
];

export default projects;
