import json
import os
from dotenv import load_dotenv
from googleapiclient.discovery import build

#TODO: Store as environment variables

load_dotenv()
API_KEY = os.environ['API_KEY']
SEARCH_ENGINE_ID = os.environ['SEARCH_ENGINE_ID']

def search(query, api_key, search_engine_id, num_results=10, output_file="search_results.json"):
    try:
        service = build("customsearch", "v1", developerKey=api_key) # Builds Google Custom Search API service
        results = []
        for start_index in range(1, num_results + 1, 10):  # Max 10 results per page
            response = (
                service.cse()
                .list(q=query, cx=search_engine_id, start=start_index)
                .execute()
            )
            results.extend(response.get("items", []))
        with open(output_file, "w") as file: # Saves results to JSON file
            json.dump(results, file, indent=4)  #TODO: Use links from each result and insert into AI service to summarize and analyze results for a response
    except Exception as e:
        print(f"An error occurred: {e}")

# Test usage
if __name__ == "__main__":
    # Test query
    query = "Best Black Friday Deals" #TODO: Connect with frontend to get query from dashboard search form.
    
    search(query, API_KEY, SEARCH_ENGINE_ID, num_results=20)
