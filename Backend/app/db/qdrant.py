from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams,Distance
from app.config.settings import get_settings
settings=get_settings()
client = QdrantClient(
    # host="localhost",
    # port=6333
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY
)

COLLECTION_NAME =settings.QDRANT_COLLECTION_NAME

def create_collection():
    collections = client.get_collections().collections
    names = [c.name for c in collections]

    if COLLECTION_NAME not in names:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=settings.VECTOR_SIZE, 
                distance=Distance.COSINE
            )
        )