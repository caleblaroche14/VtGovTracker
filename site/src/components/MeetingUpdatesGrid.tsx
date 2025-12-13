import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface TownUpdate {
    id: number;
    town_id: number;
    update: string;
    date: string;
    status: string;
    details: string;
}

const MeetingUpdatesGrid = ({ meetingid }: { meetingid: number }) => {

    const [updates, setUpdates] = useState<TownUpdate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const response = await fetch(`/api/getUpdates?meetingId=${meetingid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data.data);
                setUpdates(data.data);
            } catch (error) {
                console.error("Error fetching town updates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUpdates();
    }, [meetingid]);
    return (
        <div className="meeting-updates-grid">
            <DataTable value={updates} loading={loading} responsiveLayout="scroll">
                <Column field="update" header="Update" sortable></Column>
                <Column field="details" header="Details" sortable></Column>
                <Column field="status" header="Status" sortable></Column>
            </DataTable>
        </div>
    );
};

export default MeetingUpdatesGrid;