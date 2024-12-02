from search import search
from gemini_api import GeminiSummarizer
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv('SEARCH_API_KEY')
SEARCH_ENGINE_ID = os.getenv('SEARCH_ENGINE_ID')
google_api_key = os.getenv('GOOGLE_API_KEY')

# Test Query
query = "What programming languages should we utilize in 2024 for a particular new software system?"

# save search results
search_output_file = "search_results.json"
search(query, num_results = 10, output_file = search_output_file)

# sumamrize search results
summary_output_file = "summary_results.json"
summarizer = GeminiSummarizer()
summarizer.summarize_results(input_file=search_output_file, output_file=summary_output_file, query=query)



#print(f"Summarization completed. Results saved to {summarization_outputfile}")
