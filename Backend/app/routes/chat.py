from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chat_services import get_chat_response
from app.services.rag_service import rag_query
from app.schemas.chat_schema import ChatRequest ,ChatResponse
router = APIRouter()

@router.post("/chat" ,response_model=ChatResponse)
async def chat(query:ChatRequest):
    result = rag_query(
        question=query.question,
        book_id=query.book_id
    )
    return ChatResponse(
        answer=result["answer"]
    )