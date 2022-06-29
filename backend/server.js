const express = require("express");
require("dotenv").config();

const WebSocket = require("ws");
const ShareDB = require("sharedb");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const http = require("http");
const richText = require("rich-text");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

ShareDB.types.register(richText.type);
var backend = new ShareDB({ presence: true });
createDoc(startServer);

// Create initial document then fire callback
function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get("code", "richtext");
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

function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  const app = express();
  const server = http.createServer(app);

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
