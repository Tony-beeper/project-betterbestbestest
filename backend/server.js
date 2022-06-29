const express = require("express");
require("dotenv").config();

const WebSocket = require("ws");
const ShareDB = require("sharedb");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const http = require("http");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server: server });

const backend = new ShareDB();

const { MongoClient, ServerApiVersion } = require("mongodb");

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

webSocketServer.on("connection", (webSocket) => {
  const stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

server.listen(8080);
