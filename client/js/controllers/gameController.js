import EventBus from '../eventBus.js';
import PlayerModel from '../models/player.js';

let GameController = {
	initialize() {
		EventBus.on('gameStart', this.setGameState.bind(this));
	},
	setGameState(gameState) {
		if (!this.players) {
			this.players = gameState.map(player => new PlayerModel(player));
			console.log(this.players);
		} else {
			this.players.forEach(existingPlayer => {
				const newGameState = gameState.find(newPlayer => newPlayer.id === existingPlayer.id);
				existingPlayer.update(newGameState);
			});
		}
	}
}

export default GameController;
