const colyseus = require("colyseus");
// const Client = colyseus.Client;
const Room = colyseus.Room;


class DefaultRoom extends Room {
  // When room is initialized
  onInit (options) {
    this.setState({
      players: {},
    });
  }

  // When client successfully join the room
  onJoin (client) {
    this.state.players[ client.sessionId ] = {
      x: 0,
      y: 0,
    };
  }

  // When a client leaves the room
  onLeave (client) {
    delete this.state.players[ client.sessionId ];
  }

  // When a client sends a message
  onMessage (client, data) {
      this.state.players[ client.sessionId ] = data;
  }


}

module.exports = DefaultRoom;
