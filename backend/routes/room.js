const express = require("express");
const createDoc = require("../models/code");
const { v4 } = require("uuid");

const router = express.Router();

router.post("/", (req, res) => {
  var roomOwner = req.body.username;
  var roomId = v4();
  createDoc(roomOwner, roomId, function (err) {
    if (err) return res.status(500).json({ err: err });
    return res.json({ roomId: roomId });
  });
});

module.exports = router;
