import os
from datetime import datetime
import uuid
from app.db.mongo import books_collection
from app.utils.text_processing import(
    extract_text_from_pdf,
    normalize_text,
    detect_lang
)
from qdrant_client.models import PointStruct ,Filter , FieldCondition , MatchValue
from app.utils.text_chunking import split_text_into_chunks
from app.utils.embedding import generate_embeddings
from app.db.qdrant import client , create_collection , COLLECTION_NAME
from bson import ObjectId
UPLOAD_DIR="uploads"
os.makedirs(UPLOAD_DIR,exist_ok=True)


async def save_books(title , author , file_path :str ,book_id:str):

    # extracting text
    raw_text = extract_text_from_pdf(file_path)
    
    # clean text
    clean_text=normalize_text(raw_text)
    
    # detect language
    language = detect_lang(clean_text)
    
    # chunk building
    chunks = split_text_into_chunks(clean_text)
    chunks_main=chunks
    # generating embeddings 
    embeddings = generate_embeddings(chunks)

    create_collection()

    points=[
        PointStruct(
            id=str(uuid.uuid4()),
            vector=embeddings[i],
            payload={
                "book_id":book_id,
                "text":chunks[i],
                "title":title,
                "author":author
            }
        )
        for i in range(len(embeddings))
    ]

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )
    return{
        "message":"Book uploaded succcessfully",
        "language":language,
        "total_chunks":len(chunks),
    }

async def save_metadata(title:str , author:str , filename):
    # storing in mongoDB(atlas)
    book={
        "title":title,
        "author":author,
        "filename":filename,
        "uploaded at":datetime.now()
    }

    result=books_collection.insert_one(book)
    return str(result.inserted_id)

async def save_upload_file(file):
    original_name = os.path.basename(file.filename or "uploaded.pdf")
    stored_name = f"{uuid.uuid4()}_{original_name}"
    file_path = os.path.join(UPLOAD_DIR, stored_name)

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    return stored_name, file_path

async def delete_book(book_id:str):
    # deleting metadata
    books_collection.delete_one({"_id":ObjectId(book_id)})

    # deleting vectors in Qdrant
    client.delete(
        collection_name=COLLECTION_NAME,
        points_selector=Filter(
            must=[
                FieldCondition(
                    key="book_id",
                    match=MatchValue(value=book_id)
                )
            ]
        )
    )

    return{
        "message":"Book deleted Successfully",
        "book_id":book_id
    }

async def get_books():
    books=books_collection.find()

    result=[]

    for book in books:
        result.append(
            {
                "book_id":str(book["_id"]),
                "title":book["title"],
                "author":book["author"]
            }
        )
    
    return result