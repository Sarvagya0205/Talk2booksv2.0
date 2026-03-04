from pymongo import MongoClient
from app.config.settings import get_settings
settings=get_settings()
client = MongoClient(settings.MONGO_URL)
db = client[settings.MONGO_DB_NAME]

books_collection=db["Talk2books_metadata"]
chat_collection=db["chat_history"]