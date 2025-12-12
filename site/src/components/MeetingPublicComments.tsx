import  { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface PublicComment {
    id: number;
    meeting_id: number;
    commenter: string;
    comment: string;
}

const MeetingPublicComments = ({ meetingid }: { meetingid: number }) => {
    const [comments, setComments] = useState<PublicComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const fetchComments = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/getPublicComments?meetingId=${meetingid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setComments(data.data);
            } catch (error) {
                console.error("Error fetching public comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [meetingid]);
    return (
        <div>
            <DataTable value={comments} loading={loading} responsiveLayout="scroll">
                <Column field="commenter" header="Commenter" sortable></Column>
                <Column field="comment" header="Comment" sortable></Column>
            </DataTable>
        </div>
    );

};

export default MeetingPublicComments;