from fastapi import APIRouter , UploadFile , File , Form
from pymongo import MongoClient
from app.schemas.book_schema import BookResponse,BookUploadResponse ,DeleteBookResponse
from app.services.book_service import get_books,save_books ,save_metadata , delete_book
from typing import List
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
    
@router.delete("/delete",response_model=DeleteBookResponse)
async def delete_book_route(book_id:str):
    result= await delete_book(book_id)

    return DeleteBookResponse(
        message=result["message"],
        book_id=result["book_id"]
    )

@router.get("/",response_model=List[BookResponse])
async def list_books():
    books= await get_books()

    return books 