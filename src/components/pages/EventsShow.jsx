import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EventsShow = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const events = props.event;
  console.log(id);


  const selectedEvent = events ? events.find((p) => p._id === id) : null;

  const [editForm, setEditForm] = useState(selectedEvent);
  
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    if (selectedEvent) {
      setEditForm(selectedEvent);
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    props.updateEvent(editForm, selectedEvent._id);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(prevState => !prevState);
    fetch(`http://localhost:4000/api/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json" 
      }
    })
      .then(res => res.json())
      .then(data => {
        setEditForm({
          title: data.title, 
          location: data.location,
          company: data.company,
          date: data.date,
          notes: data.notes
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  const handleDelete = () => {
    props.deleteEvent(selectedEvent._id);
    navigate('/');
  };

  const loaded = () => {
    return (
      <>
        <h1>{selectedPerson.name}</h1>
        <h2>{selectedPerson.location}</h2>
        <h2>{selectedPerson.company}</h2>
        <h2>{selectedPerson.email}</h2>
        <h2>{selectedPerson.phone}</h2>
        <h2>{selectedPerson.notes}</h2>
        

        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>{ isEditing ? 'Cancel Edit' : 'Edit' }</button>
      </>
    );
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="event">
      { selectedEvent ? loaded() : loading() }

      { isEditing &&
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
      }
    </div>
  );
};

export default EventsShow;
