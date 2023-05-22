import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Show from "./pages/Show";
import '../styles/components/mainpage.sass';

function MainPage() {
  const [person, setPeople] = useState(null);

  const URL = "http://localhost:4000/api/people"; 
  
  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch(URL);
      const json = await response.json();
  
      if (response.ok) {
        setPeople(json);
      }
    };
    
    fetchPeople();
  }, []);
  

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (personData) => {
    // make post request to create person
    await fetch(URL, {
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
    await fetch(`${URL}/${id}`, {
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
    await fetch(`${URL}/${id}`, {
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
          path="/person/:id"
          element={
            <Show
              person={person}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default MainPage;
