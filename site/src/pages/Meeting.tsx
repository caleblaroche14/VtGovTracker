import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MeetingItemsGrid from '../components/MeetingItemsGrid';
import MeetingPublicComments from '../components/MeetingPublicComments';
import MeetingUpdatesGrid from '../components/MeetingUpdatesGrid';
import AttendeesGrid from '../components/AttendeesGrid';

interface MeetingInfo{
    meetingid: number,
    title: string,
    date: string,
    desc: string
}

const Meeting = () =>{
    const {meetingid} = useParams<{meetingid: string}>();

    const [meetingInfo, setMeetingInfo] = useState<MeetingInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeetingInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/getMeetingInfo?meetingId=${meetingid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMeetingInfo(data.data);
            } catch (error) {
                console.error("Error fetching meeting info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMeetingInfo();
    }, [meetingid]);

    return(
        <div className='page'>

            <button onClick={() => window.history.back()} style={{width: '80px'}}>Back</button> 

            <div className="headerinfo">
                <h1>{meetingInfo?.date}</h1>
                <h2>{meetingInfo?.desc}</h2>
            </div>
            
            <h3 className="section-header">Discussed Items</h3>
            <MeetingItemsGrid meetingid={Number(meetingid)} />

            <h3 className="section-header">Town Updates</h3>
            <MeetingUpdatesGrid meetingid={Number(meetingid)} />

            <h3 className="section-header">Public Comments</h3>
            <MeetingPublicComments meetingid={Number(meetingid)} />

            <h3 className="section-header">Attendees</h3>
            <AttendeesGrid meetingid={Number(meetingid)} />
        </div>
    );
}

export default Meeting; 