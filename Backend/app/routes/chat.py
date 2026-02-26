from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chat_services import get_chat_response
from app.services.rag_service import rag_query
router = APIRouter()

class ChatRequest(BaseModel):
    question :str

@router.post("/")
def chat(query:str):
    # result =rag_query(query)
    # return {"answer":result["answer"]}
    return rag_query(query)