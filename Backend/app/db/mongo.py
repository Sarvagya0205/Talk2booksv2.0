from pymongo import MongoClient
import os
from app.config.settings import get_settings
settings=get_settings()

mongo_url = os.getenv("MONGO_URL","mongodb://localhost:27017")

client = MongoClient(settings.MONGO_URL)

db = client[settings.MONGO_DB_NAME]