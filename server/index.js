const colyseus = require("colyseus");
const DefaultRoom = require('./rooms/defaultRoom.js')
const http = require("http");
const express = require('express');
var path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '/../client')));
const gameServer = new colyseus.Server({
  server: http.createServer(app)
});
gameServer.register("default", DefaultRoom);

gameServer.listen(2657);
