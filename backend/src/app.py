from flask import Flask, request, jsonify;
from flask_pymongo import PyMongo, ObjectId;
from flask_cors import CORS;

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/Intellihub'
mongo = PyMongo(app)

CORS(app)
db = mongo.db.users
#@app.route("/")
#def index():
#    return '<h1>Hello World</h1'

@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert({
        'name': request.json['name'],
        'email': request.json['email'],
        'contact': request.json['contact'],
        'address': request.json['address']
    })
    return jsonify({'id': str(ObjectId(id)), 'msg': "User Added Successfully"})

if __name__ == '__main__':
    app.run(debug=True)