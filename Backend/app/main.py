from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.routes import chat ,books ,search
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router , prefix="/chat" ,tags=["Chat"])
app.include_router(books.router , prefix="/books" , tags=["Books"])
app.include_router(search.router , prefix="/search",tags=["Search"])
@app.get("/")
def home():
    return {"message":"your live!!"}