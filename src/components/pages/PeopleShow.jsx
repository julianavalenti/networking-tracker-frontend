// PeopleShow.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PeopleShow = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    try {
      const people = await props.fetchPeople();
      const person = people.find((p) => p._id === id);
      if (person) {
        setSelectedPerson(person);
        setEditForm(person);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchPerson(); // Fetch person data
  }, [id]); // Add id as a dependency to refetch person when the id changes

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await props.updatePeople(editForm, selectedPerson._id);
    setIsEditing(false);
    navigate('/people');
  };

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleDelete = async () => {
    await props.deletePeople(selectedPerson._id);
    navigate('/people');
  };

  const loaded = () => {
    if (selectedPerson) {
      return (
        <>
          <h1>{selectedPerson.name}</h1>
          <h2>{selectedPerson.location}</h2>
          <h2>{selectedPerson.company}</h2>
          <h2>{selectedPerson.email}</h2>
          <h2>{selectedPerson.phone}</h2>
          <h2>{selectedPerson.notes}</h2>

          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>{isEditing ? 'Cancel Edit' : 'Edit'}</button>

          {isEditing && (
            <form onSubmit={handleUpdate}>
              <input type="text" value={editForm.name} name="name" placeholder="name" onChange={handleChange} />
              <input type="text" value={editForm.location} name="location" placeholder="location" onChange={handleChange} />
              <input type="text" value={editForm.company} name="company" placeholder="company" onChange={handleChange} />
              <input type="email" value={editForm.email} name="email" placeholder="email" onChange={handleChange} />
              <input type="text" value={editForm.phone} name="phone" placeholder="phone" onChange={handleChange} />
              <input type="text" value={editForm.notes} name="notes" placeholder="notes" onChange={handleChange} />
              <input type="submit" value="Update Person" />
            </form>
          )}
        </>
      );
    } else if (props.people.length === 0) {
      return <h1>No contacts registered</h1>;
    } else {
      return loading();
    }
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return <div className="person">{selectedPerson ? loaded() : loading()}</div>;
};

export default PeopleShow;
