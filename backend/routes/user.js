const StatusCodes = require("../utils/StatusCodes");

const express = require("express");
const router = express.Router();
const user = require("../models/user");
const createTextMessage = require("../utils/defaultMessages.js");
const { MongoClient } = require("mongodb");
// const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.MONGO_CONN_STR);
const dbName = "user_db";
const cookie = require("cookie");

router.post("/signup", async (req, res) => {
  // req.session.username = username;
  console.log(req.session.username);

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

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // const newUser = new user({
  //   username: username,
  //   password: password,
  // });
  // console.log(req.session.username);
  try {
    await client.connect();
    const user_db = client.db(dbName);
    const user = user_db.collection("user");
    const result = await user.findOne({ username: username });
    if (result) {
      if (result.password === password) {
        console.log("found");
        req.session.username = username;

        return res
          .setHeader(
            "Set-Cookie",
            cookie.serialize("abc", "jashdkjasdjkas", {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            })
          )
          .status(StatusCodes.SUCCESS)
          .json(createTextMessage("Login Success"));
      } else {
        console.log("wrong pw");

        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send(createTextMessage("Wrong Password"));
      }
    } else {
      console.log("no this user ");

      return res
        .status(StatusCodes.NOT_FOUND)
        .send(createTextMessage("User not found"));
    }
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving user to database"));
  }
});

router.get("/signout/", function (req, res, next) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    })
  );
  return res;
});

module.exports = router;
