import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import LinkButton from './LinkButton';

interface TownMeeting{
    id: number;
    town: string;
    date: string;
    title: string;
    desc: string;
    link: string;
    townid: number;
}

const TownMeetingsGrid = ({ townid }: { townid: number }) => {

    const DESC_WORDS_SCALING = 70;

    const [meetings, setMeetings] = useState<TownMeeting[]>([])
    const [loading, setLoading] = useState(true)
    const [filters] = useState({
        desc: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
        
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch(`/api/getTownMeetings?townId=${townid}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                
                // remove export?format=txt from all links with for loop 
                for (let l in data.data){
                    data.data[l].desc = data.data[l].desc.split(' ').slice(0, Math.floor(window.innerWidth / DESC_WORDS_SCALING)).join(' ') + '..'
                    data.data[l].link = data.data[l].link.replace('export?format=txt', 'edit');
                }

                //console.log(data.data);
                setMeetings(data.data)
            } finally {
                setLoading(false)
            }
        }

        fetchMeetings()
    }, [])
    return (
        <DataTable value={meetings} 
        showGridlines 
        paginator rows={30} 
        filters={filters}  
        filterDisplay="row"
        loading={loading}
        tableStyle={{ tableLayout: 'fixed'}}
        responsiveLayout="scroll"
        stripedRows
        >
            <Column field="id" hidden></Column>
            <Column body={LinkButton} frozen={true} style={{width: '90px', height: '100%'}}></Column>
            <Column field="title" header="Title" filter={true} sortable style={{width: '50%', minHeight: '150px'}}></Column>
            <Column field="desc" header="Description" filter={true} sortable style={{width: '25%', height: '100%'}}></Column>
            <Column field="date" header="Date" sortable style={{width: '25%', height: '100%'}}></Column>
            <Column field="link" header="Source" style={{width: '25%', height: '100%'}} body={(rowData) => <a href={rowData.link} target="_blank" rel="noopener noreferrer">Source</a> }></Column>
        </DataTable>
    );
}

export default TownMeetingsGrid;