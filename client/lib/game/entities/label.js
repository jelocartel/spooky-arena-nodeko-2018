ig.module(
    'game.entities.label'
)
    .requires(
        'plugins.twopointfive.entity',
    )
    .defines(function () {

        EntityLabel = tpf.Entity.extend({
            size: { x: 1, y: 1 },
            vpos: 128,

            dynamicLight: true,
            _wmBoxColor: '#55ff00',

            init: function (x, y, settings) {
                this.animSheet = new ig.AnimationSheet(ig.game.labels[settings.enemyId], 128, 32);
                this.parent(x, y, settings);
                this.addAnim('idle', 10, [0]);
            },

            update: function () {
                this.parent();
            }
        });

    });
