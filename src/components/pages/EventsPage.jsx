import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import EventsIndex from "./EventsIndex";
import EventsShow from "./EventsShow";



const EventsPage = () => {
  const navigate = useNavigate();

  const createEvent = async (eventData) => {
    try {
      const response = await fetch('http://localhost:4000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent = async (eventData, id) => {
    try {
      const response = await fetch(`http://localhost:4000/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:4000/events');
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
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
          element={<EventsIndex createEvent={createEvent} events={events} />}
        />
        <Route
          path="/events/:id"
          element={
            <EventsShow
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              events={events}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default EventsPage;