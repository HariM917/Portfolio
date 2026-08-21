# Deployment Guide — Hari M's Portfolio with Voiceflow AI Chatbot

This guide explains how to deploy your portfolio on **Vercel** with the embedded **Voiceflow AI Assistant**.

---

## Architecture Overview

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

- **Frontend:** Vercel (Fast edge CDN, pure static React application)
- **AI Chatbot:** Voiceflow (Managed AI Assistant with RAG & Knowledge Base)
- **Backend Dependency:** **None** (Render backend completely removed; zero server maintenance)

---

## 1. Set Up Voiceflow AI Assistant

1. Follow the step-by-step instructions in [`voiceflow/VOICEFLOW_SETUP.md`](./voiceflow/VOICEFLOW_SETUP.md).
2. Upload [`voiceflow/Hari_Portfolio_Knowledge.md`](./voiceflow/Hari_Portfolio_Knowledge.md) to your Voiceflow Knowledge Base.
3. Publish your Voiceflow Assistant and copy your **Public Project ID** from Web Chat settings.

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
5. Under **Environment Variables**, add:
   - `REACT_APP_VOICEFLOW_PROJECT_ID` = `YOUR_VOICEFLOW_PROJECT_ID`
   - `REACT_APP_VOICEFLOW_VERSION_ID` = `production`
6. Click **Deploy**.

---

## 3. Post-Deployment Verification

1. Open your Vercel URL in a browser.
2. Confirm that:
   - Hero, About, Projects (all 7 cards), Skills, Education, Certifications, Contact, and Footer render **instantly**.
   - No loading screens or server wait times.
   - The **Voiceflow Webchat** widget loads in the bottom-right corner.
   - Verify that Voiceflow connects and answers portfolio questions accurately based on `Hari_Portfolio_Knowledge.md`.
