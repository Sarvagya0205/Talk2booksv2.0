from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams,Distance

client = QdrantClient(
    host="localhost",
    port=6333
)

COLLECTION_NAME ="book_embeddings"

def create_collection():
    collections = client.get_collections().collections
    names = [c.name for c in collections]

    if COLLECTION_NAME not in names:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=384 , 
                distance=Distance.COSINE
            )
        )