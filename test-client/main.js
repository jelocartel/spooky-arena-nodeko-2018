const gameClient = new Colyseus.Client('ws://localhost:2657')

let room = gameClient.join("default");


gameClient.onOpen.add(function() {
  console.log("connection is now open");
});

gameClient.onClose.add(function() {
  console.log("connection has been closed");
});

room.listen("players/:id", (change) => {
  if (change.operation === "add") {
    console.log("new player added to the state");
    console.log("player id:", change.path.id);
    console.log("player data:", change.value);

  } else if (change.operation === "remove") {
    console.log("player has been removed from the state");
    console.log("player id:", change.path.id);
  }
});

room.onStateChange.add(function(state) {
  console.log("the room state has been updated:", state);
});
