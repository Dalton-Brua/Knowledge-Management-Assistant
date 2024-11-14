from flask import Flask, jsonify, url_for
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")

db = client["KMA_DB"]

@app.route('/data')
def createUser():
    collection = db.users
    post = {
            "name": "John Doe",
            "pass": "pass1",
            "role": "user"
        }
    result = collection.insert_one(post)
    return 'Inserted document with id: {}'.format(result.inserted_id)