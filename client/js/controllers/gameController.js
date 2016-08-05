import EventBus from '../eventBus.js';
import PlayerModel from '../models/player.js';
import series from 'async-series';
import _ from 'underscore';

let GameController = {
	initialize() {
		EventBus.on('gameStart', this.setGameState.bind(this));
		EventBus.on('roundEnd', this.resolveEvents.bind(this));
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
		console.log('data', data);
		let viewActions = data.events.map(event => this.createViewActions(event));
		viewActions = _.flatten(viewActions);
		console.log('viewActions', viewActions);
		let asyncFunctions = viewActions.map(viewAction => {
			return (callback) => {
				EventBus.trigger('viewAction:' + viewAction.type, viewAction);
				EventBus.once('finishedAction', callback)
			};
		});
		series(asyncFunctions, () => {
			// For sanity, let's update our current game state to be in sync with the server
			this.setGameState(data.players)
		})
	},
	// Create view actions from events
	createViewActions(event) {
		console.log(event.type);
		let viewActions = [];
		switch (event.type) {
			case 'POKEMON_USED_MOVE':
				console.log('ITS A USE MOVE');
				viewActions.push({
					type: 'SHOW_TEXT',
					text: event.pokemon + ' used ' + event.move + '!'
				});
				viewActions.push({
					type: 'BLINK_POKEMON'
				});
				if (event.superEffective) {
					viewActions.push({
						type: 'SHOW_TEXT',
						text: 'It\'s super effective!'
					})
				}
				break;
			case 'POKEMON_FAINTED':
				viewActions.push({
					type: 'FAINT_POKEMON'
				})
				viewActions.push({
					type: 'SHOW_TEXT',
					text: event.pokemon + ' fainted!'
				})
				break;
		}
		return viewActions;
	}
}

export default GameController;
