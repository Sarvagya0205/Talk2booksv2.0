from fastapi import APIRouter
from app.services.search_service import search_books

router=APIRouter()

@router.get("/")
def search(query : str):
    return search_books(query)