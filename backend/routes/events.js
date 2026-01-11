const express = require("express");
const Event = require("../models/event");
const User = require("../models/User");

const router = express.Router();

// Generate a 6-digit join code
const generateJoinCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// =====================
// CREATE EVENT
// =====================
router.post("/create", async (req, res) => {
  try {
    const joinCode = generateJoinCode();
    const event = new Event({ ...req.body, joinCode });
    await event.save();
    res.status(201).json({ message: "Event Created", event, joinCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// GET ALL EVENTS
// =====================
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
});

// =====================
// PREVIEW EVENT BY JOIN CODE
// =====================
router.post("/preview", async (req, res) => {
  try {
    const { eventCode } = req.body;
    const event = await Event.findOne({ joinCode: eventCode });
    if (!event) return res.status(404).json({ message: "Invalid Event Code!" });

    const creator = await User.findOne({ email: event.createdBy });

    res.status(200).json({
      event: {
        name: event.title,
        place: event.location,
        date: event.date,
        time: event.time,
        description: event.description,
      },
      creator: {
        name: creator?.name || "unknown",
        email: creator?.email || "unknown",
        contact: creator?.contact || "unknown",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
});

// =====================
// JOIN EVENT
// =====================
router.post("/join", async (req, res) => {
  try {
    const { eventCode, name, email, contact } = req.body;

    const event = await Event.findOne({ joinCode: eventCode });
    if (!event) return res.status(404).json({ message: "Event Not Found!" });

    // Check if user already requested or joined
    if (event.joinRequests.some(u => u.email === email))
      return res.status(400).json({ message: "Already Requested!" });
    if (event.joinedUsers.some(u => u.email === email))
      return res.status(400).json({ message: "Already Joined!" });

    event.joinRequests.push({ name, email, contact });
    await event.save();

    res.json({ message: "Waiting for admin to approve your request!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!" });
  }
});

// =====================
// APPROVE USER
// =====================
router.post("/approve", async (req, res) => {
  try {
    const { eventId, email } = req.body;

    if (!eventId || !email)
      return res.status(400).json({ message: "EventId and Email are required!" });

    const event = await Event.findById(eventId);
    const user = await User.findOne({ email });

    if (!event) return res.status(404).json({ message: "Event not found!" });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const requestUser = event.joinRequests.find(u => u.email === email);
    if (!requestUser) return res.status(400).json({ message: "Request not found!" });

    // Move from joinRequests → joinedUsers, include contact from User
    event.joinedUsers.push({
      name: requestUser.name,
      email: requestUser.email,
      contact: requestUser.contact, // <-- important!
    });

    // Remove from joinRequests
    event.joinRequests = event.joinRequests.filter(u => u.email !== email);

    // Add event code to user's joinedEvents
    if (!user.joinedEvents) user.joinedEvents = [];
    
    if(!user.joinedEvents.some(e=>e.eventCode===event.joinCode)) {
      user.joinedEvents.push({eventCode:event.joinCode});
    }

    await Promise.all([event.save(), user.save()]);

    const updatedEvent = await Event.findById(eventId);

    res.json({
      message : "User approved successfully!",
      event : updatedEvent
    });

} catch (err) {
    console.error("Approve Route Error:", err);
    res.status(500).json({ message: "Server Error!" });
  }
});


// DELETE EVENT
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found!" });

    await Event.findByIdAndDelete(id);

    res.json({ message: "Event canceled successfully!" });
  } catch (err) {
    console.error("Delete Event Error:", err);
    res.status(500).json({ message: "Server Error!" });
  }
});


// GET JOINED EVENTS OF A USER
router.get("/joined/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const eventCodes = user.joinedEvents.map(e => e.eventCode);

    const events = await Event.find({
      joinCode: { $in: eventCodes }
    });

    res.status(200).json(events);
  } catch (err) {
    console.error("Joined Events Error:", err);
    res.status(500).json({ message: "Server Error!" });
  }
});

// CANCEL JOINED EVENT

router.post("/exit", async (req, res) => {
  try {
    const { eventId, email } = req.body;

    if (!eventId || !email) {
      return res.status(400).json({ message: "EventId and email required!" });
    }

    const event = await Event.findById(eventId);
    const user = await User.findOne({ email });

    if (!event || !user) {
      return res.status(404).json({ message: "Event or User not found!" });
    }

    // Remove from joinedUsers
    event.joinedUsers = event.joinedUsers.filter(
      u => u.email !== email
    );

    // Remove from user's joinedEvents
    user.joinedEvents = user.joinedEvents.filter(
      e => e.eventCode !== event.joinCode
    );

    await event.save();
    await user.save();

    res.json({ message: "You have left the event successfully!" });
  } catch (err) {
    console.error("Leave Event Error:", err);
    res.status(500).json({ message: "Server Error!" });
  }
});



module.exports = router;
