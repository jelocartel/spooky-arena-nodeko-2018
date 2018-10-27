ig.module(
    'game.network'
)
.requires(
    'game.weapons.grenade-launcher'
)
.defines(function () {

    Network = ig.Class.extend({
        // serverURL: 'ws://localhost:2657',
        serverURL: 'ws://192.168.2.66:2657',
        roomName: 'default',


        init() {
            this.gameClient = new Colyseus.Client(this.serverURL);
            this.room = this.gameClient.join(this.roomName);
        },

        attachListeners() {
            // Ik this isn't `enemyId`, but let's stay consistent
            ig.game.myId = ig.game.player.enemyId = this.room.sessionId;

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
            this.room.onMessage.add(function(message) {
                if (message.type === 'shoot') {
                    console.log("server just sent this message:");
                    console.log(message.data);
                    ig.game.spawnEntity(EntityGrenade, message.data.x, message.data.y, {angle: message.data.angle, shooterId: message.shooter} );
                }
              });

        },

        moveAction() {}
    });

});
