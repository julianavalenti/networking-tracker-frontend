import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import EventsIndex from './EventsIndex';
import EventsShow from './EventsShow';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:4000/events');
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createEvent = async (newEventData) => {
    try {
      const response = await fetch('http://localhost:4000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEventData),
      });
      if (response.ok) {
        fetchEvents();
      } else {
        console.log('Error creating event');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main id="main-page">
      <h1 className="title">Events</h1>

      <Routes>
        <Route
          path="/"
          element={<EventsIndex createEvent={createEvent} events={events} isLoading={isLoading} />}
        />
        <Route
          path="/events/:id"
          element={<EventsShow events={events} />}
        />
      </Routes>
    </main>
  );
};

export default EventsPage;
