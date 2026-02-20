import fitz
from langdetect import detect


def extract_text_from_pdf(file_path: str)->str:
    text=""
    doc = fitz.open(file_path)

    for page in doc:
        text += page.get_text()
    
    return text

def normalize_text(text:str) -> str:
    text = text.strip()
    text=" ".join(text.split())
    return text

def detect_lang(text:str)->str:
    try:
        return detect(text)
    except:
        return "unknown"