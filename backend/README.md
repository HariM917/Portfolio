# Hari M — Portfolio RAG Chatbot API

FastAPI backend providing a Retrieval-Augmented Generation (RAG) assistant for Hari M's personal portfolio.

## Architecture

- **Framework:** FastAPI (Python 3.11+)
- **Embedding Model:** `sentence-transformers/all-MiniLM-L6-v2`
- **Vector Store:** FAISS (`IndexFlatIP` with normalized L2 embeddings)
- **Knowledge Base:** Structured static text at `data/portfolio_knowledge.txt`
- **Deployment:** Render (`uvicorn app.main:app --host 0.0.0.0 --port $PORT`)

## API Endpoints

### 1. Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "model_loaded": true,
  "knowledge_chunks": 14,
  "timestamp": "2026-08-20T10:45:00.000Z"
}
```

### 2. Chat Query
```http
POST /api/chat
Content-Type: application/json

{
  "message": "What projects has Hari built?"
}
```
**Response:**
```json
{
  "answer": "Hari has developed several impactful full-stack and AI/ML systems...",
  "sources": [
    "FEATURED PROJECTS - Project 1: TalentFlow",
    "FEATURED PROJECTS - Project 2: AI Emergency Response System"
  ],
  "confidence": 0.8842
}
```

## Local Development

1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

## Render Deployment

- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables:**
  - `PYTHON_VERSION`: `3.11.9`
  - `ENVIRONMENT`: `production`
