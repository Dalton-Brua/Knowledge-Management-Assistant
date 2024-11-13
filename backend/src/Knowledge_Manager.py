from pymongo import MongoClient
from datetime import datetime
from flask import jsonify

class KM:

    def __init__(self, username: str, password: str, role:str):
        
        post = {
            "username": username,
            "password": password,
            "role": role
        }

        self.client = MongoClient('mongodb://localhost:27017')
        self.db = self.client['KMA_DB']
        self.users_collection = self.db['userInformation']
        self.query_collection = self.db['queries']
        self.response_collection = self.db['responses']

        self.users_collection.insert_one(post)
        


    
    def login(self, username: str, password: str) -> bool:
        user = self.users_collection.find_one({"username": username, "password": password})
        return user is not None
        