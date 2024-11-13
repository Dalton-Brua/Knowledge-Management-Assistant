from flask import Flask, request, jsonify
from pymongo import MongoClient
from Knowledge_Manager import KM

app = Flask(__name__)

knowledge_manager = KM(username ="imanadmin", password = "password123",
                       role = "admin")

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    success = KM.login(username, password)
    return jsonify({"success": success})


if __name__ == '__main__':
    app.run(debug=True)