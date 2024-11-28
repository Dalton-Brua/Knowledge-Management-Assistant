from search import search
from gemini_api import GeminiSeummarizer

API_KEY = 'AIzaSyDWjmv5nxuxjcO7xEkE2uG_uwS13SvAsIE'
SEARCH_ENGINE_ID = '0546012e6548e4e3f'
google_api_key = "AIzaSyAZJbOEfC101tST3VcpknqSHJVmubhn0DE"

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
