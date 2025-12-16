def returnJsonStruct():
    return """{
        "info":
        {
            "meeting": " Franklin Selectboard Meeting",
            "date": "2023-09-15",
            "location": "Town Hall/Zoom hybrid",
            "summary": "Discussion on community development projects and budget allocations.",
            "link": "https://docs.google.com/document/d/1J7FcAgz6FfutyUD4viEYVPpwGjM_5azf/export?format=txt",
            "title": "Franklin Selectboard Meeting"
        },
        "attendees":
        [
            {
                "firstname": "Alice",
                "lastname": "Johnson",
                "role": "Chairperson"
            }
        ],
        "items":
        [
            {
                "item": "Community Development Projects",
                "description": "Review and discuss ongoing and upcoming community development projects.",
                "votesY": 20,
                "votesN": 5,
                "passed": true
            },
            {
                "item": "Budget Allocations for FY2024",
                "description": "Discuss and approve budget allocations for the fiscal year 2024.",
                "votesY": 18,
                "votesN": 7,
                "passed": true
            },
            {
                "item": "Public Safety Enhancements",
                "description": "Evaluate proposals for enhancing public safety measures in the community.",
                "votesY": 15,
                "votesN": 10,
                "passed": false
            }
        ],
        "publicComments":
        [
            {
                "commenter": "John Smith",
                "comment": "I appreciate the focus on community development and hope to see more green spaces."
            },
            {
                "commenter": "Emily Davis",
                "comment": "Public safety is crucial; I urge the board to reconsider the enhancements proposal."
            }
        ],
        "updates":
        [
            {
                "update": "Lake Carmi Alum updated",
                "status": "New",
                "details": "The alum treatment for Lake Carmi has been successfully completed, improving water quality."
            },
            {
                "update": "Road Maintenance Schedule",
                "status": "Ongoing",
                "details": "The road maintenance schedule for the upcoming months has been released, focusing on major routes."
            },
            {
                "update": "Community Events Calendar",
                "status": "Old",
                "details": "A new community events calendar is being developed to enhance public engagement."
            }
        ]
    }"""