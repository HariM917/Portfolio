from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000, description="User question about Hari's portfolio")

class ChatResponse(BaseModel):
    answer: str = Field(..., description="Grounded response based on portfolio knowledge")
    sources: List[str] = Field(default_factory=list, description="Relevant source sections referenced")
    confidence: Optional[float] = Field(default=None, description="Retrieval similarity score")

class HealthResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    status: str = "ok"
    version: str = "1.0.0"
    model_loaded: bool = True
    knowledge_chunks: int = 0
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
