import React, { useEffect, useState } from "react";
import axios from "axios";
import "./joinedEvents.css";

const JoinedEvents = () => {
  const email = localStorage.getItem("email");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/events/joined/${email}`
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching joined events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [email]);

  const handleCancelJoin = async (eventId) => {
    try {
      await axios.post("http://localhost:5000/api/events/exit", {
        eventId,
        email,
      });

      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (err) {
      console.log("Error cancelling event!", err);
      alert("Failed to cancel your seat!");
    }
  };

  // ✅ SEARCH FILTER
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.joinCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading joined events...</p>;

  return (
    <div className="joined-events-container">
      <h2>My Joined Events</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by event name or join code"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEvents.length === 0 ? (
        <p className="empty-text">You haven’t joined any events yet.</p>
      ) : (
        <div className="cards-grid">
          {filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Join Code:</strong> {event.joinCode}</p>
              <button
                className="cancel-join-button"
                onClick={() => handleCancelJoin(event._id)}
              >
                Cancel Join
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
