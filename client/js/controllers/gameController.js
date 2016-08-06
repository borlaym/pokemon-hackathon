import EventBus from '../eventBus.js';
import PlayerModel from '../models/player.js';
import series from 'async-series';
import _ from 'underscore';
import ViewActionCreators from './viewActionCreators.js';

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
		return ViewActionCreators[event.type](event, this);
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
