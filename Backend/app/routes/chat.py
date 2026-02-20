from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chat_services import get_chat_response

router = APIRouter()

class ChatRequest(BaseModel):
    question :str

@router.post("/")
def chat(request:ChatRequest):
    answer = get_chat_response(request.question)
    return{"answer":answer}