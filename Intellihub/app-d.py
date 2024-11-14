# Code from Dalton's branch
# Status when running:
# I had to use flask --app app-d run to get results
# otherwise it just ran but no notifications or output
# I got notifications:
# * Serving Flask app 'app-d'
# * Debug mode: off
# WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
# * Running on http://
# Press CTRL+C to quit

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
