from dotenv import load_dotenv
import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()

mongodb_user, mongodb_password = os.getenv('MONGODB_USER'), os.getenv('MONGODB_PASSWORD')
uri = f"mongodb+srv://{mongodb_user}:{mongodb_password}@cluster0.lthcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['api_database']
collection = db['apis']


def deduct_credits_by_one(api_key):
    api = collection.find_one({"api_key": api_key})
    if api:
        credits_left = api.get("credits_left", 0)
        if credits_left > 0:
            collection.update_one({"api_key": api_key}, {"$set": {"credits_left": credits_left - 1}})
        else:
            raise ValueError("No credits left")
    else:
        raise ValueError("API key not found")