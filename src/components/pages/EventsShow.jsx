import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EventsShow = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedEvent(data);
        setEditForm(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        setIsEditing(false);
        props.fetchEvents(); // Assuming you have a fetchEvents function in EventsPage
        navigate('/events'); // Navigate back to the events page
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        props.fetchEvents(); // Assuming you have a fetchEvents function in EventsPage
        navigate('/events'); // Navigate back to the events page
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loaded = () => {
    return (
      <>
        <h1>{selectedEvent.title}</h1>
        <h2>{selectedEvent.location}</h2>
        <h2>{selectedEvent.company}</h2>
        <h2>{selectedEvent.date}</h2>
        <h2>{selectedEvent.notes}</h2>

        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel Edit' : 'Edit'}
        </button>

        {isEditing && (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editForm.title}
              name="title"
              placeholder="title"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.location}
              name="location"
              placeholder="location"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.company}
              name="company"
              placeholder="company"
              onChange={handleChange}
            />
            <input
              type="date"
              value={editForm.date}
              name="date"
              placeholder="date"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.notes}
              name="notes"
              placeholder="notes"
              onChange={handleChange}
            />
            <input type="submit" value="Update Event" />
          </form>
        )}
      </>
    );
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return <div className="event">{selectedEvent ? loaded() : loading()}</div>;
};

export default EventsShow;
