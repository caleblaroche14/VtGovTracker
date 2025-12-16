from summarizeData import getTownInfo
from scapeLinks_Franklin import find_meeting_minutes
import json
import requests
import psycopg2
from psycopg2.extras import RealDictCursor
import pdfplumber
import ocrmypdf
import os
from dotenv import load_dotenv
import warnings
warnings.filterwarnings('ignore')

class Town:
    def __init__(self, townname, weblink=''):
        self.townname = townname
        self.weblink = weblink
        self.id = 0
        self.data_type = ''

    def get_new_data(self, istestcase=False):
        if istestcase:
            self.createTestCase()
        else: 
            towndata = getTownInfo(self)

        # for each meeting in data, append to meetings
        #for meeting in self.data:
        #    self.meetings.append(meeting)
        #    self.upload_meeting(self, meeting)

    def update_data_sources(self):
        find_meeting_minutes(self.weblink, self.townname)

    def upload_meeting(self, meeting):
        with psycopg2.connect(os.getenv('DATABASE_URL')) as conn:
            with conn.cursor() as cursor:

                # header info
                cursor.execute(
                    """INSERT INTO "Meetings" ("town","townid", "date", "desc","link") VALUES (%s, %s, %s, %s, %s)
                    RETURNING "id"
                    """,
                    (self.townname, self.id, meeting['info']['date'], meeting['info']['summary'], meeting['info']['link'])
                )
                meeting_row = cursor.fetchone()
                if meeting_row is None:
                    raise RuntimeError("Insert did not return an id")
                meeting_id = meeting_row[0] 
                print(meeting_id)

                # set the link as used 
                cursor.execute(
                    """UPDATE "Links" SET "Used" = TRUE WHERE "Link" = %s
                    """,
                    (meeting['info']['link'],)
                )

                # attendees
                for attendee in meeting['attendees']:
                    cursor.execute(
                        """INSERT INTO "Attendees" ("meeting_id", "firstname", "lastname", "role") VALUES (%s, %s, %s, %s)
                        """,
                        (meeting_id, attendee['firstname'], attendee['lastname'], attendee['role'])
                    )

                # items
                for item in meeting['items']:
                    cursor.execute(
                        """INSERT INTO "Items" ("meeting_id", "item", "desc", "votesY", "votesN", "passed") VALUES (%s, %s, %s, %s, %s, %s)
                        """,
                        (meeting_id, item['item'], item['description'], item['votesY'], item['votesN'], item['passed'])
                    )

                # public comments
                for comment in meeting['publicComments']:
                    cursor.execute(
                        """INSERT INTO "PublicComments" ("meeting_id", "commenter", "comment") VALUES (%s, %s, %s)
                        """,
                        (meeting_id, comment['commenter'], comment['comment'])
                    )
                
                # updates
                for update in meeting['updates']:
                    cursor.execute(
                        """INSERT INTO "Updates" ("meeting_id", "update", "status", "details") VALUES (%s, %s, %s, %s)
                        """,
                        (meeting_id, update['update'], update['status'], update['details'])
                    )
                    


                    



    def createTestCase(self):

        if self.townname == 'Franklin':
            with open('testjson_franklin.json') as fp:
                self.data.append(json.load(fp))
            with open('testjson2_franklin.json') as fp:
                self.data.append(json.load(fp))

        if self.townname == 'Highgate':
            #ocrmypdf.ocr("files/highgate/highgatetest.pdf", "files/highgate/highgatetestOUT.pdf", deskew=True)
            with pdfplumber.open("files/highgate/highgatetestOUT.pdf") as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    print(text)