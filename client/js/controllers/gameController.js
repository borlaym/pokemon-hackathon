import EventBus from '../eventBus.js';
import PlayerModel from '../models/player.js';
import series from 'async-series';
import _ from 'underscore';

let GameController = {
	initialize() {
		EventBus.on('gameStart', this.setGameState.bind(this));
		EventBus.on('roundEnd', this.resolveEvents.bind(this));
		EventBus.on('myId', (id) => {
			this.myId = id;
		});
	},
	setGameState(gameState) {
		if (!this.players) {
			this.players = gameState.map(player => new PlayerModel(player));
		} else {
			this.players.forEach(existingPlayer => {
				const newGameState = gameState.find(newPlayer => newPlayer.id === existingPlayer.id);
				existingPlayer.update(newGameState);
			});
		}
	},
	// Resolve the events sent by the server
	resolveEvents(data) {
		let viewActions = data.events.map(event => this.createViewActions(event));
		viewActions = _.flatten(viewActions);
		let asyncFunctions = viewActions.map(viewAction => {
			return (callback) => {
				EventBus.once('finishedAction', callback)
				EventBus.trigger('viewAction:' + viewAction.type, viewAction);
			};
		});
		series(asyncFunctions, () => {
			// For sanity, let's update our current game state to be in sync with the server
			this.setGameState(data.players)
		})
	},
	// Create view actions from events
	createViewActions(event) {
		let viewActions = [];
		const opposing = event.trainer === this.getMyself().get('id') ? "" : "Opposing ";
		switch (event.type) {
			case 'POKEMON_USED_MOVE':
				viewActions.push({
					type: 'SHOW_TEXT',
					text: opposing + event.pokemon + ' used ' + event.move + '!',
					trainer: event.trainer
				});
				viewActions.push({
					type: 'BLINK_POKEMON',
					trainer: this.getOpponentOf(event.trainer)
				});
				if (event.superEffective) {
					viewActions.push({
						type: 'SHOW_TEXT',
						text: 'It\'s super effective!',
						trainer: event.trainer
					})
				}
				break;
			case 'POKEMON_FAINTED':
				viewActions.push({
					type: 'FAINT_POKEMON',
					trainer: this.getOpponentOf(event.trainer)
				})
				viewActions.push({
					type: 'SHOW_TEXT',
					text: opposing + event.pokemon + ' fainted!'
				})
				break;
		}
		return viewActions;
	},
	getOpponent() {
		return this.players.find(player => player.get('id') !== this.myId);
	},
	getMyself() {
		return this.players.find(player => player.get('id') === this.myId);
	},
	getOpponentOf(id) {
		return this.players.find(player => player.get('id') !== id);
	}
}

export default GameController;
