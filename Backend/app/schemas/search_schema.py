from pydantic import BaseModel , Field
from typing import List
from app.config.settings import get_settings
Setting=get_settings()
class SearchRequest(BaseModel):
    query:str
    top_k:int =5

class SearchResult(BaseModel):
    text:str
    book_id:str

class SearchResponse(BaseModel):
    results:List[SearchResult]