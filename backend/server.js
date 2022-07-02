const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const WebSocket = require("ws");
const ShareDB = require("sharedb");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const http = require("http");
const richText = require("rich-text");
const mongoose = require("mongoose");
const sharedbMongo = require("sharedb-mongo");
const cors = require("cors");

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
  app.use(cors());

  // body parser
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
  });

  // app routes
  app.use("/api/room", roomRoutes);

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
