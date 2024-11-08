from flask import Flask, request, jsonify;
from flask_pymongo import PyMongo, ObjectId;
from flask_cors import CORS;

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/Intellihub'
mongo = PyMongo(app)

CORS(app)
db = mongo.db.users

if __name__ == '__main__':
    app.run(debug=True)