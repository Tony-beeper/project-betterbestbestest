const StatusCodes = require("../utils/StatusCodes");

const express = require("express");
const router = express.Router();
const user = require("../models/user");
const createTextMessage = require("../utils/defaultMessages.js");
const { MongoClient } = require("mongoDB");
// const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.MONGO_CONN_STR);
const dbName = "user_db";

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new user({
    username: username,
    password: password,
  });

  try {
    await client.connect();
    console.log("connected to server");
    const user_db = client.db(dbName);
    const user = user_db.collection("user");
    await user.insertOne(newUser);
    console.log("created user");

    return res
      .status(StatusCodes.CREATED)
      .send(createTextMessage("saved user"));
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving user to database"));
  }
});

module.exports = router;
