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
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState({
        firstname: { value: null, matchMode: FilterMatchMode.CONTAINS },
        lastname: { value: null, matchMode: FilterMatchMode.CONTAINS },
        role: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
        

    useEffect(() => {
        const fetchAttendees = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/getAttendees?meetingid=' + meetingid)
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            console.log(data);
            setAttendees(data.data)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
        }

        fetchAttendees()
    }, [])
    return (
        <DataTable value={attendees} 
        showGridlines 
        paginator rows={15} 
        filters={filters}  
        filterDisplay="menu"
        loading={loading}
        tableStyle={{ tableLayout: 'fixed'}}
        >
            <Column field="id" header="ID" hidden></Column>
            <Column field="name" header="Name" style={{ width: '150px' }} sortable ></Column>
            <Column field="role" header="Role" style={{ width: '150px' }} sortable ></Column>
        </DataTable>
    )
}

export default AttendeesGrid;
