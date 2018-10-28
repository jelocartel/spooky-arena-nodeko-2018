ig.module(
	'game.hud'
)
.requires(
	'plugins.twopointfive.hud'
)
.defines(function(){

MyHud = tpf.Hud.extend({

	font: new tpf.Font( 'media/fredoka-one.font.png' ),
	smallFont: new tpf.Font('media/small.png'),
	smallFont2: new tpf.Font('media/small2.png'),

	// healthIconImage: new ig.Image( 'media/health-icon.png' ),
	damageIndicatorImage: new ig.Image( 'media/hud-blood-low.png' ),
	// healthIcon: null,

	keys: [],

	showControlsTimer: null,

	init: function( width, height, showControls ) {
		this.parent(width, height);

		// this.healthIcon = new tpf.HudTile( this.healthIconImage, 0, 32, 32 );
		// this.healthIcon.setPosition( 96, this.height-this.healthIcon.tileHeight-4 );
	},

	draw: function( player, weapon ) {
		this.prepare();

		if( weapon ) {
			weapon.draw();

			if( weapon.ammoIcon ) {
				weapon.ammoIcon.setPosition(96, this.height - weapon.ammoIcon.tileHeight - 4);
				weapon.ammoIcon.draw();
				this.font.draw( weapon.ammo, 90, this.height - this.font.height + 1, ig.Font.ALIGN.RIGHT );
			}
		}

		// this.healthIcon.draw();
		// this.font.draw( player.health, 90, this.height - this.font.height + 1, ig.Font.ALIGN.RIGHT );

		this.font.draw( 'Kills: ' +ig.game.blobKillCount, 32, 8);
		
		this.smallFont2.draw( `Players: ${Object.keys(ig.game.enemies).length + 1} \nHIGHSCORE` , 620, 8, ig.Font.ALIGN.RIGHT);
		
		let results= '';
		if (ig.game.gameState) {
			let playerList = Object.keys(ig.game.gameState.players).sort((a, b) => {
				return ig.game.gameState.players[a].kills < ig.game.gameState.players[b].kills;
			});
			for (let i = 0; i <= 4 && i < playerList.length; i++) {
				results += `${ig.game.gameState.players[playerList[i]].name}: ${ig.game.gameState.players[playerList[i]].kills}\n`;
			}
			this.smallFont.draw( results , 620, 45, ig.Font.ALIGN.RIGHT);
		}

		for(var i=0;i<ig.game.gameLog.length;i++)
			this.smallFont.draw( ig.game.gameLog[i] , 640 ,this.height - (this.smallFont.height + 1) * (ig.game.gameLog.length - i), ig.Font.ALIGN.RIGHT);

		// Draw the current message (showMessage(text)) and the damage indicator
		this.drawDefault();
	},

	KillText(text) {
		ig.game.gameLog.push(text);
		if(ig.game.gameLog.length >1) ig.game.gameLog.shift();
	}
});


});
