import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./myEvents.css";

const MyEvents = () => {
  const navigate = useNavigate();
  const [createdEvents, setCreatedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        const userCreated = res.data.filter(
          event => event.createdBy === email
        );
        setCreatedEvents(userCreated);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [email]);

  // ✅ CORRECT PLACE
  const filteredEvents = createdEvents.filter(ev =>
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.joinCode.includes(searchTerm)
  );

  return (
    <div className="my-events-container">
      <h1>My Events</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by event name or join code"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEvents.length > 0 ? (
        <div className="events-list">
          {filteredEvents.map(ev => (
            <div
              key={ev._id}
              className="event-card"
              onClick={() => navigate(`/events/${ev._id}`)}
            >
              <h2>{ev.title}</h2>
              <p>{ev.date} | {ev.time}</p>
              <p>{ev.location}</p>
              <p>
                <strong>Joining Code:</strong> {ev.joinCode}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No Events Found!</p>
      )}
    </div>
  );
};

export default MyEvents;
