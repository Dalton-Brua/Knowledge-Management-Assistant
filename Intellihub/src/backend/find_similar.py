from sentence_transformers import SentenceTransformer, util
from pymongo import MongoClient

# Pre-trained embedding model for measuring similarities between queries
model = SentenceTransformer('all-MiniLM-L6-v2')

client = MongoClient('mongodb://localhost:27017/')
db = client['KMA_DB']
collection = db.queries

def find_similar(new_query):
    new_query_embedding = model.encode(new_query, convert_to_tensor=True)

    previous_queries = list(collection.find({}, {"_id": 0, "query": 1, "response": 1}))

    # Calculate similarity
    best_match = None
    best_score = 0
    for entry in previous_queries:
        prev_query = entry['query']
        prev_query_embedding = model.encode(prev_query, convert_to_tensor=True)
        score = util.cos_sim(new_query_embedding, prev_query_embedding).item()

        if score > best_score:
            best_score = score
            best_match = entry
            
    similarity_threshold = 0.5  # Adjust if needed
    if best_score > similarity_threshold:
        return best_match

    return None
