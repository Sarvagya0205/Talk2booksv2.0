from app.utils.embedding import generate_embeddings
from app.db.qdrant import client, COLLECTION_NAME


def search_books(query: str, top_k: int = 5):
    query_vector = generate_embeddings([query])[0]

    response = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=top_k
    )

    matches = [
        {
            "score": point.score,
            "text": point.payload.get("text"),
            "title": point.payload.get("title"),
            "author": point.payload.get("author")
        }
        for point in response.points
    ]

    return matches