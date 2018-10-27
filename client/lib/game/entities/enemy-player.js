ig.module(
    'game.entities.enemy-player'
)
    .requires(
        'plugins.twopointfive.entity',
        'game.entities.particle'
    )
    .defines(function () {
        EntityEnemyPlayer = tpf.Entity.extend({
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.ACTIVE,

            size: { x: 16, y: 16 },
            friction: { x: 100, y: 100 },
            scale: 0.5,

            health: 10,
            damage: 10,

            dynamicLight: true,
            _wmBoxColor: '#ff0000',

            angle: 0,
            speed: 80,
            injump: false,

            didHurtPlayer: false,
            seenPlayer: false,


            animSheet: new ig.AnimationSheet('media/blob.png', 64, 64),

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                var crawFrameTime = 0.04 + Math.random() * 0.02;

                this.addAnim('crawl', 0.04, [0, 1, 2, 3, 4, 5, 4, 3, 2, 1]);
                // this.currentAnim.gotoRandomFrame();

                // this.hurtTimer = new ig.Timer();
            },


            update: function () {
                // this.angle = this.angleTo(ig.game.player);

                // this.vel.x = Math.cos(this.angle) * this.speed;
                // this.vel.y = Math.sin(this.angle) * this.speed;

                // if (ig.game.dead) {
                //     // Move away from the player if he's dead
                //     this.vel.x *= -1;
                //     this.vel.y *= -1;
                // }

                this.parent();
            },

            // kill: function () {
            //     var cx = this.pos.x + this.size.x / 2;
            //     var cy = this.pos.y + this.size.y / 2;
            //     for (var i = 0; i < 20; i++) {
            //         ig.game.spawnEntity(EntityEnemyBlobGib, cx, cy);
            //     }
            //     ig.game.blobKillCount++;
            //     this.parent();
            // },

            // check: function (other) {
            //     if (this.hurtTimer.delta() < 0) {
            //         // Player already hurt during this attack move?
            //         return;
            //     }

            //     // Only hurt the player once a second
            //     this.hurtTimer.set(1);


            //     this.vel.x = -this.vel.x;
            //     this.vel.y = -this.vel.y;
            //     other.receiveDamage(this.damage, this);
            // }
        });
    });