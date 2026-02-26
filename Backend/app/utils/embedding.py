from sentence_transformers import SentenceTransformer
from app.config.settings import get_settings
settings = get_settings()

model = SentenceTransformer(settings.EMBEDDING_MODEL)

def generate_embeddings(text_chunks :list[str]):
    return model.encode(text_chunks).tolist()