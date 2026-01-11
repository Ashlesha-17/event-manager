import React, { useState } from "react";
import axios from "axios";
import "./createEvent.css";

const CreateEvent = () => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const [eventData, setEventData] = useState({
        title:"",
        date:"",
        time:"",
        location:"",
        description:"",
        createdBy: email,
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setEventData({...eventData, [name]: value});
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/events/create",eventData);
            alert(`Event created successfully!\n Code : ${res.data.joinCode}`);
        } catch(err) {
            alert("Error creating event");
        }
        console.log("Event created : ", eventData);
    };

    return (
        <div className="create-event">
            <h2>Create New Event</h2>
            <p className="event-subtitle">
               Plan • Manage • Experience
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={eventData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    required
                />

                <input
                    type="time"
                    name="time"
                    value={eventData.time}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={eventData.location}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Event Description"
                    value={eventData.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;