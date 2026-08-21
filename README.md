# Hari M — AI/ML Engineer & Fullstack Developer Portfolio with Voiceflow AI Chatbot

A high-performance personal portfolio website for **Hari M**, featuring instant static loading and an interactive **Voiceflow-powered AI Chatbot** with grounded knowledge retrieval.

---

## 🌟 Architecture Overview

```text
                         VERCEL
                           |
                   React Portfolio
                           |
       ┌───────────────────┼───────────────────┐
       |                   |                   |
     About              Projects             Skills
    STATIC               STATIC              STATIC
       |                   |                   |
       └───────────────────┼───────────────────┘
                           |
                    Voiceflow Webchat
                           |
                           ↓
                    Voiceflow Agent
                           |
                           ↓
                  Voiceflow Knowledge Base
                           |
                           ↓
                  AI-generated answers
```

- **Instant Load Guarantee:** The entire portfolio (About, Skills, Projects, Education, Certifications, Contact) renders from static data files in `src/data/` with **zero network delays or backend dependencies**.
- **Voiceflow AI Assistant:** Embedded official Voiceflow Webchat answering visitor questions accurately using the verified Knowledge Base in `voiceflow/Hari_Portfolio_Knowledge.md`.
- **Zero Server Maintenance:** Zero custom backend servers required — deployed 100% on Vercel Edge.

---

## 📂 Project Structure

```text
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
│   │   │   ├── Projects.jsx      # Static project showcase (all 7 projects)
│   │   │   ├── Education.jsx     # Academic timeline
│   │   │   ├── Certifications.jsx# Credentials & SIH 2025
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Chatbot/
│   │   │       └── Chatbot.jsx   # Voiceflow Webchat embedded widget
│   │   ├── config/
│   │   │   └── voiceflow.js      # Centralized Voiceflow Webchat config
│   │   ├── data/                 # Ground Truth Static Data
│   │   │   ├── projects.js       # Verified 7 projects & descriptions
│   │   │   ├── skills.js         # Categorized tech stack
│   │   │   └── resume.js         # Education, certifications, socials
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env                      # REACT_APP_VOICEFLOW_PROJECT_ID
│   └── package.json
│
├── voiceflow/                    # Voiceflow Knowledge Base & Setup Guides
│   ├── Hari_Portfolio_Knowledge.md # Complete portfolio knowledge document
│   └── VOICEFLOW_SETUP.md        # Step-by-step Voiceflow integration guide
│
├── vercel.json                   # Vercel static deployment configuration
├── DEPLOYMENT.md                 # Deployment instructions
└── README.md
```

---

## 🚀 Local Development Setup

### Run Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

- App runs at: `http://localhost:3000`

---

## 🤖 Voiceflow AI Assistant Setup

1. Follow the full setup guide in [`voiceflow/VOICEFLOW_SETUP.md`](./voiceflow/VOICEFLOW_SETUP.md).
2. Create an Assistant and Knowledge Base on [Voiceflow.com](https://www.voiceflow.com) using [`voiceflow/Hari_Portfolio_Knowledge.md`](./voiceflow/Hari_Portfolio_Knowledge.md).
3. Set the anti-hallucination agent prompt provided in the guide.
4. Copy your **Public Project ID** from Integrations / Web Chat and set `REACT_APP_VOICEFLOW_PROJECT_ID` in `frontend/.env`.

---

## 🌐 Production Deployment (Vercel)

1. Connect your GitHub repository to **Vercel**.
2. Configure project settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
3. Add Environment Variables:
   - `REACT_APP_VOICEFLOW_PROJECT_ID`: `YOUR_VOICEFLOW_PROJECT_ID`
   - `REACT_APP_VOICEFLOW_VERSION_ID`: `production`
4. Click **Deploy**.

---

## ✏️ How to Update Information

| To Update... | Modify File |
| :--- | :--- |
| **Projects (7 Projects)** | `frontend/src/data/projects.js` & `voiceflow/Hari_Portfolio_Knowledge.md` |
| **Skills** | `frontend/src/data/skills.js` & `voiceflow/Hari_Portfolio_Knowledge.md` |
| **Education / Certifications** | `frontend/src/data/resume.js` & `voiceflow/Hari_Portfolio_Knowledge.md` |
| **AI Chatbot Knowledge** | `voiceflow/Hari_Portfolio_Knowledge.md` (re-sync on Voiceflow Knowledge Base) |

---

## 📄 Verified Profile Summary

- **Name:** Hari M (HARI.M)
- **Headline:** AI/ML Engineer | Fullstack Developer
- **Education:** B.E. in CSE (AI & ML) @ Vel Tech High Tech (CGPA: 7.61 / 10.0, Graduating 2028)
- **Certifications:** Infosys Springboard (Machine Learning, AI with Python, Java), SIH 2025 Participant
- **Verified Projects (7):**
  1. **TalentFlow:** Elite AI Hiring Intelligence System (ATS with FAISS & RAG, +30% discovery boost)
  2. **AI Emergency Response System:** 3D tactical spatial mapping & rapid crisis dispatch
  3. **Smart Traffic Management System:** Computer vision (YOLO) & RL adaptive traffic control (SIH 2025)
  4. **Enterprise Document Intelligence Platform:** OCR & NLP entity recognition & PII redaction
  5. **Real-Time Multilingual Lecture Assistant:** Whisper speech transcription & BART summarization
  6. **TN Smart Public Transport Platform:** IoT telemetry & commuter transit portal
  7. **Task Manager Platform:** Kanban collaboration tool with real-time state sync
