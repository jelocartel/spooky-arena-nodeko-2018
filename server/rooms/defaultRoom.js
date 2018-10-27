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
      kills: 0,
      x: 0,
      y: 0,
    };
  }

  // When a client leaves the room
  onLeave (client) {
    delete this.state.players[ client.sessionId ];
    this.broadcast({
      type: 'left',
      data: {
        id: client.sessionId
      }
    })
  }

  // When a client sends a message
  onMessage (client, data) {
     if ( data.type === 'position') {
      this.state.players[ client.sessionId ].x = data.data.x;
      this.state.players[ client.sessionId ].y = data.data.y;
     } else if (data.type === 'shoot') {
       data.shooter = client.sessionId;
       this.broadcast(data);
     } else if (data.type === 'killed') {
      this.state.players[ client.sessionId ].kills++;
      data.data.killerId = client.sessionId;
      this.broadcast(data);
    }

  }


}

module.exports = DefaultRoom;
