import logging
import numpy as np
from sentence_transformers import SentenceTransformer
from app.config import settings

logger = logging.getLogger(__name__)

_model = None

def get_embedding_model() -> SentenceTransformer:
    """Lazy-load and cache the SentenceTransformer model."""
    global _model
    if _model is None:
        logger.info(f"Loading embedding model: {settings.EMBEDDING_MODEL_NAME}")
        _model = SentenceTransformer(settings.EMBEDDING_MODEL_NAME)
        logger.info("Embedding model loaded successfully.")
    return _model

def get_embeddings(texts: list[str]) -> np.ndarray:
    """Generate normalized float32 embeddings for a list of texts."""
    model = get_embedding_model()
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
    return np.array(embeddings, dtype=np.float32)

def get_query_embedding(query: str) -> np.ndarray:
    """Generate a normalized float32 embedding for a single query."""
    model = get_embedding_model()
    embedding = model.encode([query], normalize_embeddings=True, show_progress_bar=False)
    return np.array(embedding, dtype=np.float32)
