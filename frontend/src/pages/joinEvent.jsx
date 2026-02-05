import React, { useState } from "react";
import axios from "axios";
import "./joinEvent.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const JoinEvent = () => {
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const contact = localStorage.getItem("contact");

  const [eventCode, setEventCode] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEventDetails = async (code) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/events/preview`,
        { eventCode: code }
      );

      setEventDetails(res.data);
      setError("");
    } catch (err) {
      setEventDetails(null);
      setError(err.response?.data?.message || "Invalid Event Code");
    }
  };

  const handleJoin = async () => {
    if (!eventCode) {
      alert("Enter event code first!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/events/join`,
        {
          eventCode,
          name,
          email,
          contact
        }
      );

      alert(res.data.message || "Join request sent, wait for approval!");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to join event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-event-container">
      <h2>Join Event</h2>

      <input
        type="text"
        placeholder="Enter Event Code"
        value={eventCode}
        onChange={(e) => {
          setEventCode(e.target.value);
          if (e.target.value.length >= 4) {
            fetchEventDetails(e.target.value);
          } else {
            setEventDetails(null);
            setError("");
          }
        }}
      />

      {error && <p className="error-text">{error}</p>}

      {eventDetails && (
        <div className="event-preview">
          <h1>{eventDetails.event?.name}</h1>

          <p><strong>Place:</strong> {eventDetails.event?.place}</p>
          <p><strong>Date:</strong> {eventDetails.event?.date}</p>
          <p><strong>Time:</strong> {eventDetails.event?.time}</p>

          <p className="description">
            <strong>Description:</strong> {eventDetails.event?.description}
          </p>

          <p className="creator">
            <strong>Created By:</strong> {eventDetails.creator?.name}<br />
            <strong>Email:</strong> {eventDetails.creator?.email}<br />
            <strong>Contact:</strong> {eventDetails.creator?.contact}
          </p>

          <button onClick={handleJoin} disabled={loading}>
            {loading ? "Joining..." : "Join Event"}
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinEvent;
