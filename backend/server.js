const express = require("express");
const WebSocket = require("ws");
const ShareDB = require("sharedb");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const http = require("http");

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server: server });

const backend = new ShareDB();
webSocketServer.on("connection", (webSocket) => {
  const stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

server.listen(8080);
