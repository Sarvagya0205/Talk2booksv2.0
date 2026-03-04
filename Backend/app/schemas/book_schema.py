from  pydantic import BaseModel , Field
from datetime import datetime

class BookMetaData(BaseModel):
    id:str=Field(...,description="Mongo DB book_id")
    title:str
    author:str
    filename:str
    uploaded_at:datetime

class BookUploadResponse(BaseModel):
    message:str
    book_id:str
    total_chunks:int
    language:str
