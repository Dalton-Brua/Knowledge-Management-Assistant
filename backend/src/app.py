from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")

db = client['KMA_DB']

@app.route('/data')
def createUser():
    collection = db.userInformation
    post = {
            "name": "Test Two",
            "pass": "pass2",
            "role": "user"
        }
    result = collection.insert_one(post)
    return 'Inserted document with id: {}'.format(result.inserted_id)

if __name__ == '__main__':
    app.run(debug=True)