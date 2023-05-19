import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Index(props) {
    
    const [ newForm, setNewForm ] = useState({
        name: "",
        photo: "",
        quote:"",
        linkedin: "",
        location:""

      });
    
       // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createStudent(newForm);
    setNewForm({
        name: "",
        photo: "",
        quote:"",
        linkedin: "",
        location:""

    });
  };


    
    
      const loaded = () => {
        return props.student.map((student) => (
          <div key={student._id} className="student">
        <Link to={`/student/${student._id}`}><h1>{student.name}</h1></Link>
        <img src={student.photo} alt={student.name} />
        <h3>{student.quote}</h3>
        <h3>{student.location}</h3>
        <a href={student.url} target="_blank" rel="noopener noreferrer">Linkedin</a>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.photo}
          name="photo"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.quote}
          name="quote"
          placeholder="quote"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.linkedin}
          name="quote"
          placeholder="linkedin"
          onChange={handleChange}
        /><input
        type="text"
        value={newForm.location}
        name="location"
        placeholder="location"
        onChange={handleChange}
      />
        <input type="submit" value="Add Student" />
      </form>
      {props.student ? loaded() : loading()}
    </section>
  );

}

export default Index;
