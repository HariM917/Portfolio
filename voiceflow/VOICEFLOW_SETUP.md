# Voiceflow Chatbot Integration Guide for Hari's Portfolio

This guide explains how to set up your AI Chatbot on [Voiceflow](https://www.voiceflow.com), link the Knowledge Base, and embed it into your React portfolio deployed on Vercel.

---

## 1. Create a Voiceflow Account & Assistant
1. Visit [https://www.voiceflow.com](https://www.voiceflow.com) and sign up / log in.
2. Click **Create Assistant** (or **New Project**).
3. Name it: `Hari Portfolio AI Assistant`.
4. Select channel/modality: **Web Chat** (or General).
5. Choose primary language: **English**.

---

## 2. Upload the Knowledge Base
1. In the left navigation menu of your Voiceflow project, click **Knowledge Base** (icon with book/documents).
2. Click **+ Add Data Source** -> **Upload Documents** (or Plain Text / File).
3. Select and upload [`Hari_Portfolio_Knowledge.md`](./Hari_Portfolio_Knowledge.md).
4. Voiceflow will automatically process and index the sections, projects, skills, and credentials.

---

## 3. Configure Agent Prompt & Knowledge Base Retrieval

In your Voiceflow Canvas or AI Agent Settings (Knowledge Base Settings):

### System / AI Prompt Instructions:
```text
You are Hari's portfolio AI assistant embedded into his portfolio website (https://hari-m-portfolio.vercel.app).

Your job is to answer visitor questions accurately, professionally, and helpfully about Hari's:
- Professional profile & summary
- AI/ML, Web, and Software Engineering skills
- 7 Verified Projects (TalentFlow ATS, AI Emergency Response System, Smart Traffic Management System SIH 2025, Enterprise Document Intelligence Platform, Real-Time Multilingual Lecture Assistant, TN Smart Public Transport Platform, Task Manager)
- Education (B.E. in CSE AIML @ Vel Tech High Tech, CGPA: 7.61)
- Certifications (Infosys Springboard) and Hackathons (Smart India Hackathon 2025)
- Contact details (harimurali10a@gmail.com) and LinkedIn / GitHub

CRITICAL RULES:
1. STRICT GROUNDING: Use the Voiceflow Knowledge Base as the primary source of truth.
2. NO HALLUCINATIONS: Do not invent any jobs, companies, internships, metrics, technologies, education, certifications, or demos not found in the Knowledge Base.
3. UNKNOWN QUERIES: If requested information is not available in the Knowledge Base, clearly state: "I don't have that specific detail in Hari's portfolio knowledge base, but you can reach Hari directly at harimurali10a@gmail.com or via LinkedIn."
4. UNRELATED QUERIES: For unrelated questions, politely explain that you are designed specifically to answer questions about Hari's portfolio and AI/ML work.
5. FORMATTING: Use clean, concise markdown formatting with bullet points and bold highlights.
```

### Knowledge Base Settings:
- Ensure **Knowledge Base** is enabled on the AI Response step or Global Fallback step.
- Model: Select **Claude 3.5 Sonnet**, **GPT-4o**, or **GPT-4o-mini**.
- Temperature: `0.1` to `0.3` (for high factual accuracy and zero hallucinations).

---

## 4. Obtain the Webchat Project ID

1. In the top right corner of the Voiceflow canvas, click **Publish**.
2. Go to **Integrations** (or **Web Chat** / **Settings** -> **Widget**).
3. Under **Installation Code**, Voiceflow provides an embed snippet like:
   ```html
   <script type="text/javascript">
     (function(d, t) {
         var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
         v.onload = function() {
           window.voiceflow.chat.load({
             verify: { projectID: 'YOUR_VOICEFLOW_PROJECT_ID' },
             url: 'https://general-runtime.voiceflow.com',
             versionID: 'production'
           });
         }
         v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
     })(document, 'script');
   </script>
   ```
4. Your **`projectID`**: `6a869ba2aa108d478a890108`

---

## 5. Configure Frontend Environment Variables

In your `frontend/.env` file:

```env
# Voiceflow Public Webchat Configuration
REACT_APP_VOICEFLOW_PROJECT_ID=6a869ba2aa108d478a890108
REACT_APP_VOICEFLOW_VERSION_ID=production
```

> **Security Note:** The Voiceflow `projectID` is a **public client embed identifier** meant for frontend widgets. It does not give admin or private API access. Never put private Voiceflow API keys in client-side code.

---

## 6. Deploy to Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Migrate chatbot to Voiceflow"
   git push origin main
   ```
2. Go to your **Vercel Dashboard** -> select your `Portfolio` project.
3. Go to **Settings** -> **Environment Variables**.
4. Add:
   - `REACT_APP_VOICEFLOW_PROJECT_ID` = `YOUR_VOICEFLOW_PROJECT_ID`
   - `REACT_APP_VOICEFLOW_VERSION_ID` = `production`
5. Click **Redeploy**.

Your static portfolio is now live on Vercel with your Voiceflow AI Assistant!
