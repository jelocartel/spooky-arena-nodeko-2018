const colyseus = require("colyseus");
const DefaultRoom = require('./rooms/defaultRoom.js')
const http = require("http");

const gameServer = new colyseus.Server({
  server: http.createServer()
});
gameServer.register("default", DefaultRoom);

gameServer.listen(2657);
