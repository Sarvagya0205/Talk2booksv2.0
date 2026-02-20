from fastapi import APIRouter , UploadFile , File , Form
from app.services.book_service import save_books

router = APIRouter()

@router.post("/upload")
async def upload_book(
    title:str=Form(),
    author:str =Form(),
    file: UploadFile = File()
):
    return await save_books(title , author , file)