ig.module(
    'game.entities.web'
)
    .requires(
        'plugins.twopointfive.entity',
    )
    .defines(function () {
        EntityWeb = tpf.Entity.extend({
            checkAgainst: ig.Entity.TYPE.NONE,

            size: { x: 128, y: 128 },
            scale: 0.5,

            dynamicLight: true,
            _wmBoxColor: '#ff0000',

            angle: 0,
            rotateToView: false,


            animSheet: new ig.AnimationSheet('media/web.png', 128, 128),

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 10, [0]);
            }
        });
    });
