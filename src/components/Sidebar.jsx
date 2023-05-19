import React from 'react'
import Avatar from '../img/img.gif'
import "../styles/components/sidebar.sass"

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <img src={Avatar} alt="logo" />

      <Link className="menu" to="/home">
        Home
      </Link>
      <Link className="menu" to="/network">
        Network
      </Link>
      <Link className="menu" to="/events">
        Events
      </Link>
    </aside>
  );
};

export default Sidebar