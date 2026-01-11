// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateEvent from "./pages/createEvent";
import MyEvents from "./pages/myEvents";
import EventDetails from "./pages/eventDetails";
import JoinEvent from "./pages/joinEvent";
import JoinedEvents from "./pages/joinedEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />     {/* default */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> {/* after login */}
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/events" element={<MyEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/join" element={<JoinEvent />} />
        <Route path="/joined-events" element={<JoinedEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
