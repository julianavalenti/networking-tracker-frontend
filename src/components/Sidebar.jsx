import React from 'react'
import Avatar from '../img/img.gif'
import "../styles/components/sidebar.sass"

const Sidebar = () => {
  return (
    <aside id="sidebar">
    <img src={Avatar} alt="logo"/>

    <a className="menu" href="/home">Home</a>
    <a className="menu" href="/network">Network</a>
    <a className="menu" href="/events">Events</a>

    


    </aside>
  )
}

export default Sidebar