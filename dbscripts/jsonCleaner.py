import json
import re

def sanitize_json(json_string):

    # Sanitize JSON string from Gemini API responses.    
    # Remove markdown code block markers if present
    json_string = re.sub(r'^```json\s*', '', json_string, flags=re.MULTILINE)
    json_string = re.sub(r'^```\s*', '', json_string, flags=re.MULTILINE)
    json_string = re.sub(r'\s*```$', '', json_string, flags=re.MULTILINE)
    json_string = json_string.strip()    

    data = json.loads(json_string)
    
    # Ensure all required fields exist in items
    if 'items' in data and isinstance(data['items'], list):
        for item in data['items']:
            # Set default values if missing
            if 'votesY' not in item:
                item['votesY'] = 0
            if 'votesN' not in item:
                item['votesN'] = 0
            if 'passed' not in item:
                item['passed'] = None
    
    # Ensure all required fields exist in publicComments
    if 'publicComments' in data and isinstance(data['publicComments'], list):
        for comment in data['publicComments']:
            if 'commenter' not in comment:
                comment['commenter'] = 'Unknown'
            if 'comment' not in comment:
                comment['comment'] = ''
    
    # Ensure all required fields exist in updates
    if 'updates' in data and isinstance(data['updates'], list):
        for update in data['updates']:
            if 'update' not in update:
                update['update'] = ''
            if 'status' not in update:
                update['status'] = ''
            if 'details' not in update:
                update['details'] = ''
    
    # Ensure all required fields exist in attendees
    if 'attendees' in data and isinstance(data['attendees'], list):
        for attendee in data['attendees']:
            if 'firstname' not in attendee:
                attendee['firstname'] = ''
            if 'lastname' not in attendee:
                attendee['lastname'] = ''
            if 'role' not in attendee:
                attendee['role'] = ''
    
    return data