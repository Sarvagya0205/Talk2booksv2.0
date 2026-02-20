from fastapi import FastAPI
from pydantic import BaseModel
from app.routes import chat

app=FastAPI()

app.include_router(chat.router , prefix="/chat" ,tags=["Chat"])

@app.get("/")
def home():
    return {"message":"your live!!"}

