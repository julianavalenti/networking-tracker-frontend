import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Show = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = props.student;
  console.log(id);
  
  const stunden = student ? student.find((p) => p._id === id) : null;

  const [editForm, setEditForm] = useState(stunden);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (stunden) {
      setEditForm(stunden);
    }
  }, [stunden]);

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
    props.updateStudent(editForm, stunden._id);
  };

  const handleEdit = () => {
    setIsEditing(prevState => !prevState);
  };

  const handleDelete = () => {
    props.deleteStudent(stunden._id);
    navigate('/');
  };

  const loaded = () => {
    return (
      <>
        <h1>{stunden.name}</h1>
        <h2>{stunden.quote}</h2>
        <h2>{stunden.linkedin}</h2>
        <h2>{stunden.location}</h2>
        <img 
          className="avatar-image" 
          src={stunden.photo} 
          alt={stunden.name} 
        />
        <h3>{stunden.title}</h3>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>{ isEditing ? 'Cancel Edit' : 'Edit' }</button>
      </>
    );
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="stunden">
      { stunden ? loaded() : loading() }

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
          placeholder="student photo"
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
        <input type="submit" value="Update Student" />
      </form>
      }
    </div>
  );
};

export default Show;
