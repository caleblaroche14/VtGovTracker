import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MeetingItemsGrid from '../components/MeetingItemsGrid';
import MeetingPublicComments from '../components/MeetingPublicComments';
import MeetingUpdatesGrid from '../components/MeetingUpdatesGrid';
import AttendeesGrid from '../components/AttendeesGrid';

interface MeetingInfo{
    meetingid: number
}

interface Item {
  id: number;
  meeting_id: number;
  desc: string;
  item: string;
  passed: boolean;
  votesY: number;
  votesN: number;
}

interface Items{
    items: Item[];
}

const Meeting = () =>{
    const {meetingid} = useParams<{meetingid: string}>();

    return(
        <div>
            <div>Meeting</div>
            <MeetingItemsGrid meetingid={Number(meetingid)} />
            <MeetingPublicComments meetingid={Number(meetingid)} />
            <MeetingUpdatesGrid meetingid={Number(meetingid)} />
            <AttendeesGrid meetingid={Number(meetingid)} />
        </div>
    );
}

export default Meeting; 