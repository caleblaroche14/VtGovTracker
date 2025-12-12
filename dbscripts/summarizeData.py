import os
from dotenv import load_dotenv
import warnings
warnings.filterwarnings('ignore')

import requests
import psycopg2
from psycopg2.extras import RealDictCursor

from gemini import summarize_town_meeting_info
from jsonCleaner import sanitize_json

import json

# Load environment variables from .env file
load_dotenv()

def getlinks(town):
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    links = []
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(f'SELECT * FROM "Links" WHERE "Town" = \'{town}\' AND "Used" = FALSE')
        rows = cursor.fetchall()
        links = [row['Link'] for row in rows]
        ids = [row['id'] for row in rows]

    conn.close()
    return links

def getTownInfo(town):
    links = getlinks(town)
    text = ''
    jsonData = []

    # query the Towns table and check if the DataType row is Google Doc
    data_type = ''
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(f'SELECT * FROM "Towns" WHERE "Town" = \'{town}\'')
        row = cursor.fetchone()
        townid = row['id']
        data_type = row['DataType']
        conn.close()

    if len(links) > 0:
        for link in links:

            # go to the link and store the text returned in a variable
            if data_type == 'Google Doc':
                response = requests.get(link)
                response.raise_for_status()
                text = response.text

            if text != '':
                jsonData.append(sanitize_json(summarize_town_meeting_info(town, text, link)))
    return [townid, jsonData]
