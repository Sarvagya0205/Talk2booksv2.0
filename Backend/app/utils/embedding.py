from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embeddings(text_chunks :list[str]):
    return model.encode(text_chunks).tolist()