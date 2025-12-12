
import { Button } from "primereact/button";
import { Link, type To } from "react-router-dom";

interface TownMeeting {
    id: number;
    town: string;
    date: string;
    desc: string;
    link: string;
    townid: number;
}

interface LinkButtonProps {
    rowData: TownMeeting;
}

const LinkButton = (rowData: TownMeeting) => {
    return (
        <Link to={'/meeting/' + rowData.id}>
            <Button style={{color: 'white'}}>View</Button>
        </Link>
    );
}

export default LinkButton;