import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PeopleMainPage from './components/PeopleMainPage';
import EventsPage from './components/pages/EventsPage';
import Welcome from './components/pages/Welcome';
import './styles/components/app.sass';

function App() {
  return (
    <Router>
      <div id="tracker">
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400&family=Staatliches&display=swap');
          `}
        </style>
        <img className="banner" src="src/img/networking (1).svg" alt="Image description" />

        <Sidebar />
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/people" element={<PeopleMainPage />} />
          <Route path="/events/*" element={<EventsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
