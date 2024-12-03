from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from markupsafe import escape
from datetime import datetime
import json
import parse_json as pj
import search as google
from gemini_api import GeminiSummarizer
import requests

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")

db = client["KMA_DB"]


########### Backend helper functions


## Sort queries based on actual time by parsing
def sortQueries():
    queries = list(db.queries.find({}))
    for query in queries:
        if 'timestamp' in query and isinstance(query['timestamp'], str):
            query['timestamp_parsed'] = datetime.strptime(query['timestamp'], '%m/%d/%Y, %I:%M:%S %p')
    sorted_queries = sorted(queries, key=lambda x: x['timestamp_parsed'], reverse=True)
    for query in sorted_queries:
        del query['timestamp_parsed']  # Clean up temporary parsed field

    return pj.parse_json(sorted_queries)

## Sort queries based on actual time by parsing, with a user lookup
def sortQueriesByUser(user):
    queries = list(db.queries.find({ 'user': user }))
    for query in queries:
        if 'timestamp' in query and isinstance(query['timestamp'], str):
            query['timestamp_parsed'] = datetime.strptime(query['timestamp'], '%m/%d/%Y, %I:%M:%S %p')
    sorted_queries = sorted(queries, key=lambda x: x['timestamp_parsed'], reverse=True)
    for query in sorted_queries:
        del query['timestamp_parsed']  # Clean up temporary parsed field

    return pj.parse_json(sorted_queries)

## Reverse the top 3 queries so they appear most recent from bottom up in dashboard
def reverseQueries(user):
    queries = sortQueriesByUser(user)
    reversed_queries = queries[::-1]
    return pj.parse_json(reversed_queries)

##############

@app.route('/createUser', methods=['POST'])
def createUser():
    collection = db.users
    user = request.get_json()

    result = collection.insert_one(user)
    return pj.parse_json(db.users.find({})), 200

## Gets a specific user profile
@app.route('/getUserInfo', methods=['POST'])
def getUserInfo():
    data = request.get_json()
    username = data['name']
    collection = db.users
    doc = collection.find_one({ 'name': f'{username}' })
    if (doc == None):
        return f"No documents found with username \'{username}\'", 200
    return pj.parse_json(doc)

## Gets all users
@app.route('/getUsers', methods=['GET'])
def getUsers():
    return pj.parse_json(db.users.find({}))

## Deletes a user
@app.route('/deleteUser', methods=['POST'])
def deleteUser():
    data = request.get_json()
    user = data['username']
    collection = db.users
    collection.delete_one({'name': user})

    return pj.parse_json(db.users.find({})), 200

## Changes user attributes
@app.route('/editUser', methods=['POST'])
def editUser():
    data = request.get_json()
    oldUser = data['oldUser']
    newUser = data['newUser']
    collection = db.users
    collection.replace_one({ "name": oldUser }, newUser)

    return pj.parse_json(db.users.find({}))

## Retrieves all queries and sorts by most recent
@app.route('/getAllQueries', methods=['GET'])
def getQueries():
    # Sort queries based on actual time by parsing
    return sortQueries(), 200

## Retrieves 3 most recent queries
@app.route('/getLatestQueries', methods=['POST'])
def getLatestQueries():
    data = request.get_json()
    user = data['user']
    return reverseQueries(user), 200
    
@app.route('/getDeletedQueries', methods=['GET'])
def getDeletedQueries():
    return pj.parse_json(db.deletedQueries.find({}))

## Takes an old query and changes it
@app.route('/editQuery', methods=['POST'])
def editQuery():
    data = request.get_json()
    oldQuery = data['oldQuery']
    newQuery = data['newQuery']
    user = data['user']
    timestamp = data['timestamp']

    savedQuery = db.queries.find({'query': oldQuery})[0]

    db.queries.delete_one({'query': oldQuery})
    # Perform Google Search
    search_output_file = "search_results.json"
    google.search(newQuery, num_results=10, output_file=search_output_file)

    # Summarize search results
    summary_output_file = "summary_results.json"
    summarizer = GeminiSummarizer()
    summarizer.summarize_results(input_file=search_output_file, output_file=summary_output_file, query=newQuery)

    # Get summary result
    with open(summary_output_file, "r") as f:
        summary_data = json.load(f)

    # Save the query, timestamp, and response in MongoDB
    log_entry = {
        "query": newQuery,
        "user": savedQuery['user'],
        "timestamp": savedQuery['timestamp'],
        "response": summary_data.get("response", "No response available."),
        "lastModified": timestamp,
        "modifiedBy": user,
    }
    db.queries.insert_one(log_entry)

    
    return sortQueries(), 200
    

## Deletes a query from queries
@app.route('/deleteQuery', methods=['POST'])
def deleteQuery():
    data = request.get_json()
    query = data['query']
    user = data['deletedBy']
    fullQuery = db.queries.find({ 'query': query })[0]
    db.deletedQueries.insert_one({
        'original': fullQuery,
        'deletedBy': user,
        })
    db.queries.delete_one({ 'query':  query})
    return pj.parse_json(db.queries.find({}).sort({"timestamp": -1})), 200

## Deletes a query from deletedQueries
@app.route('/finalDelete', methods=['POST'])
def finalDelete():
    data = request.get_json()
    query = data['query']
    db.deletedQueries.delete_one({ "original.query": query })
    return pj.parse_json(db.deletedQueries.find({})), 200

## Restores a deleted query to history table
@app.route('/restoreQuery', methods=['POST'])

## Submits a query to be generated
@app.route('/query', methods = ['POST']) # TODO: Implement a way to modify query after submitting
def handleQuery(): # TODO: Implement a way for Knowledge Manager to search through previous queries if any to improve response (part of scope/requirements)
    collection = db.queries # Create 'queries' collection in database
    data = request.get_json()

    if not data or 'query' not in data:
        return jsonify({"error": "Invalid request. Query is missing."}), 400

    query = data['query']
    user = data.get('user', 'unknown') # Default to 'unknown' if no user is provided
    timestamp = data['timestamp'] # Save when query is submitted

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

        # Save the query, timestamp, and response in MongoDB
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

## Always runs the debug server
if __name__ == "__main__":
    app.run(debug=True)



