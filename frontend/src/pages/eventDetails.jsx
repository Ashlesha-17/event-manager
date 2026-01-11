import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./eventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        const found = res.data.find(ev => ev._id === id);
        setEvent(found);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const cancelEvent = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      alert("Event canceled successfully!");
      navigate("/events");
    } catch (err) {
      console.error("Error canceling event:", err);
    }
  };

  const approveUser = async (email) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/approve",
        {
          eventId: event._id,
          email
        }
      );

      // update UI from backend response
      setEvent(res.data.event);

    } catch (err) {
      console.error("Error approving user:", err);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-container">

      {/* ================= TITLE ================= */}
      <h1>{event.title}</h1>

      {/* ================= EVENT INFO ================= */}
      <div className="event-info">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Join Code:</strong> {event.joinCode}</p>
      </div>

      {/* ================= JOIN REQUESTS ================= */}
      <h2 className="section-title section-gap">Join Requests</h2>

      <div className="join-requests">
        {event.joinRequests && event.joinRequests.length > 0 ? (
          event.joinRequests.map((user, idx) => (
            <div className="request-row" key={idx}>
              <div className="request-user">
                <span>{user.name}</span>
                <small>{user.email}</small>
              </div>
              <button
                className="approve-btn"
                onClick={() => approveUser(user.email)}
              >
                Approve
              </button>
            </div>
          ))
        ) : (
          <p className="no-requests">No pending requests</p>
        )}
      </div>

      {/* ================= JOINED USERS ================= */}
      <h2 className="section-title section-gap">Joined Users</h2>

      {event.joinedUsers && event.joinedUsers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {event.joinedUsers.map((user, idx) => (
              <tr key={idx}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-users">No users joined yet.</p>
      )}

      {/* ================= CANCEL BUTTON ================= */}
      <button className="cancel-btn" onClick={cancelEvent}>
        Cancel Event
      </button>

    </div>
  );
};

export default EventDetails;
