import os
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "Hari M - Portfolio RAG Chatbot API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "production")
    
    # Model configuration
    EMBEDDING_MODEL_NAME: str = os.getenv("EMBEDDING_MODEL_NAME", "sentence-transformers/all-MiniLM-L6-v2")
    
    # Knowledge base & Vector store
    KNOWLEDGE_BASE_PATH: str = os.getenv(
        "KNOWLEDGE_BASE_PATH", 
        str(BASE_DIR / "data" / "portfolio_knowledge.txt")
    )
    VECTORSTORE_DIR: str = os.getenv(
        "VECTORSTORE_DIR",
        str(BASE_DIR / "vectorstore")
    )
    
    # RAG parameters
    TOP_K: int = int(os.getenv("TOP_K", "3"))
    SIMILARITY_THRESHOLD: float = float(os.getenv("SIMILARITY_THRESHOLD", "0.25"))
    
    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "https://hari-m-portfolio.vercel.app",
        "https://portfolio-frontend-six-gamma.vercel.app",
        "*"  # Allows access while developing or previewing on Vercel
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
