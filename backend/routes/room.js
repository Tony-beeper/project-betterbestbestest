const express = require("express");
const Room = require("../models/room");
const { generateString, generateId } = require("../utils/random");
const { param, body, validationResult } = require("express-validator");
const { createDoc, deleteDoc, test } = require("../models/sharedb");
const { v4 } = require("uuid");
const { ObjectId } = require("mongodb");
const MAX_MEMBERS = 3;

// router = "/api/room"
const router = express.Router();

// endpoint for creating a room
router.post(
  "/",
  body("username")
    .notEmpty()
    .trim()
    .escape()
    .withMessage({ err: "wrong or missing roomOwner" }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }
    var roomOwner = req.body.username;
    const room = await Room.findOne({ Owner: roomOwner });
    if (room) {
      return res.status(400).json({ err: "user already have a room" });
    }
    var commentId = v4();
    var codeId = v4();
    createDoc(`${roomOwner}_comment`, commentId, function (err) {
      if (err) return res.status(400).json({ err: err });
      createDoc(`${roomOwner}_code`, codeId, async function (err) {
        if (err) return res.status(400).json({ err: err });
        const newRoom = new Room({
          join_code: generateString(6),
          Owner: roomOwner,
          comment_sharedbID: commentId,
          code_sharedbID: codeId,
          members: [roomOwner],
          room_number: generateId(9),
        });
        await newRoom.save();
        return res.json({ newRoom });
      });
    });
  }
);

// endpoint for deleting a room
router.delete(
  "/:roomId/",
  param("roomId")
    .notEmpty()
    .trim()
    .escape()
    .custom((roomId) => {
      ObjectId.isValid(roomId);
    })
    .withMessage({ err: "wrong or missing roomOwner" }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }
    var roomId = req.params.roomId;
    const room = await Room.findOne({ _id: ObjectId(roomId) });
    if (!room) {
      return res.status(400).json({ err: "room does not exist" });
    }
    console.log(room);
    if (room.roomOwner !== req.username)
      return res
        .status(403)
        .json({ err: "you are not allowed to delete the room" });
    await deleteDoc(`${room.Owner}_comment`, room.comment_sharedbID);
    await deleteDoc(`${room.Owner}_code`, room.code_sharedbID);
    await Room.deleteOne({ _id: ObjectId(roomId) });
    return res.json(room.toObject());
    // deleteDoc(`${room.Owner}_comment`, room.comment_sharedbID, (err) => {
    //   if (err) return res.status(500).json({ err: err });
    //   deleteDoc(`${room.Owner}_code`, room.code_sharedbID, async (err) => {
    //     if (err) return res.status(500).json({ err: err });
    //     await Room.deleteOne({ _id: ObjectId(roomId) });
    //     return res.json(room);
    //   });
    // });
  }
);

// endpoint for get a room
router.get(
  "/:roomId/",
  param("roomId")
    .notEmpty()
    .trim()
    .escape()
    .custom((roomId) => {
      ObjectId.isValid(roomId);
    })
    .withMessage({ err: "missing or wrong roomId" }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }
    var roomId = req.params.roomId;
    const room = await Room.findOne({ _id: ObjectId(roomId) });
    if (!room) return res.status(400).json({ err: "room does not exist" });
    return res.json(room.toObject());
  }
);

// endpoint for join a room
router.patch(
  "/join/",
  body("joinCode")
    .notEmpty()
    .isLength({ max: 6 })
    .trim()
    .escape()
    .withMessage({ err: "wrong or missing joinCode" }),
  body("roomNumber")
    .notEmpty()
    .isLength({ max: 9 })
    .trim()
    .escape()
    .withMessage({ err: "wrong or missing roomId" }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }
    var roomNumber = req.body.roomNumber;
    var joinCode = req.body.joinCode;
    const room = await Room.findOne({ room_number: roomNumber });
    console.log(room);
    if (!room || room.join_code !== joinCode) {
      return res.status(400).json({ err: "wrong roomId or join code" });
    }
    if (room.members.length >= MAX_MEMBERS) {
      res.status(400).json({ err: "room already full" });
    }
    room.members.push(req.username);
    const update_room = await Room.findOneAndUpdate(
      { room_number: roomNumber },
      { members: room.members },
      { new: true }
    );
    return res.json(update_room.toObject());
  }
);

router.post("/test/", (req, res) => {
  var name = req.body.name;
  var id = req.body.id;
  test(name, id, (err) => {
    return res.json("ok");
  });
});

module.exports = router;
