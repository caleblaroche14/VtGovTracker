import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LinkButton from './LinkButton';
import type TownMeeting from '../types/TownMeeting';
import MeetingGridCard from './MeetingGridCard';

const TownMeetingsGrid = ({ townid }: { townid: number }) => {

    const [meetings, setMeetings] = useState<TownMeeting[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [monthsByYear, setMonthsByYear] = useState<Record<string,string[]>>({})

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch(`/api/getTownMeetings?townId=${townid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const processed = data.data.map((meeting: TownMeeting) => ({
                    ...meeting,
                    link: meeting.link.includes('/export?format=txt') 
                        ? meeting.link.replace('/export?format=txt', '/edit')
                        : meeting.link,
                    month: new Date(meeting.date).toLocaleString('default', { month: 'long' }),
                    year: new Date(meeting.date).getFullYear().toString(),
                }));

                setMeetings(processed);

                const uniqueYears = Array.from(new Set<string>(processed.map((m: TownMeeting) => m.year)));
                setYears(uniqueYears);      

                const months: Record<string,string[]> = {};
                processed.forEach((meeting: TownMeeting) => {
                    if (!months[meeting.year]){
                        months[meeting.year] = [];
                    }

                    if (!months[meeting.year].includes(meeting.month)){
                        months[meeting.year].push(meeting.month);
                    }
                });

                setMonthsByYear(months);

            } catch (error) {
                console.error("Error fetching town meetings:", error);
            }
        };
        fetchMeetings();
    }, [townid]);

    
    return (
        <div className="townmeeting-cardholder">
            {years.map((year) => (
                <div className='year-card' key={year}>
                    <div className="year-title">{year}</div>
                    <div className="month-container">
                        {monthsByYear[year]?.map((month) => (
                        <div key={`${year}-${month}`}>
                            <div className="month-title">{month}</div>
                            <div className="month-body">
                                {meetings.filter((meeting) => (meeting.year) === year)
                                .filter((meeting) => (meeting.month) === month)
                                .map((meeting) => (
                                    <MeetingGridCard key={meeting.id} meeting={meeting} />
                                ))}
                            </div>
                        </div>))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TownMeetingsGrid;