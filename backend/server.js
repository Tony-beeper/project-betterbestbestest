const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, `.env.${process.env.NODE_ENV}`) });
const userRoute = require("./routes/user.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chalk = require("chalk");
const session = require("express-session");
const isAuthenticated = require("./middlewares/validateUser");
const WebSocket = require("ws");
const ShareDB = require("sharedb");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const http = require("http");
const richText = require("rich-text");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
console.log(process.env.NODE_ENV);
const sharedbMongo = require("sharedb-mongo");

const roomRoutes = require("./routes/room");
const pistonRoutes = require("./routes/piston");
const githubRoutes = require("./routes/github");

const db = sharedbMongo(process.env.MONGO_CONN_STR);
ShareDB.types.register(richText.type);
var backend = new ShareDB({
  db,
  presence: true,
  doNotForwardSendPresenceErrorsToClient: true,
});
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

function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  const app = express();
  const server = http.createServer(app);

  const corConfig = { origin: true, credentials: true };
  if (process.env.NODE_ENV === "dev") {
    app.use(
      cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      })
    );
    app.options("*", cors(corConfig));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // cookie flags are added by nginx
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use(function (req, res, next) {
    req.username = req.session.username ? req.session.username : "";
    console.log("HTTP request", req.username, req.method, req.url, req.body);
    next();
  });
  // app routes

  app.use("/api/user", userRoute);
  app.use("/api/rooms", isAuthenticated, roomRoutes);
  app.use("/api/piston", isAuthenticated, pistonRoutes);
  app.use("/api/github", isAuthenticated, githubRoutes);

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
