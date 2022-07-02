const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  join_code: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  comment_sharedbID: {
    type: String,
    required: true,
  },
  code_sharedbID: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  room_number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rooms", RoomSchema);
