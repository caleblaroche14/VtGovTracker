import os
from dotenv import load_dotenv
import warnings
warnings.filterwarnings('ignore')

import requests
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import RealDictCursor

# Load environment variables from .env file
load_dotenv()

# Database connection
conn = psycopg2.connect(os.getenv('DATABASE_URL'))


def find_meeting_minutes(url, town):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    newLinks = []

    element = soup.find(string=lambda text: text and 'Meeting Minutes' == text)
    
    if element:
        # find the correct divs
        parent = element.parent.parent
        next_div = parent.find_next_sibling('p')

        # Print the sibling's children's hrefs
        if next_div:
            links = next_div.find_all('a', href=True)
            for link in links:

                # print the links but cut off the url where it says /edit
                href = link['href']
                if '/edit' in href:
                    href = href.split('/edit')[0]
                    href += '/export?format=txt'
  
                newLinks.append(href)
                
    # Select all rows from the Links table
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute('SELECT "Link" FROM "Links"')
        existing_links = [row['Link'] for row in cursor.fetchall()]
    
    # Remove newLinks that already exist in Links table
    newLinks = [link for link in newLinks if link not in existing_links]
    
    print(f"\nFiltered newLinks (removed {len(existing_links)} matches): {newLinks}")
    
    # Insert newLinks into the Links table
    if newLinks:
        with conn.cursor() as cursor:
            for link in newLinks:
                cursor.execute(
                    """
                    INSERT INTO "Links" ("Town", "Link", "Used")
                    VALUES (%s, %s, %s)
                    """,
                    (town, link, False)
                )
            conn.commit()
            print(f"\nInserted {len(newLinks)} new links into Links table")
    