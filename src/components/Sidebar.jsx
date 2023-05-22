import React from 'react';

// import '../styles/components/sidebar.sass';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <Link className="menu" to="/">
        HOME
      </Link>
      <Link className="menu" to="/people">
        NETWORKING TRACKER
      </Link>
      <Link className="menu" to="/events">
        EVENTS
      </Link>
    </aside>
  );
};

export default Sidebar;
