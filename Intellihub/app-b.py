# Code from Blythe's branch. 
# Status: I am able to successfully run.
# I get "Serving Flask app 'app' notification and Debug mode: on
# I get WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
# Running on http://
# Restarting with stat, might have been because I changed the file name to app-b from app
# Then I get notifications: 
# Debugger is active!
# Debugger PIN

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
