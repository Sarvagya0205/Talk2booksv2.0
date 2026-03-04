from fastapi import APIRouter , UploadFile , File , Form
from pymongo import MongoClient
from app.schemas.book_schema import BookUploadResponse
from app.services.book_service import save_books ,save_metadata
router = APIRouter()

@router.post("/upload",response_model=BookUploadResponse)
async def upload_book(
    title:str=Form(),
    author:str =Form(),
    file: UploadFile = File()
):
    book_id=await save_metadata(title,author,file)
    book_result= await save_books(title,author,file,book_id)
    
    return BookUploadResponse(
        message="book uploaded successfully",
        book_id=book_id,
        total_chunks=book_result['total_chunks'],
        language=book_result["language"]
    )
    