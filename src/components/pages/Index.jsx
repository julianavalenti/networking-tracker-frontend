import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Index(props) {
    
    const [ newForm, setNewForm ] = useState({
      name: "",
      location: "",
      company: "",
      email: "",
      phone: "",
      notes: "",
      });
    
       // handleChange function for form
       const handleChange = (event) => {
        const { name, value } = event.target;
        setNewForm({ ...newForm, [name]: value });
      };
      

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPeople(newForm);
    setNewForm({
      name: "",
      location: "",
      company: "",
      email: "",
      phone: "",
      notes: "",

    });
  };


    
    
  const loaded = () => {
    return props.person.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/person/${person._id}`}><h1>{person.name}</h1></Link>
          
        <h3>{person.location}</h3>
        <h3>{person.company}</h3>
        <h3>{person.email}</h3>
        <h3>{person.phone}</h3>
        <h3>{person.notes}</h3>
        
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.location}
          name="location"
          placeholder="location"
          onChange={handleChange}
      />
      <input
          type="text"
          value={newForm.company}
          name="company"
          placeholder="company"
          onChange={handleChange}
        />
        <input
          type="email"
          value={newForm.email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.phone}
          name="phone"
          placeholder="phone"
          onChange={handleChange}
        />
  
      <input
        type="text"
        value={newForm.notes}
        name="notes"
        placeholder="notes"
        onChange={handleChange}
      />
        <input id="submit-btn" type="submit" value="Add Person" />
      </form>
      {props.person ? loaded() : loading()}
    </section>
  );

}

export default Index;
