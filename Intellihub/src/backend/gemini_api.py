import json
import requests
import google.generativeai as genai


#TODO: store environment variables
google_api_key = "AIzaSyAZJbOEfC101tST3VcpknqSHJVmubhn0DE"

class GeminiSeummarizer:
    def __init__(self, api_key = google_api_key, model = "gemini-1.5-flash"):
      
       genai.configure(api_key=api_key)
       self.model = model
       
    def summarize_results(self, input_file, output_file):
        try: 
            with open(input_file,"r") as f:
                search_results = json.load(f)

            summaries = {}
            for result in search_results:
                link = result.get("link")
                title = result.get("title", "No title provided")
                snippet = result.get("snippet", "No snippet available")

                # Create content to send to the Gemini API
                content_to_summarize = (
                    f"Title: {title}\nSnippet: {snippet}\nLink: {link}\n\n"
                    "Summarize and analyze the above information."
                )

                try:
                    # Use the Gemini API to generate a summary
                    response = genai.GenerativeModel(self.model).generate_content(content_to_summarize)
                    summary = response.text.strip()
                
                except Exception as e:
                    print(f"Error summarize content from {link}: {e}")
                    summary = "error geeting summary"

                # Save the summary results
                summaries[link] = {
                    "title": title,
                    "snippet": snippet,
                    "summary": summary
                }

            # Write all summaries to the output file
            with open(output_file, "w") as f:
                json.dump(summaries, f, indent=4)
            
            print(f"Summarization completed. Results saved to {output_file}")
      
        except Exception as e:
            print(f"An error occurred while summarizing results: {e}")