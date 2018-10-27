ig.module(
    'game.network'
)
.requires(
)
.defines(function () {

    Network = ig.Class.extend({
        serverURL: 'ws://localhost:2657',
        roomName: 'default',


        init() {
            this.gameClient = new Colyseus.Client(this.serverURL);
            this.room = this.gameClient.join(this.roomName);
        },

        attachListeners() {

            ig.game.myId = this.room.sessionId;

            this.gameClient.onOpen.add(function (a) {
                console.log("connection is now open", a);
            });

            this.gameClient.onClose.add(function () {
                console.log("connection has been closed");
            });

            this.room.listen("players/:id", (change) => {
                if (change.operation === "add") {
                    console.log("new player added to the state");
                    console.log("player id:", change.path.id);
                    console.log("player data:", change.value);

                } else if (change.operation === "remove") {
                    console.log("player has been removed from the state");
                    console.log("player id:", change.path.id);
                }
            });

            this.room.onJoin.add((e) => {
                console.log('join', {e});
            });

            this.room.onStateChange.add((state) => {
                // console.log({state});
                this.moveAction(state);
            });
        },

        moveAction() {}
    });

});
