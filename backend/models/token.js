const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("token", TokenSchema);
