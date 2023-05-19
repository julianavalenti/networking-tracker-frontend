import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Show = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const people = props.person;
  console.log(id);
  
  const person = person ? person.find((p) => p._id === id) : null;

  const [editForm, setEditForm] = useState(person);
  
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (person) {
      setEditForm(person);
    }
  }, [person]);

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
    props.updateStudent(editForm, person._id);
  };

  const handleEdit = () => {
    setIsEditing(prevState => !prevState);
  };

  const handleDelete = () => {
    props.deleteStudent(person._id);
    navigate('/');
  };

  const loaded = () => {
    return (
      <>
        <h1>{person.name}</h1>
        <h2>{person.quote}</h2>
        <h2>{person.linkedin}</h2>
        <h2>{person.location}</h2>
        <img 
          className="avatar-image" 
          src={person.photo} 
          alt={person.name} 
        />
        <h3>{person.title}</h3>
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
      { person ? loaded() : loading() }

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
          name="linkedin" // Corrected attribute name
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
