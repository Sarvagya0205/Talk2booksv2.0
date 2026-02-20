from fastapi import FastAPI
from pydantic import BaseModel
from app.routes import chat ,books

app=FastAPI()

app.include_router(chat.router , prefix="/chat" ,tags=["Chat"])
app.include_router(books.router , prefix="/books" , tags=["Books"])
@app.get("/")
def home():
    return {"message":"your live!!"}