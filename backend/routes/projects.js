const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Mock data for testing if MongoDB is down
const mockProjects = [
  {
    _id: '1',
    title: 'Applicant Tracking System (ATS)',
    description: 'AI-powered recruitment platform featuring resume screening with NLP-based candidate ranking. Streamlines hiring workflows with automated resume analysis, candidate ranking, admin dashboard, and real-time status tracking. Reduces hiring time by 60% through intelligent candidate-job matching.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'NLP'],
    link: 'https://ats-brown.vercel.app/',
    githubLink: 'https://github.com/HariM917/ATS',
    featured: true,
  },
  {
    _id: '2',
    title: 'Smart Traffic Management System (STMS)',
    description: 'AI-driven urban traffic optimization system using YOLO for vehicle detection and Reinforcement Learning for adaptive signal control. Integrates IoT sensors for real-time monitoring, predicts congestion patterns, detects accidents, and adapts to weather conditions. Smart India Hackathon-level solution designed for scalable smart city deployment.',
    technologies: ['YOLO', 'Reinforcement Learning', 'IoT', 'Python', 'React', 'TensorFlow'],
   
    githubLink: 'https://github.com/HariM917/STMS',
    featured: false,
  },
  {
    _id: '3',
    title: 'Enterprise Document Intelligence Platform',
    description: 'Enterprise-grade AI platform for automated document processing and intelligent data extraction. Features advanced OCR with Tesseract, NLP-based entity recognition using spaCy, and PII detection for sensitive data protection. Handles multiple document formats, extracts structured data, and provides secure dashboard access for compliance.',
    technologies: ['Python', 'FastAPI', 'React', 'MongoDB', 'Tesseract', 'spaCy', 'NLP'],
   
    githubLink: 'https://github.com/HariM917/DocumentIntelligence',
    featured: false,
  },
  
  {
    _id: '5',
    title: 'Real-Time Multilingual Lecture Assistant',
    description: 'AI-powered educational tool providing live lecture transcription, multilingual translation, and auto-generated summaries. Leverages OpenAI Whisper for speech-to-text, supports 50+ languages, and uses BART for intelligent note generation. Improves accessibility and helps students overcome language barriers in education.',
    technologies: ['Whisper API', 'BART', 'Python', 'React', 'Translation APIs', 'FastAPI'],
 
    githubLink: 'https://github.com/HariM917/Lecture_Assistant',
    featured: false,
  },
  {
    _id: '6',
    title: 'Tamil Nadu Smart Public Transport Platform',
    description: 'An intelligent public transit management and passenger information system for Tamil Nadu. Features real-time bus/train tracking, dynamic route optimization, integrated smart ticketing, and commuter dashboards. Leverages IoT sensors and location APIs to provide live transit updates and improve overall commuting efficiency.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'IoT', 'Google Maps API'],
    githubLink: 'https://github.com/HariM917/Tamil-Nadu-Smart-Public-Transport-Platform',
    featured: false,
  },
];

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.log('MongoDB down, returning mock data');
    res.json(mockProjects);
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true });
    res.json(projects);
  } catch (error) {
    console.log('MongoDB down, returning mock featured data');
    res.json(mockProjects.filter(p => p.featured));
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    const mock = mockProjects.find(p => p._id === req.params.id);
    if (mock) return res.json(mock);
    res.status(500).json({ message: error.message });
  }
});

// Create project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error: MongoDB not connected. Mock projects are available for GET requests.' });
  }
});

// Update project
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    Object.assign(project, req.body);
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error: MongoDB not connected.' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
