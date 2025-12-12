import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import TownInfo from './pages/TownInfo';
import Header from './components/Header'
import Meeting from './pages/Meeting';

import 'primereact/resources/themes/mdc-dark-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css';

function App() {
  return (
    <div id="main-app">
      <Header />
      <main> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/towninfo/:townId" element={<TownInfo />} />
          <Route path="/meeting/:meetingid" element={<Meeting />} />
        </Routes>
      </main>
    </div>
  )
}

export default App