import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import EventsIndex from './EventsIndex';
import EventsShow from './EventsShow';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  const eventsURL = 'http://localhost:4000/api/events';

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(eventsURL);
      const data = await response.json();

      if (response.ok) {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const createEvents = async (eventData) => {
    // make post request to create event
    await fetch(eventsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    // update list of events
    fetchEvents();
  };

  const updateEvents = async (eventData, id) => {
    // make put request to update event
    await fetch(`${eventsURL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    // update list of events
    fetchEvents();
  };

  const deleteEvents = async (id) => {
    // make delete request to delete event
    await fetch(`${eventsURL}/${id}`, {
      method: 'DELETE',
    });
    // update list of events
    fetchEvents();
  };

  return (
    <main id="main-page">
      <h1 className="title">test</h1>
      <Routes>
        <Route
          exact
          path="/"
          element={<EventsIndex events={events} createEvents={createEvents} />}
        />
        <Route
          path="/event/:id"
          element={
            <EventsShow
              events={events}
              updateEvents={updateEvents}
              deleteEvents={deleteEvents}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default EventsPage;
