const StatusCodes = require("../utils/StatusCodes");
const { body, validationResult } = require("express-validator");

const express = require("express");
const router = express.Router();
const user = require("../models/user");
const Message = require("../utils/defaultMessages.js");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const client = new MongoClient(process.env.MONGO_CONN_STR);
const dbName = "user_db";
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post(
  "/signup",
  body("username")
    .notEmpty()
    .trim()
    .escape()
    .withMessage({ err: "Missing Username" }),
  body("password").notEmpty().isLength({ min: 8 }).trim().escape().withMessage({
    err: "Missing Password or Password Less than 8 Characters",
  }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(Message.createErrorMessage(err.errors[0].msg.err));
    }
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      if (err)
        return res
          .cookie("username", "", {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            hostOnly: false,
            httpOnly: false,
            sameSite: "none",
            secure: true,
          })
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(Message.createErrorMessage("Bcrypt Error"));
      const username = req.body.username;
      const password = hash;
      const newUser = new user({
        username: username,
        password: password,
      });
      try {
        await client.connect();
        const user_db = client.db(dbName);
        const user = user_db.collection("user");
        const result = await user.findOne({ username: username });
        if (result) {
          return res
            .cookie("username", "", {
              path: "/",
              sameSite: "none",
              secure: true,

              maxAge: 60 * 60 * 24 * 7,
            })
            .status(StatusCodes.CONFLICT)
            .send(Message.createErrorMessage("Username Taken"));
        } else {
          await user.insertOne(newUser);
          req.session.username = username;

          return res
            .cookie("username", username, {
              path: "/",
              sameSite: "none",
              secure: true,

              maxAge: 60 * 60 * 24 * 7,
            })
            .status(StatusCodes.SUCCESS)
            .send("Sign up success");
        }
      } catch (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(Message.createErrorMessage("Error saving user to database"));
      }
    });
  }
);

router.post(
  "/login",
  body("username")
    .notEmpty()
    .trim()
    .escape()
    .withMessage({ err: "Missing Username" }),
  body("password").notEmpty().trim().escape().withMessage({
    err: "Missing Password",
  }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(Message.createErrorMessage(err.errors[0].msg.err));
    }
    const username = req.body.username;
    const password = req.body.password;

    try {
      await client.connect();
      const user_db = client.db(dbName);
      const user = user_db.collection("user");
      const result = await user.findOne({ username: username });
      if (result) {
        const hash = result.password;
        bcrypt.compare(password, hash, function (err, comparisonResult) {
          if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(err);
          if (!comparisonResult)
            return res
              .status(StatusCodes.UNAUTHORIZED)
              .send(Message.createErrorMessage("Access Denied"));

          req.session.username = username;

          return res
            .cookie("username", username, {
              path: "/",
              sameSite: "none",
              secure: true,

              maxAge: 60 * 60 * 24 * 7,
            })
            .status(StatusCodes.SUCCESS)
            .send("Login Success");
        });
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(Message.createErrorMessage("User not found"));
      }
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Message.createErrorMessage("Error saving user to database"));
    }
  }
);

router.get("/signout/", function (req, res, next) {
  req.session.username = "";
  return res
    .cookie("username", "", {
      path: "/",
      sameSite: "none",
      secure: true,

      maxAge: 60 * 60 * 24 * 7,
    })
    .status(StatusCodes.SUCCESS)
    .send(Message.createTextMessage("Cookie Cleared"));
});

module.exports = router;
