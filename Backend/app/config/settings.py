from pydantic_settings import BaseSettings ,SettingsConfigDict
from functools import lru_cache
from dotenv import load_dotenv
load_dotenv()

class Settings(BaseSettings):
    #database
    MONGO_URL:str
    MONGO_DB_NAME:str

    QDRANT_URL:str="http://localhost:6333"
    QDRANT_API_KEY:str |None=None

    # Embeddings
    EMBEDDING_MODEL:str="sentence-transformers/all-MiniLM-L6-v2"
    VECTOR_SIZE:int =384
    QDRANT_COLLECTION_NAME: str = "book_embeddings"
    # APP
    APP_NAME:str ="Talk2Books"
    DEBUG:bool = True
    # LLM
    OPENAI_API_KEY:str
    OPENAI_MODEL:str="gpt-5"
    
    model_config=SettingsConfigDict(
        env_file=".env",
        case_sensitive=True
    )

@lru_cache
def get_settings():
    return Settings()