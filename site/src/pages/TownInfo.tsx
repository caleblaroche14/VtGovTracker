import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TownMeetingsGrid from '../components/TownMeetingsGrid';

interface TownInfo{
    id: string;
    Town: string;
    State: string;
}

const TownInfo = () => {
    const {townId} = useParams<{townId: string}>();
    const [townInfo, setTownInfo] = useState<TownInfo>({} as TownInfo);

    useEffect (() => {
        const fetchTownInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/getTownInfo?townId=${townId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setTownInfo(data.data);
            } catch (error) {
                console.error("Error fetching town info:", error);
            }
        };
        fetchTownInfo();
    }, []);
        

    return (
    <div className='page' style={{marginLeft: '15px'}}>
        <h1 ><strong>{townInfo.Town}, {townInfo.State} - Meeting Info</strong></h1>    
        <TownMeetingsGrid townid={Number(townId)} />
    </div>
    );
}
export default TownInfo;