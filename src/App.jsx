import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PeopleMainPage from './components/MainPage';
import EventsPage from './components/pages/EventsPage';
import Welcome from './components/pages/Welcome';
import PeopleShow from './components/pages/PeopleShow'

import EventsIndex from './components/pages/EventsIndex';
import EventsShow from './components/pages/EventsShow'; // Import the EventsShow component
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
        <img className="banner" src="src/img/banner.png" alt="Image description" />

        <Sidebar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/people/*" element={<PeopleMainPage />} />
          <Route
            path="/people/:id"
            element={<PeopleShow />} // Use the EventsShow component
          />
          {/* <Route path="/events/*" element={<EventsPage />} /> */}
          <Route path="/events" element={<EventsIndex />} />
          <Route
            path="/events/:id"
            element={<EventsShow />} // Use the EventsShow component
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
