import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EventsIndex(props) {
  const { events, createEvent, isLoading } = props;

  const [newForm, setNewForm] = useState({
    title: '',
    location: '',
    company: '',
    date: '',
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewForm({ ...newForm, [name]: value });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://network-tracker-backend-three.onrender.com/events');
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://network-tracker-backend-three.onrender.com/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newForm),
      });
      if (response.ok) {
        const data = await response.json();
        setEvents([...events, data]); // Add the new event to the events state
        setNewForm({
          title: '',
          location: '',
          company: '',
          date: '',
          notes: '',
        });
      } else {
        console.log('Error creating event');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loaded = () => {
    if (events.length === 0) {
      return <h1>No events registered</h1>;
    }
    return (
      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event">
            <Link to={`/events/${event._id}`}>
              <h1 className="event-name">{event.title}</h1>
            </Link>
            <h3 className="event-info">Location: {event.location}</h3>
            <h3 className="event-info">Company: {event.company}</h3>
            <h3 className="event-info">Date: {event.date}</h3>
            <h3 className="event-info">Notes: {event.notes}</h3>
          </div>
        ))}
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.location}
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.company}
          name="company"
          placeholder="Company"
          onChange={handleChange}
        />
        <input
          type="date"
          value={newForm.date}
          name="date"
          placeholder="Date"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.notes}
          name="notes"
          placeholder="Notes"
          onChange={handleChange}
        />
        <input id="submit-btn" type="submit" value="Add Event" />
      </form>
      {isLoading ? loading() : loaded()}
    </section>
  );
}

export default EventsIndex;
