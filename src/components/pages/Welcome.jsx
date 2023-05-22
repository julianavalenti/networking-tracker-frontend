import React from 'react'
// import video1 from '../img/welcomevideo.mp4'
import ReactPlayer from 'react-player'
const Welcome = () => {
  return (
    <div className="welcome-message">
    
    {/* <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
       */}
    <ReactPlayer className="welcome-video" url={'src/img/welcomevideo.mp4'} controls={true} playing={true} loop={true}/>
    
  </div>
);
};

export default Welcome