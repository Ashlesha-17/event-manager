const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String },
  createdBy: { type: String, required: true }, // email of creator
  joinCode: { type: String, required: true, unique: true },

  joinRequests: {
    type: [
      {
        name: String,
        email: String,
        contact: String,
      }
    ],
    default: [],
  },

  joinedUsers: {
    type: [
      {
        name: String,
        email: String,
        contact: String,
      }
    ],
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
