import type TownMeeting from '../types/TownMeeting';
import { useNavigate } from 'react-router-dom';

interface MeetingGridCardProps {
    meeting: TownMeeting;
}

const MeetingGridCard = ({meeting}: MeetingGridCardProps) => {
    const navigate = useNavigate();

    function handleViewClick() {
        navigate('/meeting/' + meeting.id);
    }

    function handleSourceClick() {
        window.open(meeting.link, '_blank');
    }

    return (
        <div className="meetingcard-container">
            <div className="meetingcard-header">{meeting.title}</div>
            <div className="meetingcard-desc">{meeting.desc}</div>
            <button className="meetingcard-viewbtn" onClick={handleViewClick}>View</button>
            <button className="meetingcard-source" onClick={handleSourceClick}>Source</button>
        </div>
    );
};

export default MeetingGridCard;