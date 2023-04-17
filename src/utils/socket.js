const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const SOCKETPORT = process.env.SOCKETPORT || 3000;

function initializeSocket() {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'index.html'));
  });

  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("chat message", (msg) => {
      console.log(msg);
      socket.broadcast.emit("chat message", msg);
    });
  });

  server.listen(SOCKETPORT, () => {
    console.log(`listening on ${SOCKETPORT}`);
  });
}

module.exports = { initializeSocket };