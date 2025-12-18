import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';

interface Attendee {
    id: number;
    name: string;
    role: string;
}

interface AttendeesGridProps {
    meetingid: number;
}   

interface Attendees{
    attendees: Attendee[];
}

const AttendeesGrid = ({ meetingid }: AttendeesGridProps) => {

    const [attendees, setAttendees] = useState<Attendees[]>([])
    const [loading, setLoading] = useState(true)
    const [filters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        role: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
        

    useEffect(() => {
        const fetchAttendees = async () => {
        try {
            const response = await fetch('/api/getAttendees?meetingId=' + meetingid)
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            console.log(data);
            setAttendees(data.data)
        } finally {
            setLoading(false)
        }
        }

        fetchAttendees()
    }, [])
    return (
        <div className="meeting-grid">
            <div className="section-subheader">Attendees</div>
            <DataTable value={attendees} className='meeting-grid'
            showGridlines 
            paginator rows={5} 
            filters={filters}  
            filterDisplay="menu"
            loading={loading}
            tableStyle={{ tableLayout: 'fixed'}}
            >
                <Column field="id" header="ID" hidden></Column>
                <Column field="name" header="Name" style={{ width: '150px' }} sortable ></Column>
                <Column field="role" header="Role" style={{ width: '150px' }} sortable ></Column>
            </DataTable>
        </div>
    )
}

export default AttendeesGrid;
