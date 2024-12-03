import json
import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
import os
from dotenv import load_dotenv

#TODO: Store as environment variables
load_dotenv()

API_KEY = os.getenv('SEARCH_API_KEY')
SEARCH_ENGINE_ID = os.getenv('SEARCH_ENGINE_ID')

def search(query, num_results=10, output_file="search_results.json"):
    try:
        service = build("customsearch", "v1", developerKey=API_KEY) # Builds Google Custom Search API service
        results = []
        for start_index in range(1, num_results + 1, 10):  # Max 10 results per page
            response = (
                service.cse()
                .list(q=query, cx=SEARCH_ENGINE_ID, start=start_index)
                .execute()
            )
            results.extend(response.get("items", []))
        with open(output_file, "w") as file: # Saves results to JSON file
            json.dump(results, file, indent=4)
    except Exception as e:
        print(f"An error occurred: {e}")
