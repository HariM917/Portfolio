import React from 'react';
import { statsData } from '../data/resume';

const About = ({ addRevealRef }) => {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <div className="section-header reveal" ref={addRevealRef}>
          <p className="section-label">About</p>
          <h2 className="section-title">Background & Focus</h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal" ref={addRevealRef}>
            <p>
              I am an aspiring AI/ML Engineer and Fullstack Developer specializing in end-to-end intelligent systems. 
              My expertise spans the entire development lifecycle — from crafting responsive, accessible user interfaces in 
              React to designing high-performance Python backends with FastAPI and Flask.
            </p>
            <p>
              My core technical passion lies in applied Generative AI, Retrieval-Augmented Generation (RAG), Semantic Vector 
              Search with FAISS, and NLP Transformer pipelines. I have architected systems like <strong>TalentFlow</strong> (an AI-powered ATS 
              delivering a 30% discovery efficiency boost) and an <strong>AI Emergency Response System</strong> with interactive 3D tactical building mapping.
            </p>
            <p>
              Whether competing at national hackathons like <strong>Smart India Hackathon 2025</strong> or building scalable enterprise document 
              intelligence pipelines, I focus on measurable impact, robust architecture, and code that performs reliably in production.
            </p>
          </div>

          <div className="about-stats reveal-stagger reveal" ref={addRevealRef}>
            {statsData.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
