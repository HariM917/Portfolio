# Hari M — AI/ML Engineer & Fullstack Developer Portfolio with RAG Chatbot

A high-performance personal portfolio website for **Hari M**, featuring instant static loading and an interactive **Retrieval-Augmented Generation (RAG)** AI Chatbot powered by **FastAPI**, **SentenceTransformers**, and **FAISS**.

---

## 🌟 Key Architecture Highlights

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React.js)                      │
│  Loads immediately with zero backend network delay          │
│  - About & Stats            - Education (Vel Tech High Tech)│
│  - Categorized Skills       - Certifications (Infosys / SIH)│
│  - Static Project Cards     - Direct Contact & Socials      │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Only AI Chatbot Queries)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Python FastAPI)                    │
│  - /health (monitoring)                                     │
│  - /api/chat (semantic query processing)                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                RAG ENGINE & VECTOR STORE                    │
│  - Embeddings: sentence-transformers/all-MiniLM-L6-v2       │
│  - Vector Index: FAISS IndexFlatIP (Cosine Similarity)      │
│  - Knowledge Base: backend/data/portfolio_knowledge.txt     │
└─────────────────────────────────────────────────────────────┘
```

- **Instant Load Guarantee:** The entire portfolio (About, Skills, Projects, Education, Certifications, Contact) renders purely from static data files in `src/data/` with **zero network dependency**.
- **Render Sleep Resilience:** If the free-tier Render backend is asleep, the portfolio website loads immediately at full speed. Only the chatbot gracefully displays a wake-up banner while spinning up.
- **RAG-Powered AI Assistant:** Visitors can ask natural language questions about Hari's background, skills, and systems with grounded, hallucination-free answers.

---

## 📂 Project Structure

```
Portfolio/
├── frontend/                     # React Frontend Application
│   ├── public/
│   │   └── index.html            # SEO metadata and Open Graph tags
│   ├── src/
│   │   ├── components/           # Modular UI Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx      # Static project showcase
│   │   │   ├── Education.jsx     # Academic timeline
│   │   │   ├── Certifications.jsx# Credentials & SIH 2025
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Chatbot/          # Floating AI Assistant
│   │   │       ├── Chatbot.jsx
│   │   │       ├── ChatMessage.jsx
│   │   │       └── ChatInput.jsx
│   │   ├── data/                 # Ground Truth Static Data
│   │   │   ├── projects.js       # Verified projects & descriptions
│   │   │   ├── skills.js         # Categorized tech stack
│   │   │   └── resume.js         # Education, certifications, socials
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env                      # REACT_APP_API_URL / VITE_API_URL
│   └── package.json
│
├── backend/                      # Python FastAPI RAG Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI app & CORS configuration
│   │   ├── rag.py                # FAISS vector search & answer synthesis
│   │   ├── embeddings.py         # SentenceTransformers loader
│   │   ├── schemas.py            # Pydantic request/response models
│   │   └── config.py             # Environment configuration
│   ├── data/
│   │   └── portfolio_knowledge.txt # RAG Knowledge Base
│   ├── requirements.txt          # Python production dependencies
│   └── README.md
│
├── render.yaml                   # Render Blueprint for backend
├── vercel.json                   # Vercel deployment configuration
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Run Backend (FastAPI RAG)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python -m uvicorn app.main:app --reload --port 8001
```

- API runs at: `http://localhost:8001`
- Health check: `http://localhost:8001/health`
- Interactive docs: `http://localhost:8001/docs`

### 2. Run Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

- App runs at: `http://localhost:3000`

---

## 🌐 Production Deployment

### Frontend (Deploy to Vercel)

1. Connect your repository to **Vercel**.
2. Set Root Directory to `frontend`.
3. Build Command: `npm run build`
4. Output Directory: `build`
5. Add Environment Variable:
   - `REACT_APP_API_URL`: `https://your-rag-backend.onrender.com`
   - `VITE_API_URL`: `https://your-rag-backend.onrender.com`

### Backend (Deploy to Render)

1. Create a **New Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure service settings:
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables:
   - `PYTHON_VERSION`: `3.11.9`
   - `ENVIRONMENT`: `production`

---

## ✏️ How to Update Information

| To Update... | Modify File |
| :--- | :--- |
| **Projects** | `frontend/src/data/projects.js` & `backend/data/portfolio_knowledge.txt` |
| **Skills** | `frontend/src/data/skills.js` & `backend/data/portfolio_knowledge.txt` |
| **Education / Certifications** | `frontend/src/data/resume.js` & `backend/data/portfolio_knowledge.txt` |
| **RAG Knowledge Base** | `backend/data/portfolio_knowledge.txt` |

---

## 📄 Verified Profile Summary

- **Name:** Hari M (HARI.M)
- **Headline:** AI/ML Engineer | Fullstack Developer
- **Education:** B.E. in CSE (AI & ML) @ Vel Tech High Tech (CGPA: 7.61 / 10.0, Graduating 2028)
- **Certifications:** Infosys Springboard (Machine Learning, AI with Python, Java), SIH 2025 Participant
- **Featured Systems:**
  - **TalentFlow:** AI Hiring Intelligence ATS with FAISS & RAG (+30% candidate discovery boost)
  - **AI Emergency Response System:** 3D tactical spatial mapping & rapid crisis dispatch
