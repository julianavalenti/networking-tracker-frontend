// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import EventsPage from './components/pages/EventsPage';
import Welcome from './components/pages/Welcome';
import PeopleShow from './components/pages/PeopleShow';
import EventsIndex from './components/pages/EventsIndex';
import EventsShow from './components/pages/EventsShow';
import './styles/components/app.sass';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:4000/events");
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:4000/people');
      if (!response.ok) {
        throw new Error('Failed to fetch people.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const createEvent = async (newEventData) => {
    try {
      const response = await fetch("http://localhost:4000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEventData),
      });
      if (response.ok) {
        // Fetch the updated events list
        fetchEvents();
      } else {
        console.log("Error creating event");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div id="tracker">
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400&family=Staatliches&display=swap');
          `}
        </style>
        <img className="banner" src="/banner.png" alt="Image description" />

        <Sidebar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/people/*" element={<MainPage />} />
          <Route path="/people/:id/*" element={<PeopleShow fetchPeople={fetchPeople} />} />
          <Route path="/events" element={<EventsIndex createEvent={createEvent} events={events} fetchEvents={fetchEvents} />} />
          <Route path="/events/:id" element={<EventsShow fetchEvents={fetchEvents} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
