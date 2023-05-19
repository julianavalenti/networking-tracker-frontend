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
    props.createPeople(newForm);
    setNewForm({
        name: "",
        photo: "",
        quote:"",
        linkedin: "",
        location:""

    });
  };


    
    
      const loaded = () => {
        return props.person.map((person) => (
          <div key={person._id} className="person">
        <Link to={`/person/${person._id}`}><h1>{person.name}</h1></Link>
        <img src={person.photo} alt={person.name} />
        <h3>{person.quote}</h3>
        <h3>{person.location}</h3>
        <a href={person.url} target="_blank" rel="noopener noreferrer">Linkedin</a>
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
        <input type="submit" value="Add Person" />
      </form>
      {props.person ? loaded() : loading()}
    </section>
  );

}

export default Index;
