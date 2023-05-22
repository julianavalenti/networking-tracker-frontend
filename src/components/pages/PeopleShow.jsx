import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Show = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const people = props.person;
  console.log(id);
  
  
  const selectedPerson = people ? people.find((p) => p._id === id) : null;

  const [editForm, setEditForm] = useState(selectedPerson);
  
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedPerson) {
      setEditForm(selectedPerson);
    }
  }, [selectedPerson]);

  // handling form data change
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value 
    });
  };
  
  // handling submit event for edit form
  const handleUpdate = (e) => {
    e.preventDefault();
    props.updatePeople(editForm, selectedPerson._id);
  };

  const handleEdit = () => {
    setIsEditing(prevState => !prevState);
    fetch(`http://localhost:4000/api/people/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json" 
      }
    })
      .then(res => res.json())
      .then(data => {
        setEditForm({
          name: data.name, 
          location: data.location,
          company: data.company,
          email: data.email,
          phone: data.phone,
          notes: data.notes
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
      

  const handleDelete = () => {
    props.deletePeople(selectedPerson._id);
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
    <div className="person">
      { selectedPerson ? loaded() : loading() }

      { isEditing &&
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
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
          type="email"
          value={editForm.email}
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.phone}
          name="phone"
          placeholder="phone"
          onChange={handleChange}
        />
        
        <input
        type="text"
        value={editForm.notes}
        name="notes"
        placeholder="notes"
        onChange={handleChange}
      />
        <input type="submit" value="Update Person" />
      </form>
      }
    </div>
  );
};

export default Show;
