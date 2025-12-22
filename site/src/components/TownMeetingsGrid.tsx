import { useState, useEffect } from 'react';
import type TownMeeting from '../types/TownMeeting';
import MeetingGridCard from './MeetingGridCard';

const TownMeetingsGrid = ({ townid }: { townid: number }) => {

    const [meetings, setMeetings] = useState<TownMeeting[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [monthsByYear, setMonthsByYear] = useState<Record<string,string[]>>({})
    const [searchText, setSearchText] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

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

    const isWithinDateRange = (meetingDate: string): boolean => {
        if (!startDate && !endDate) return true;
        
        const date = new Date(meetingDate);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        
        return date >= start && date <= end;
    };

    return (
        <div className="townmeeting-cardholder">
            <div className="search-filters">
                <input 
                    type="text" 
                    placeholder='Search...' 
                    onChange={(e)=>setSearchText(e.target.value)} 
                    className="searchbar" 
                />
                <div className="date-filters">
                    <div className="datefilterheader">From</div>
                    <input 
                        type="date" 
                        onChange={(e)=>setStartDate(e.target.value)} 
                        className="date-filter"
                        placeholder="Start Date"
                    />
                    <div className="datefilterheader">To</div>
                    <input 
                        type="date" 
                        onChange={(e)=>setEndDate(e.target.value)} 
                        className="date-filter"
                        placeholder="End Date"
                    />
                </div>
            </div>
            {years.map((year) => {
            const yearHasMeetings = monthsByYear[year]?.some((month) =>
                meetings.filter((meeting) => (meeting.year) === year)
                .filter((meeting) => (meeting.month) === month)
                .filter((meeting) => 
                    searchText.trim() === '' || 
                    meeting.title?.toLowerCase().includes(searchText.trim().toLowerCase()) 
                    ||
                    meeting.desc?.toLowerCase().includes(searchText.trim().toLowerCase())
                )
                .filter((meeting) => isWithinDateRange(meeting.date))
                .length > 0
            );

            return yearHasMeetings ? (
                <div className='year-card' key={year}>
                <div className="year-title">{year}</div>
                <div className="month-container">
                    {monthsByYear[year]?.map((month) => {
                    const filteredMeetings = meetings.filter((meeting) => (meeting.year) === year)
                    .filter((meeting) => (meeting.month) === month)
                    .filter((meeting) => 
                        searchText.trim() === '' || 
                        (meeting.title?.toLowerCase().includes(searchText.trim().toLowerCase()) 
                        ||
                        meeting.desc?.toLowerCase().includes(searchText.trim().toLowerCase())
                        ))
                    .filter((meeting) => isWithinDateRange(meeting.date));

                    return filteredMeetings.length > 0 ? (
                        <div key={`${year}-${month}`}>
                        <div className="month-title">{month}</div>
                        <div className="month-body">
                            {filteredMeetings.map((meeting) => (
                            <MeetingGridCard key={meeting.id} meeting={meeting} />
                            ))}
                        </div>
                        </div>
                    ) : null;
                    })}
                </div>
                </div>
            ) : null;
            })}
        </div>
    );
}

export default TownMeetingsGrid;