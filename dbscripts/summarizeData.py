import os
from dotenv import load_dotenv
import warnings
warnings.filterwarnings('ignore')

import ocrmypdf
import pdfplumber
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
    links = getlinks(town.townname)
    text = ''

    # query the Towns table and check if the DataType row is Google Doc
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(f'SELECT * FROM "Towns" WHERE "Town" = \'{town.townname}\'')
        row = cursor.fetchone()
        town.id = row['id']

        print(f'Town Data Type: {row["DataType"]}')
        town.data_type = row['DataType']
        conn.close()

    if len(links) > 0:
        for link in links:

            # go to the link and store the text returned in a variable
            if town.data_type == 'Google Doc':
                response = requests.get(link)
                response.raise_for_status()
                text = response.text

            if town.data_type == 'PDF':
                # download the pdf
                print(link)

                # link goes to a pdf file online. download it, turn it into an ocr with ocrmypdf, then extract the text with pdfplumber, then delete the files
                pdf_response = requests.get(link)
                pdf_response.raise_for_status()
                with open('temp.pdf', 'wb') as f:
                    f.write(pdf_response.content)
                ocrmypdf.ocr('temp.pdf', 'temp_ocr.pdf', force_ocr=True, deskew=True)
                with pdfplumber.open('temp_ocr.pdf') as pdf:
                    for page in pdf.pages:
                        text += page.extract_text() + '\n'
                os.remove('temp.pdf')
                os.remove('temp_ocr.pdf')

            if text != '':
                tempJsonData = (sanitize_json(summarize_town_meeting_info(town, text, link)))

                print('Uploading meeting data...')
                print(tempJsonData)

                 # upload the meeting
                town.upload_meeting(tempJsonData)
