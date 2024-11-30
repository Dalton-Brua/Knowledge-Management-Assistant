from search import search
from gemini_api import GeminiSeummarizer
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv('SEARCH_API_KEY')
SEARCH_ENGINE_ID = os.getenv('SEARCH_ENGINE_ID')
google_api_key = os.getenv('GOOGLE_API_KEY')

# Test Query
query = "Best Black Friday Deals"

# save search results
search_output_file = "search_results.json"
search(query, API_KEY, SEARCH_ENGINE_ID, num_results = 10, output_file = search_output_file)

# sumamrize search results
summarization_outputfile = "gemini_results.json"
summarizer = GeminiSeummarizer(api_key=google_api_key)
summarizer.summarize_results(search_output_file,summarization_outputfile)



print(f"Summarization completed. Results saved to {summarization_outputfile}")
