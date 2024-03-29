ig.module(
	'game.title'
)
.requires(
	'plugins.twopointfive.font',
	'plugins.twopointfive.world.tile'
)
.defines(function(){

MyTitle = ig.Class.extend({
	camera: null,
	fadeScreen: null,

	width: 640,
	height: 480,

	font: new tpf.Font( 'media/fredoka-one.font.png' ),

	titleImage: new ig.Image( 'media/title.png' ),
	title: null,
	background: null,
	timer: null,

	init: function() {
		// Create the tile for the title image
		this.title = new tpf.HudTile( this.titleImage, 0, this.titleImage.width, this.titleImage.height);
		this.title.setPosition(0, 64);

		// Create an empty quad with a dark blue color as the background
		this.background = new tpf.Quad(this.width, this.height);
		this.background.setPosition(this.width/2, this.height/2,0)
		this.background.setColor({r:0, g:0, b:0});


		this.camera = new tpf.OrthoCamera(this.width, this.height);
		this.timer = new ig.Timer();
		// Object.entries(ig.game.enemies || {}).forEach((enemy) => {
		// 	enemy[1].kill();
		// });

		// ig.game.enemies = {};
	},

	update: function() {
		if( ig.input.released('shoot') || ig.input.released('click') ) {
			ig.game.setGame();
			const nameInput = ig.$('#name-input');
			ig.game.network.room.send({
				type: 'name',
				data: {
					name: nameInput.value ? nameInput.value.replace(/[^\x00-\x7F]/gi, '') : ig.game.myId
				}
			});
			ig.$('#name-input-panel').style.display = 'none';
		}
	},

	draw: function() {
		ig.system.renderer.setCamera(this.camera);
		ig.system.renderer.pushQuad(this.background);
		this.title.draw();

		var message = ig.ua.mobile
			? 'Tap to Start'
			: 'Click to Start';
		var alpha = (Math.sin(this.timer.delta()*4)+1)*0.5;
		this.font.draw(message, this.width/2, 350, ig.Font.ALIGN.CENTER, alpha);
	}
});

});
