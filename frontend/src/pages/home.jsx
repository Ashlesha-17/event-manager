import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div id="home">
      <p id="title">Welcome to Event Manager!</p>
      <p className="description">
        Where every event becomes an experience. Create moments that matter...
      </p>
      <div id="home-buttons">
        <button id="create" aria-label="Create a new event" onClick={()=>navigate("/create")}>Create Event</button>
        <button id="join" aria-label="Join an existing event" onClick={()=>navigate("/join")}>Join Event</button>
      </div>
      <div className="bottom-buttons">
        <button className="btn" onClick={()=>navigate("/events")}>My Events</button>
        <button className="btn" onClick={()=>navigate("/joined-events")}>Joined Events</button>
      </div>
    </div>
  );
};

export default Home;
