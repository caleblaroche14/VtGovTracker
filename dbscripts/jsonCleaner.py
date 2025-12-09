import json
import re

def sanitize_json(json_string):

    # Sanitize JSON string from Gemini API responses.    
    # Remove markdown code block markers if present
    json_string = re.sub(r'^```json\s*', '', json_string, flags=re.MULTILINE)
    json_string = re.sub(r'^```\s*', '', json_string, flags=re.MULTILINE)
    json_string = re.sub(r'\s*```$', '', json_string, flags=re.MULTILINE)
    json_string = json_string.strip()    
    return json.loads(json_string)