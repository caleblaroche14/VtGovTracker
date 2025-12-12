
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

interface TownMeeting {
    id: number;
    town: string;
    date: string;
    desc: string;
    link: string;
    townid: number;
}

const LinkButton = (rowData: TownMeeting) => {
    return (
        <Link to={'/meeting/' + rowData.id}>
            <Button style={{color: 'white'}}>View</Button>
        </Link>
    );
}

export default LinkButton;