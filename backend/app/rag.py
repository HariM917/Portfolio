import os
import re
import logging
import faiss
import numpy as np
from pathlib import Path
from typing import List, Dict, Tuple, Optional

from app.config import settings
from app.embeddings import get_embeddings, get_query_embedding

logger = logging.getLogger(__name__)

class PortfolioRAG:
    def __init__(self):
        self.chunks: List[Dict[str, str]] = []
        self.index: Optional[faiss.IndexFlatIP] = None
        self.is_initialized = False

    def load_knowledge_base(self) -> List[Dict[str, str]]:
        """Parse portfolio_knowledge.txt into structured, meaningful chunks."""
        kb_path = Path(settings.KNOWLEDGE_BASE_PATH)
        if not kb_path.exists():
            logger.error(f"Knowledge base file not found at {kb_path}")
            return []

        with open(kb_path, "r", encoding="utf-8") as f:
            content = f.read()

        raw_sections = content.split("\n## ")
        parsed_chunks = []

        for section in raw_sections:
            section = section.strip()
            if not section:
                continue

            lines = section.split("\n")
            header = lines[0].replace("#", "").strip()
            body = "\n".join(lines[1:]).strip()

            # Split sub-sections (###) if present to keep chunks specific
            if "### " in body:
                sub_sections = body.split("\n### ")
                for idx, sub in enumerate(sub_sections):
                    sub = sub.strip()
                    if not sub:
                        continue
                    if idx == 0 and not sub.startswith("###"):
                        # Lead text before first sub-section
                        if sub:
                            parsed_chunks.append({
                                "title": header,
                                "content": f"{header}:\n{sub}"
                            })
                    else:
                        sub_lines = sub.split("\n")
                        sub_header = sub_lines[0].replace("#", "").strip()
                        sub_body = "\n".join(sub_lines[1:]).strip()
                        parsed_chunks.append({
                            "title": f"{header} - {sub_header}",
                            "content": f"{header} - {sub_header}:\n{sub_body}"
                        })
            else:
                parsed_chunks.append({
                    "title": header,
                    "content": f"{header}:\n{body}"
                })

        logger.info(f"Loaded {len(parsed_chunks)} knowledge chunks from {kb_path}")
        return parsed_chunks

    def initialize(self):
        """Build and populate the FAISS vector index."""
        if self.is_initialized:
            return

        self.chunks = self.load_knowledge_base()
        if not self.chunks:
            logger.warning("No knowledge chunks found during initialization.")
            return

        texts = [chunk["content"] for chunk in self.chunks]
        embeddings = get_embeddings(texts)

        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatIP(dimension)
        self.index.add(embeddings)
        self.is_initialized = True
        logger.info(f"FAISS IndexFlatIP initialized with {self.index.ntotal} vectors of dim {dimension}.")

    def retrieve(self, query: str, top_k: int = 3) -> List[Tuple[Dict[str, str], float]]:
        """Retrieve top_k most relevant chunks using inner-product (cosine) similarity."""
        if not self.is_initialized or self.index is None or len(self.chunks) == 0:
            self.initialize()

        if self.index is None or self.index.ntotal == 0:
            return []

        query_vec = get_query_embedding(query)
        effective_k = min(top_k, self.index.ntotal)
        scores, indices = self.index.search(query_vec, effective_k)

        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx != -1 and idx < len(self.chunks):
                results.append((self.chunks[idx], float(score)))

        return results

    def generate_grounded_answer(self, query: str, retrieved_items: List[Tuple[Dict[str, str], float]]) -> Tuple[str, List[str], float]:
        """Synthesize a direct, professional, factual answer strictly from retrieved knowledge."""
        if not retrieved_items or retrieved_items[0][1] < settings.SIMILARITY_THRESHOLD:
            return (
                "I'm designed to answer questions about Hari's portfolio, skills, projects, education, and experience. "
                "I don't have information regarding this topic in Hari's verified portfolio.",
                [],
                retrieved_items[0][1] if retrieved_items else 0.0
            )

        top_score = retrieved_items[0][1]
        sources = list(dict.fromkeys([item[0]["title"] for item in retrieved_items]))
        context_text = "\n\n".join([item[0]["content"] for item in retrieved_items])

        q_lower = query.lower().strip()

        # Specific intent synthesis to provide crystal-clear, structured answers
        if any(w in q_lower for w in ["who is", "tell me about hari", "about hari", "introduce", "who are you"]):
            answer = (
                "**Hari M** is an aspiring **AI/ML Engineer and Fullstack Developer** based in Chennai, India. "
                "He specializes in Generative AI, Natural Language Processing (NLP), Retrieval-Augmented Generation (RAG), and Semantic Search. "
                "Hari is currently pursuing his Bachelor of Engineering in Computer Science (AI & ML) at Vel Tech High Tech (CGPA: 7.61/10.0, Graduating 2028). "
                "He has engineered production-ready AI systems including **TalentFlow** (an AI-powered ATS) and an **AI Emergency Response System** with 3D tactical mapping."
            )
            return answer, sources, top_score

        if "talentflow" in q_lower or "ats" in q_lower or "applicant tracking" in q_lower or "hiring" in q_lower:
            answer = (
                "**TalentFlow: Elite AI Hiring Intelligence System** is an AI-powered Applicant Tracking System developed by Hari.\n\n"
                "- **Core Stack:** React.js, Python, Flask, SQLite, FAISS Vector Search, Hugging Face Transformers, RAG, NLP.\n"
                "- **Key Features:** Semantic candidate matching with vector embeddings, automated candidate ranking, intelligent candidate-job matching, automated screening workflows, admin dashboard, and real-time status tracking.\n"
                "- **Impact:** Improved candidate discovery accuracy by **30%** and significantly reduced manual screening effort.\n"
                "- **GitHub:** https://github.com/HariM917/ATS\n"
                "- **Live Demo:** https://ats-silk-alpha.vercel.app/"
            )
            return answer, sources, top_score

        if "emergency" in q_lower or "rapid crisis" in q_lower or "3d" in q_lower or "tactical" in q_lower:
            answer = (
                "**AI Emergency Response System (Rapid Crisis Response)** is a real-time crisis management platform built by Hari.\n\n"
                "- **Core Stack:** React Three Fiber, Three.js, Python, FastAPI, WebSockets, AI Classification, Communication APIs.\n"
                "- **Key Features:** Interactive 3D tactical interior/exterior mapping, real-time incident tracking, responder monitoring and dispatch, multi-floor visualization, AI-powered incident classification, and automated Standard Operating Procedure (SOP) recommendations.\n"
                "- **GitHub:** https://github.com/HariM917/Rapid-Crisis-Problem"
            )
            return answer, sources, top_score

        if any(w in q_lower for w in ["what projects", "projects has he built", "projects built", "all projects", "list projects"]):
            answer = (
                "Hari has developed several impactful full-stack and AI/ML systems:\n\n"
                "1. **TalentFlow (AI Hiring Intelligence / ATS):** Semantic candidate matching using FAISS & RAG, boosting discovery accuracy by 30% ([GitHub](https://github.com/HariM917/ATS) | [Demo](https://ats-silk-alpha.vercel.app/)).\n"
                "2. **AI Emergency Response System:** Interactive 3D tactical mapping, real-time incident triage, and responder dispatch with React Three Fiber and FastAPI ([GitHub](https://github.com/HariM917/Rapid-Crisis-Problem)).\n"
                "3. **Smart Traffic Management System:** Real-time YOLO vehicle detection & reinforcement learning adaptive signals built for Smart India Hackathon ([GitHub](https://github.com/HariM917/STMS)).\n"
                "4. **Enterprise Document Intelligence Platform:** Automated OCR and spaCy NLP data extraction with PII detection ([GitHub](https://github.com/HariM917/DocumentIntelligence)).\n"
                "5. **Real-Time Multilingual Lecture Assistant:** Speech-to-text with Whisper API, 50+ language translation, and BART summarization ([GitHub](https://github.com/HariM917/Lecture_Assistant)).\n"
                "6. **TN Smart Public Transport Platform:** Live transit tracking and dynamic routing ([GitHub](https://github.com/HariM917/Tamil-Nadu-Smart-Public-Transport-Platform)).\n"
                "7. **Task Manager:** Full-stack collaboration tool with MongoDB ([GitHub](https://github.com/HariM917/Task-Manager))."
            )
            return answer, sources, top_score

        if any(w in q_lower for w in ["skill", "technologies", "tech stack", "languages", "what does hari know"]):
            answer = (
                "Here is an overview of Hari's verified technical skills:\n\n"
                "- **AI/ML:** Machine Learning, Deep Learning, TensorFlow, PyTorch, RAG, FAISS, Hugging Face Transformers, Sentence Transformers, Scikit-learn, Semantic Search, Google Gemini API, NLP, Pandas, NumPy, Data Analysis.\n"
                "- **Programming Languages:** Python, Java, C, C++.\n"
                "- **Web Development:** HTML5, CSS3, JavaScript, React.js, Vite, Tailwind CSS, Responsive Web Design.\n"
                "- **Backend & APIs:** FastAPI, Flask, REST APIs, WebSockets.\n"
                "- **Databases:** SQLite, MySQL, MongoDB, PostgreSQL.\n"
                "- **Tools & Cloud:** Git, Docker, AWS Fundamentals, Azure Fundamentals, Kubernetes, CI/CD Pipelines."
            )
            return answer, sources, top_score

        if any(w in q_lower for w in ["education", "college", "degree", "university", "school", "gpa", "cgpa", "study"]):
            answer = (
                "Hari's academic background:\n\n"
                "- **Bachelor of Engineering (B.E.) in Computer Science & Engineering (AI & ML)**\n"
                "  * **Institution:** Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College\n"
                "  * **Duration:** 2024 - 2028 (Graduation: 2028)\n"
                "  * **Current CGPA:** 7.61 / 10.0\n\n"
                "- **Higher Secondary Education**\n"
                "  * **School:** Daniel Thomas Matriculation Higher Secondary School (Completed: 2024)"
            )
            return answer, sources, top_score

        if any(w in q_lower for w in ["certification", "certificates", "courses", "hackathon", "sih"]):
            answer = (
                "Hari's verified certifications and achievements:\n\n"
                "- **Machine Learning with Scikit-Learn in Python** - Infosys Springboard\n"
                "- **AI Artificial Intelligence with Python** - Infosys Springboard\n"
                "- **Introduction to Java** - Infosys Springboard\n"
                "- **Smart India Hackathon 2025 (SIH 2025)** - Active Participant with the Smart Traffic Management System project."
            )
            return answer, sources, top_score

        if any(w in q_lower for w in ["contact", "email", "reach", "hire", "github", "linkedin", "social"]):
            answer = (
                "You can connect with Hari M via:\n\n"
                "- **Email:** [harimurali10a@gmail.com](mailto:harimurali10a@gmail.com)\n"
                "- **GitHub:** [https://github.com/HariM917](https://github.com/HariM917)\n"
                "- **LinkedIn:** [https://www.linkedin.com/in/harim917](https://www.linkedin.com/in/harim917)"
            )
            return answer, sources, top_score

        if any(w in q_lower for w in ["suitable", "why hire", "fit", "role", "strengths"]):
            answer = (
                "Hari is uniquely suited for AI/ML and Fullstack roles because:\n\n"
                "1. **Applied AI Expertise:** Hands-on development with RAG architectures, FAISS vector indexing, Hugging Face Transformers, and OpenAI/Gemini integrations.\n"
                "2. **Full-Stack Competence:** Proven track record building end-to-end applications with React, FastAPI, Flask, and relational/document databases.\n"
                "3. **Practical Problem Solving:** Demonstrated results including a 30% improvement in ATS candidate discovery and national hackathon participation (SIH 2025).\n"
                "4. **Strong Engineering Foundation:** Continuous learning across Python, C++, Java, Docker, and Cloud fundamentals with a disciplined 7.61 GPA."
            )
            return answer, sources, top_score

        # Default factual summary extracted directly from retrieved knowledge context
        formatted_answer = (
            f"Based on Hari's portfolio:\n\n"
            f"{context_text}"
        )
        return formatted_answer, sources, top_score

# Singleton RAG instance
rag_engine = PortfolioRAG()
