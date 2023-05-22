import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EventsShow = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const events = props.events;
  console.log(id);

  const selectedEvent = events ? events.find((p) => p._id === id) : null;

  const [editForm, setEditForm] = useState(selectedEvent);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setEditForm(selectedEvent);
    }
  }, [selectedEvent]);

  // handling form data change
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // handling submit event for edit form
  const handleUpdate = (e) => {
    e.preventDefault();
    props.updateEvents(editForm, selectedEvent._id);
  };

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
    fetch(`http://localhost:4000/api/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEditForm({
          title: data.title,
          location: data.location,
          company: data.company,
          date: data.date,
          notes: data.notes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    props.deleteEvents(selectedEvent._id);
    navigate('/');
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
        <button onClick={handleEdit}>{isEditing ? 'Cancel Edit' : 'Edit'}</button>
      </>
    );
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="event">
      {selectedEvent ? loaded() : loading()}

      {isEditing && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editForm.title}
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.location}
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.company}
            name="company"
            placeholder="Company"
            onChange={handleChange}
          />
          <input
            type="date"
            value={editForm.date}
            name="date"
            placeholder="Date"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.notes}
            name="notes"
            placeholder="Notes"
            onChange={handleChange}
          />
          <input type="submit" value="Update Event" />
        </form>
      )}
    </div>
  );
};

export default EventsShow;
