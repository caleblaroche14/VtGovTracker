import os
from dotenv import load_dotenv
import warnings
warnings.filterwarnings('ignore')

import requests
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import RealDictCursor

import datetime

# Load environment variables from .env file
load_dotenv()

# Database connection
conn = psycopg2.connect(os.getenv('DATABASE_URL'))


def find_meeting_minutes(url, town, id):

    newLinks = []

    if town == 'Franklin':
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')

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
     
    if town == 'Highgate':
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        parentLink = ''
        # find the div that says SELECTBOARD NOTICES, AGENDAS, MINUTES [current year] and get what it links to
        current_year = datetime.datetime.now().year
        element = soup.find(string=lambda text: text and f'SELECTBOARD NOTICES, AGENDAS, MINUTES {current_year}' in text)
        if element:
            parent = element.parent
            link = parent['href']
            parentLink += 'https://www.highgatevt.org' + link

        # webscrape the parent link for pdf links that say Selectboard Approved Minutes in them and add what they link to to newLinks
        if parentLink != '':
            response = requests.get(parentLink)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            links = soup.find_all('a', href=True)
            for link in links:
                href = link['href']
                if f'Approved Minutes' in link.text and f'{current_year}' in link.text and href.endswith('.pdf'):
                    if not href.startswith('http'):
                        href = 'https://www.highgatevt.org' + href
                    newLinks.append(href)

        # 2025 TOWN MEETING DAY RESULTS
        # go to https://www.highgatevt.org/elections-faqs and look for the link that says 2025 TOWN MEETING DAY RESULTS
        election_results_link = ''
        response = requests.get('https://www.highgatevt.org/elections-faqs')
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        element = soup.find(string=lambda text: text and '2025 TOWN MEETING DAY RESULTS' in text)
        
        # find the href in the element and add it to newLinks
        if element:
            parent = element.parent
            election_results_link = parent['href']
            if not election_results_link.startswith('http'):
                election_results_link = 'https://www.highgatevt.org' + election_results_link.strip().replace('\n', ' ').replace('\r', '').replace(' ', '')
            
            newLinks.append(election_results_link)
        
    # insert all newLinks into Links table if they don't already exist
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute('SELECT "Link" FROM "Links" where "Town" = %s', (town,))
        existing_links = [row['Link'] for row in cursor.fetchall()]

    # Remove newLinks that already exist in Links table
    newLinks = [link for link in newLinks if link.strip().replace('\n', ' ').replace('\r', '').replace(' ', '') not in existing_links]
    print(f"\nFiltered newLinks (removed {len(existing_links)} matches): {newLinks}")

    # Insert newLinks into the Links table
    if newLinks:
        with conn.cursor() as cursor:
            for link in newLinks:
                cursor.execute(
                    """
                    INSERT INTO "Links" ("townid","Town", "Link", "Used")
                    VALUES (%s, %s, %s, %s)
                    """,
                    (id, town, link.strip().replace('\n', ' ').replace('\r', '').replace(' ', ''), False)
                )
            conn.commit()
            print(f"\nInserted {len(newLinks)} new links into Links table")

    