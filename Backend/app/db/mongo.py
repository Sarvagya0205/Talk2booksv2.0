from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

mongo_url = os.getenv("MONGO_URL","mongodb://localhost:27017")

client = MongoClient(mongo_url)

db = client["talk2books"]