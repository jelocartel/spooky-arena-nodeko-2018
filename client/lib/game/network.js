ig.module(
    'game.network'
)
.requires(
    'game.weapons.grenade-launcher'
)
.defines(function () {

    const WS_URL = window.location.href.replace(/^http\:\/\//,'ws://').replace(/^https\:\/\//,'wss://').replace(/\/$/, '');
    console.log(WS_URL);
    Network = ig.Class.extend({
        serverURL: WS_URL,
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
                    ig.game.hud.KillText('Player ' + change.path.id + ' joined!');

                } else if (change.operation === "remove") {
                    console.log("player has been removed from the state");
                    console.log("player id:", change.path.id);
                    ig.game.hud.KillText('Player ' + change.path.id + ' left game!');
                }
            });

            this.room.onJoin.add((e) => {
                console.log('join', {e});
            });

            this.room.onStateChange.add((state) => {
                // console.log({state});
                this.moveAction(state);
            });
            this.room.onMessage.add((message) => {
                if (message.type === 'shoot') {
                    if (message.shooter !== ig.game.player.enemyId) {
                        ig.game.spawnEntity(EntityGrenade, message.data.x, message.data.y, {angle: message.data.angle, shooterId: message.shooter} );
                    }
                } else if (message.type === 'killed') {
                    if(ig.game.player.enemyId === message.data.id) {
                        ig.game.player.kill();
                    } else {
                        ig.game.enemies[message.data.id].kill();
                        delete ig.game.enemies[message.data.id];
                    }
                    this.showKill(message.data);
                } else if (message.type === 'left') {
                    ig.game.enemies[message.data.id].kill();
                    delete ig.game.enemies[message.data.id];
                }
              });

        },

        moveAction() {},
        showKill(data) {
            ig.game.hud.KillText(data.id + ' kills ' + data.killerId);
        },
    });

});
