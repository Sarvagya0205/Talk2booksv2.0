import os
from datetime import datetime
from app.db.mongo import db
from app.utils.text_processing import(
    extract_text_from_pdf,
    normalize_text,
    detect_lang
)
from app.utils.text_chunking import split_text_into_chunks

UPLOAD_DIR="uploads"
os.makedirs(UPLOAD_DIR,exist_ok=True)

async def save_books(title , author , file):
    file_path=f"{UPLOAD_DIR}/{file.filename}"

    # saving here
    with open(file_path ,"wb")as f:
        content = await file.read()
        f.write(content)
    
    # extracting text
    raw_text = extract_text_from_pdf(file_path)

    # clean text
    clean_text=normalize_text(raw_text)

    # detect language
    language = detect_lang(clean_text)

    # chunk building
    chunks = split_text_into_chunks(clean_text)

    # storing in mongoDB(local)
    book={
        "title":title,
        "author":author,
        "file_path":file_path,
        "language":language,
        "chunks":chunks,
        "uploaded at":datetime.now()
    }

    db.books.insert_one(book)

    return{
        "message":"Book uploaded succcessfully",
        "language":language,
        "total_chunks":len(chunks)
    }