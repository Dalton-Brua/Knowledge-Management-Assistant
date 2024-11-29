from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from markupsafe import escape
from datetime import datetime
import json
import parse_json as pj
import search as google
from gemini_api import GeminiSummarizer

#from Crypto.Hash import SHA256

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")

db = client["KMA_DB"]

@app.route('/home')
def home():
    return "<h1>Hello world!</h1>"

##############################################


@app.route('/createUser/<username>', methods=['GET'])
def createUser(username):
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

##############################################

@app.route('/getUserInfo/<username>', methods=['GET'])
def getUserInfo(username):

    collection = db.users
    doc = collection.find_one({ 'name' : f'{username}' })
    if (doc == None):
        return f"No documents found with username \'{username}\'"
    print("User found:\n")
    print(pj.parse_json(doc))
    return pj.parse_json(doc)

##############################################

@app.route('/getUsers', methods=['GET'])
def getUsers():
    return db.users

##############################################

@app.route('/query', methods = ['POST']) # TODO: Implement a way to modify query after submitting
def handleQuery(): # TODO: Implement a way for Knowledge Manager to search through previous queries if any to improve response (part of scope/requirements)
    collection = db.queries # Create 'queries' collection in database
    data = request.get_json()

    if not data or 'query' not in data:
        return jsonify({"error": "Invalid request. Query is missing."}), 400

    query = data['query']
    user = data.get('user', 'unknown')  # Default to 'unknown' if no user is provided - Current implementation is always "testuser"
    timestamp = datetime.now().isoformat() # Save when query is submitted

    try:
        # Perform Google Search
        search_output_file = "search_results.json"
        google.search(query, num_results=10, output_file=search_output_file)

        # Summarize search results
        summary_output_file = "summary_results.json"
        summarizer = GeminiSummarizer()
        summarizer.summarize_results(input_file=search_output_file, output_file=summary_output_file, query=query)

        # Get summary result
        with open(summary_output_file, "r") as f:
            summary_data = json.load(f)

        # Save the query, user, timestamp, and response in MongoDB
        log_entry = {
            "query": query,
            "user": user,
            "timestamp": timestamp,
            "response": summary_data.get("response", "No response available."),
        }
        collection.insert_one(log_entry)

        # Return the summarized response to the frontend
        return jsonify({"response": summary_data.get("response", "No response available.")}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing the query."}), 500

##############################################

if __name__ == "__main__":
    app.run(debug=True)


