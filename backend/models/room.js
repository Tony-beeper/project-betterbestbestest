const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  joinCode: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  commentSharedbID: {
    type: String,
    required: true,
  },
  codeSharedbID: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rooms", RoomSchema);
