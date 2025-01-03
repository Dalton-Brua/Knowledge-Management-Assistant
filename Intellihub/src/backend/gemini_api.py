import json
import requests
import google.generativeai as genai
from dotenv import load_dotenv
import os
import find_similar as fs

# TODO: store environment variables
load_dotenv()
google_api_key = os.getenv('GOOGLE_API_KEY')

class GeminiSummarizer:
    def __init__(self, model="gemini-1.5-flash"):
        genai.configure(api_key=google_api_key)
        self.model = model

    def summarize_results(self, input_file, output_file, query):
        try:
            with open(input_file, "r") as f:
                search_results = json.load(f)

            combined_content = f"Query: {query}\n\nRelevant information from search results:\n"

            # Check for similar query and response
            similar_query = fs.find_similar(query)
            if (similar_query != None):
                similar_query_name = similar_query.get("query")
                similar_query_response = similar_query.get("response")
            else:
                similar_query_name = "No similar query exists. Do not include in summary."
                similar_query_response = "No similar response exists. Do not include in summary."

            # Combine snippets and titles for all results
            for result in search_results:
                title = result.get("title", "No title provided")
                snippet = result.get("snippet", "No snippet available")
                link = result.get("link")

                combined_content += f"Title: {title}\nSnippet: {snippet}\nLink: {link}\n\n"

            # Request a single summary from the model
            content_to_summarize = (
                f"{combined_content}\n\nBased on the provided information while taking while taking into account this similar query and response, if it exists:"
                f"\n\n Similar query name: {similar_query_name} and its response: {similar_query_response}"
                f"Summarize the content relevant to the query with 400 words or less in a professional manner, avoiding direct mentions to the documents :{query}"
            )

            try:
                response = genai.GenerativeModel(self.model).generate_content(content_to_summarize)
                # Clean up response
                combined_summary = response.text.strip()
                combined_summary = " ".join(combined_summary.split())

            except Exception as e:
                print(f"Error generating combined summary: {e}")
                combined_summary = "Error generating summary."

            # Save the combined summary to the output file
            output_data = {
                "query": query,
                "response": combined_summary,
            }

            with open(output_file, "w") as f:
                json.dump(output_data, f, indent=4)

            print(f"Summarization completed. Results saved to {output_file}")

        except Exception as e:
            print(f"An error occurred while summarizing results: {e}")
