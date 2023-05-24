import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Index(props) {
  const [newForm, setNewForm] = useState({
    name: '',
    location: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewForm({ ...newForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPeople(newForm);
    setNewForm({
      name: '',
      location: '',
      company: '',
      email: '',
      phone: '',
      notes: '',
    });
  };

  const loaded = () => {
    if (props.people === null) {
      return <h1>Loading...</h1>;
    }
    
    return (
      <div className="person-grid">
        {props.people.map((person) => (
          <div key={person._id} className="person">
            <Link to={`/people/${person._id}`}>
              <h1 className="person-name">{person.name}</h1>
            </Link>
            <h3 className="person-info">Location: {person.location}</h3>
            <h3 className="person-info">Company: {person.company}</h3>
            <h3 className="person-info">Email: {person.email}</h3>
            <h3 className="person-info">Phone: {person.phone}</h3>
            <h3 className="person-info">Notes: {person.notes}</h3>
          </div>
        ))}
      </div>
    );
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
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.location}
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.company}
          name="company"
          placeholder="Company"
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
          placeholder="Phone"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.notes}
          name="notes"
          placeholder="Notes"
          onChange={handleChange}
        />
        <input id="submit-btn" type="submit" value="Add Person" />
      </form>
      {props.people && props.people.length > 0 ? loaded() : loading()}

    </section>
  );
}

export default Index;
