const StatusCodes = require("../utils/StatusCodes");

const express = require("express");
const router = express.Router();
const user = require("../models/user");
const createTextMessage = require("../utils/defaultMessages.js");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.MONGO_CONN_STR);
const dbName = "user_db";
const cookie = require("cookie");

router.post("/signup", async (req, res) => {
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
    const result = await user.findOne({ username: username });
    if (result) {
      return res
        .cookie("username", "", {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
        .status(StatusCodes.CONFLICT)
        .send(createTextMessage("Username Taken"));
    } else {
      await user.insertOne(newUser);
      console.log("created user");
      req.session.username = username;

      return res
        .cookie("username", username, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
        .status(StatusCodes.SUCCESS)
        .send("created user");
    }
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
          .cookie("username", username, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          })
          .status(StatusCodes.SUCCESS)
          .send("Login Success");
      } else {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send(createTextMessage("Wrong Password"));
      }
    } else {
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
  req.session.username = "";
  return res
    .cookie("username", "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    .status(StatusCodes.SUCCESS)
    .send("Cleared Cookie");
});

module.exports = router;
