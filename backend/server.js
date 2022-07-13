const dotenv = require("dotenv");
const userRoute = require("./routes/user.js");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const isAuthenticated = require("./middlewares/validateUser");
const WebSocket = require("ws");
const ShareDB = require("sharedb");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
// const http = require("http");
const https = require("https");
const fs = require("fs");

const richText = require("rich-text");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
dotenv.config();
const sharedbMongo = require("sharedb-mongo");

const roomRoutes = require("./routes/room");

const db = sharedbMongo(process.env.MONGO_CONN_STR);
ShareDB.types.register(richText.type);
var backend = new ShareDB({ db });
createDoc(startServer);

// Create initial document then fire callback
function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get("code", "rich-text");
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      // insert dummy element to initilize shardb
      doc.create([{ insert: "Hi!" }], "rich-text", callback);
      return;
    }
    callback();
  });
}
var privateKey = fs.readFileSync("server.key");
var certificate = fs.readFileSync("server.crt");
var config = {
  key: privateKey,
  cert: certificate,
};
function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  const app = express();
  const server = https.createServer(config, app);
  // app.use(express.json());
  // body parser
  const corConfig = { origin: true, credentials: true };
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
  app.options("*", cors(corConfig));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        path: "/",
        sameSite: "none",
        secure: true,
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
      },
    })
  );

  app.use(function (req, res, next) {
    req.username = req.session.username ? req.session.username : "";
    console.log("HTTP request", req.username, req.method, req.url, req.body);
    next();
  });
  app.use("/api/user", userRoute);
  app.use("/api/rooms", isAuthenticated, roomRoutes);

  // app.use(function (req, res, next) {
  //   if (!req.username) return res.status(401).json({ err: "access denied" });
  //   next();
  // });

  // app routes

  // Connect any incoming WebSocket connection to ShareDB
  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", function (ws) {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  // Mongoose connnection
  mongoose
    .connect(process.env.MONGO_CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("Connected successfully to mongo");
    })
    .catch((err) => {
      console.log(err);
    });

  const PORT = process.env.PORT || 8080;

  server.listen(PORT, () => {
    console.log(chalk.whiteBright(`Listening at http://localhost:${PORT}`));
  });
}
