import  { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchMeetingInfo = async () => {
            try {
                const response = await fetch(`/api/getMeetingInfo?meetingId=${meetingid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMeetingInfo(data.data);
            } catch (error) {
                console.error("Error fetching meeting info:", error);
            } 
        };
        fetchMeetingInfo();
    }, [meetingid]);

    return(
        <div className='page'>

            <div className="topbtns">
                <button onClick={() => window.history.back()} style={{width: '80px'}}>Back</button> 
                <button className="source">Source</button>
            </div>

            <div className="headerinfo">
                <h1>{meetingInfo?.title}</h1>
                <h2>{meetingInfo?.date}</h2>

            </div>

            <div className="meeting-details-section">
                <div className="meeting-info-section">
                    <div className="meeting-group">
                        <MeetingItemsGrid meetingid={Number(meetingid)} />
                        <MeetingUpdatesGrid meetingid={Number(meetingid)} />
                    </div>
                </div>
                <div className="meeting-info-section">
                    <div className="meeting-group">
                        <MeetingPublicComments meetingid={Number(meetingid)} />
                        <AttendeesGrid meetingid={Number(meetingid)} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Meeting; 