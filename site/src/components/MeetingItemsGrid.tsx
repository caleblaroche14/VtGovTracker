import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface MeetingItem {
  id: number;
  meeting_id: number;
  desc: string;
  passed: boolean | null;
  votesY: number | null;
  votesN: number | null;
  item: string;
}

interface MeetingItemsGridProps {
  items: MeetingItem[];
}

const MeetingItemsGrid = ({ meetingid }: { meetingid: number }) => {

    const [items, setItems] = React.useState<MeetingItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/getMeetingItems?meetingId=${meetingid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data.data);
            } catch (error) {
                console.error("Error fetching meeting items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [meetingid]);

  return (
    <div className="meeting-items-grid">
        <DataTable value={items} loading={loading} responsiveLayout="scroll">
            <Column field="item" header="Item" sortable></Column>
            <Column field="desc" header="Description" style={{minWidth: '180px'}} sortable></Column>
            <Column field="passed" header="Passed" body={(rowData) => rowData.passed === null ? 'N/A' : rowData.passed ? 'Yes' : 'No'} sortable></Column>
            <Column field="votesY" header="Votes Yes" body={(rowData) => rowData.votesY === null ? 'N/A' : rowData.votesY} sortable></Column>
            <Column field="votesN" header="Votes No" body={(rowData) => rowData.votesN === null ? 'N/A' : rowData.votesN} sortable></Column>
        </DataTable>
    </div>
  );
};

export default MeetingItemsGrid;
