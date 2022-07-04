const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const WebSocket = require("ws");
const ShareDB = require("sharedb");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const http = require("http");
const richText = require("rich-text");
const mongoose = require("mongoose");
const sharedbMongo = require("sharedb-mongo");

const roomRoutes = require("./routes/room");

const db = sharedbMongo(process.env.MONGO_CONN_STR);
ShareDB.types.register(richText.type);
var backend = new ShareDB({ db });
createDoc(startServer);

const cookie = require("cookie");
const session = require("express-session");

// Create initial document then fire callback
function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get("code", "rich-text");
  doc.fetch((err) => {
    if (err) throw err;
    console.log(doc.type);
    if (doc.type === null) {
      // insert dummy element to initilize shardb
      doc.create([{ insert: "Hi!" }], "rich-text", callback);
      return;
    }
    callback();
  });
}

function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  const app = express();
  const server = http.createServer(app);

  // body parser
  app.use(
    session({
      secret: "please change this secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        sameSite: true,
        httpOnly: true,
      },
    })
  );
  app.use(cors());
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    req.username = req.session.username ? req.session.username : "test";
    console.log("HTTP request", req.username, req.method, req.url, req.body);
    next();
  });
  app.use(function (req, res, next) {
    if (!req.username) return res.status(401).json({ err: "access denied" });
    next();
  });

  // app routes
  app.use("/api/rooms", roomRoutes);

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
      console.log("connect successfully to mongo");
    })
    .catch((err) => {
      console.log(err);
    });

  const PORT = process.env.PORT || 8080;

  server.listen(8080);
  console.log("Listening on http://localhost:" + PORT);
}
