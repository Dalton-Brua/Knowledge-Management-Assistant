from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from markupsafe import escape
import parse_json as pj
from Crypto.Hash import SHA256
from search import search


app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")

db = client["KMA_DB"]

@app.route('/createUser/<username>', methods=['GET'])
def createUser(username, password):
    collection = db.users

    #hash = SHA256.new()
    #hash.update(password)
    #hash.digest()
    post = {
            "name": f"{escape(username)}",
            "pass": f"{escape(username)}1",
            "role": "admin"
        }
    result = collection.insert_one(post)
    return 'Inserted document with id: {}'.format(result.inserted_id)

@app.route('/getUserInfo/<username>', methods=['GET'])
def getUserInfo(username):

    collection = db.users
    doc = collection.find_one({ 'name' : f'{username}' })
    if (doc == None):
        return f"No documents found with username \'{username}\'"
    print("User found:\n")
    print(pj.parse_json(doc))
    return pj.parse_json(doc)

@app.route('/getUsers', methods=['GET'])
def getUsers():
    return pj.parse_json(db.users.find({}))

@app.route('/deleteUser', methods=['POST'])
def deleteUser():
    user = request.get_json
    collection = db.users
    collection.delete_one(user)

    return pj.parse_json(db.users.find({}))

@app.route('/createQuery', methods=['POST'])
def createQuery():

    collection = db.queries
    query = request.form['query']


    return pj.parse_json(query)
@app.route('/getQueries', methods=["GET"])
def getQueries():
    return db.queries.find({})

if __name__ == "__main__":
    app.run(debug=True)


