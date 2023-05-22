import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PeopleShow from "./pages/PeopleShow";
import '../styles/components/mainpage.sass';

const MainPage = (props) => {
  
  const [person, setPeople] = useState(null);

  const peopleURL = "http://localhost:4000/api/people"; 
  
  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch(peopleURL);
      const json = await response.json();
  
      if (response.ok) {
        setPeople(json);
      }
    };
    
    fetchPeople();
  }, []);
  

  const getPeople = async () => {
    const response = await fetch(peopleURL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (personData) => {
    // make post request to create person
    await fetch(peopleURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personData),
    });
    // update list of person
    getPeople();
  };

  const updatePeople = async (personData, id) => {
    // make put request to update person
    await fetch(`${peopleURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personData),
    });
    // update list of person
    getPeople();
  };

  const deletePeople = async (id) => {
    // make delete request to delete person
    await fetch(`${peopleURL}/${id}`, {
      method: "DELETE",
    });
    // update list of person
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);


  return (
    <main id="main-page">
      <h1 className="title">New Networking Info</h1>
      <Routes>
       
        <Route
          exact
          path="/"
          element={<Index person={person} createPeople={createPeople} />}
        />
        <Route
          path="/people/:id"
          element={
            <PeopleShow
              // person={person}
              // updatePeople={updatePeople}
              // deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default MainPage;
