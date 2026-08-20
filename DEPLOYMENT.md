# Deployment Guide — Portfolio & FastAPI RAG Backend

This guide walks you through deploying your portfolio architecture:
- **Frontend:** Vercel (Static hosting with zero-delay edge CDN)
- **Backend:** Render (Python FastAPI RAG web service)

---

## 1. Deploying the Backend on Render

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository: `HariM917/Portfolio`.
4. Fill in the configuration:
   - **Name:** `portfolio-rag-backend`
   - **Region:** Oregon (US West) or Singapore
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** `Free`
5. Under **Environment Variables**, add:
   - `PYTHON_VERSION` = `3.11.9`
   - `ENVIRONMENT` = `production`
6. Click **Deploy Web Service**.
7. Once deployed, copy your Render URL: e.g., `https://portfolio-rag-backend-xxxx.onrender.com`.
8. Verify deployment by visiting: `https://portfolio-rag-backend-xxxx.onrender.com/health`

---

## 2. Deploying the Frontend on Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository: `HariM917/Portfolio`.
4. Configure project settings:
   - **Framework Preset:** `Create React App`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Add **Environment Variables**:
   - `REACT_APP_API_URL` = `https://portfolio-rag-backend-xxxx.onrender.com` (Your Render URL from Step 1)
   - `VITE_API_URL` = `https://portfolio-rag-backend-xxxx.onrender.com`
6. Click **Deploy**.

---

## 3. Post-Deployment Verification

1. Open your Vercel URL in a new browser tab.
2. Confirm that:
   - Header, Hero, About, Projects, Skills, Education, Certifications, and Contact render **instantly**.
   - No `...` loading dots appear in the Projects section.
   - Click the **Ask AI** floating widget in the bottom-right.
   - Send test questions like:
     - *"What projects has Hari built?"*
     - *"Tell me about TalentFlow"*
     - *"What are his AI/ML skills?"*
3. If Render was asleep, observe that the chatbot displays:
   *"AI assistant is waking up on Render (may take ~15s)..."*
   and then seamlessly delivers the answer once Render spins up, without disrupting the main website.
