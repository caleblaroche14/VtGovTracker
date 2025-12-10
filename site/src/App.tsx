import { useState, useEffect } from 'react'
import './App.css'
import AttendeesGrid  from './components/attendeesGrid';

function App() {
  return (
    <>
      <div>
          <AttendeesGrid meetingid={20} />
      </div>
    </>
  )
}

export default App