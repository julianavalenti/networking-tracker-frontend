import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import EventsIndex from "./EventsIndex";
import EventsShow from "./EventsShow";




const EventsPage = () => {
  

  const createEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      const response = await fetch(`http://localhost:4000/api/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
      const response = await fetch(`http://localhost:4000/api/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main id="main-page">
      <h1 className="title">Events</h1>
      
    </main>
  );
};

export default EventsPage;
