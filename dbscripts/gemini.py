import time
from google.genai.errors import ServerError

import warnings
warnings.filterwarnings('ignore')

from jsonDataStructure import returnJsonStruct

from google import genai
from dotenv import load_dotenv
load_dotenv()

# grab the text from the file json.py and put it in a string


# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

def generate_response(prompt):
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    return response.text

def summarize_town_meeting_info(town, meeting_info, link=''):
    promptSetup = returnJsonStruct()
    prompt = f"Summarize the following {town} town meeting information with, reiterating only information that is in the document, into the following JSON structure: {promptSetup}\n\nMeeting Information:\n{meeting_info}. Link for 'info' section:{link} \nDo not put any information other than the JSON itself. (no headers or text outside of it). Ignore arcitles and items that are about voting to open or close the meeting. Do not make up any information that is not in the meeting info provided."
    
    while True:
        try:
            print("Generating response from Gemini API...")
            summary = generate_response(prompt)
            return summary
        except ServerError as e:
            if "UNAVAILABLE" in str(e):
                print(f"Model unavailable (503), retrying in 10 seconds...")
                time.sleep(10)
            else:
                raise