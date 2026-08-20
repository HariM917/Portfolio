import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.schemas import ChatRequest, ChatResponse, HealthResponse
from app.rag import rag_engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing Hari M Portfolio RAG Chatbot API...")
    try:
        rag_engine.initialize()
        logger.info("RAG Engine successfully initialized on startup.")
    except Exception as e:
        logger.error(f"Failed to initialize RAG Engine on startup: {e}", exc_info=True)
    yield
    logger.info("Shutting down Portfolio RAG Chatbot API.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Dedicated RAG-powered chatbot API for Hari M's Portfolio",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", summary="Root status check")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "healthy",
        "endpoints": {
            "health": "/health",
            "chat": "/api/chat"
        }
    }

@app.get("/health", response_model=HealthResponse, summary="Health check endpoint for deployment monitoring")
async def health_check():
    return HealthResponse(
        status="ok",
        version=settings.VERSION,
        model_loaded=rag_engine.is_initialized,
        knowledge_chunks=len(rag_engine.chunks) if rag_engine.chunks else 0
    )

@app.post("/api/chat", response_model=ChatResponse, summary="RAG query endpoint")
async def chat_endpoint(payload: ChatRequest):
    query = payload.message.strip()
    if not query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question message cannot be empty."
        )

    try:
        retrieved = rag_engine.retrieve(query, top_k=settings.TOP_K)
        answer, sources, confidence = rag_engine.generate_grounded_answer(query, retrieved)
        return ChatResponse(
            answer=answer,
            sources=sources,
            confidence=round(confidence, 4) if confidence else None
        )
    except Exception as e:
        logger.error(f"Error handling chat query '{query}': {e}", exc_info=True)
        return ChatResponse(
            answer="I apologize, but I encountered an error while processing your request. Please try asking again in a moment.",
            sources=[],
            confidence=0.0
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
