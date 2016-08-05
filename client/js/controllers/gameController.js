import EventBus from '../eventBus.js';
import PlayerModel from '../models/player.js';
import series from 'async-series';
import _ from 'underscore';

let GameController = {
	initialize() {
		EventBus.on('gameStart', this.gameStart.bind(this));
		EventBus.on('roundEnd', this.resolveEvents.bind(this));
		EventBus.on('myId', (id) => {
			this.myId = id;
		});
		return this;
	},
	gameStart(gameState) {
		this.setGameState(gameState);
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
		const opposing = event.trainer === this.getMyself().get('id') ? "" : "Enemy ";
		switch (event.type) {
			case 'POKEMON_USED_MOVE':
				viewActions.push({
					type: 'SHOW_TEXT',
					text: opposing + event.pokemon + ' used ' + event.move + '!',
					trainer: event.trainer
				});
				viewActions.push({
					type: 'BLINK_POKEMON',
					trainer: this.getOpponentOf(event.trainer),
					damage: event.damage
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
					trainer: this.getTrainer(event.trainer)
				})
				viewActions.push({
					type: 'SHOW_TEXT',
					text: opposing + event.pokemon + ' fainted!'
				})
				break;
			case 'CHANGED_POKEMON':
				viewActions.push({
					type: 'SHOW_TEXT',
					text: event.previousPokemon + ', enough! Come back!'
				});
				viewActions.push({
					type: 'CALL_BACK_POKEMON',
					trainer: this.getTrainer(event.trainer)
				});
				viewActions.push({
					type: 'SHOW_TEXT',
					text: 'Go! ' + event.newPokemon + '!'
				});
				viewActions.push({
					type: 'SUMMON_POKEMON',
					trainer: this.getTrainer(event.trainer),
					newPokemon: event.newPokemon
				});
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
	},
	getTrainer(id) {
		return this.players.find(player => player.get('id') === id);
	}
}

export default GameController;
