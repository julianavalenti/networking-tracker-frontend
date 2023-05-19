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
    props.updateStudent(editForm, selectedPerson._id);
  };

  const handleEdit = () => {
    setIsEditing(prevState => !prevState);
  };

  const handleDelete = () => {
    props.deleteStudent(selectedPerson._id);
    navigate('/');
  };

  const loaded = () => {
    return (
      <>
        <h1>{selectedPerson.name}</h1>
        <h2>{selectedPerson.quote}</h2>
        <h2>{selectedPerson.linkedin}</h2>
        <h2>{selectedPerson.location}</h2>
        <img 
          className="avatar-image" 
          src={selectedPerson.photo} 
          alt={selectedPerson.name} 
        />
        <h3>{selectedPerson.title}</h3>
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
          value={editForm.photo}
          name="photo"
          placeholder="person photo"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.quote}
          name="quote"
          placeholder="quote"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.linkedin}
          name="linkedin"
          placeholder="linkedin"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.location}
          name="location"
          placeholder="location"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
      }
    </div>
  );
};

export default Show;
