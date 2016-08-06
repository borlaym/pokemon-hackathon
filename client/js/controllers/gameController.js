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
			///////// POKEMON USED MOVE
			case 'POKEMON_USED_MOVE':
				/////// DAMAGING MOVES
				if (event.category === 'DAMAGE') {
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
					if (event.notEffective) {
						viewActions.push({
							type: 'SHOW_TEXT',
							text: 'It\'s not very effective...',
							trainer: event.trainer
						})
					}
				} else {
				/////// STAT CHANGING MOVES
					viewActions.push({
						type: 'SHOW_TEXT',
						text: opposing + event.pokemon + ' used ' + event.move.name + '!',
						trainer: event.trainer
					});
					viewActions.push({
						type: 'SHAKE_POKEMON',
						trainer: this.getOpponentOf(event.trainer)
					});
					const direction = event.move.modifier > 0 ? 'rose' : 'fell';
					let stat;
					switch (event.move.attribute) {
						case 'ATK':
							stat = 'ATTACK';
							break;
						case 'DEF':
							stat = 'DEFENSE';
							break;
						case 'SPATK':
							stat = 'SPECIAL ATTACK';
							break;
						case 'SPDEF':
							stat = 'SPECIAL DEFENSE';
							break;
						case 'SPD':
							stat = 'SPEED';
							break;
					}
					viewActions.push({
						type: 'SHOW_TEXT',
						text: opposing + event.target + '\'s ' + stat + ' ' + direction + '!',
						trainer: event.trainer
					});
				}
				break;
			//////// POKEMON FAINTED
			case 'POKEMON_FAINTED':
				viewActions.push({
					type: 'SHOW_TEXT',
					text: opposing + event.pokemon + ' fainted!'
				})
				// If my pokemon fainted, make the user change a pokemon
				if (this.getTrainer(event.trainer).get('id') === this.myId) {
					viewActions.push({
						type: 'CHOOSE_POKEMON',
					});
				} else {
					// Make me wait for the opponent
					viewActions.push({
						type: 'OPPONENT_CHOOSE_POKEMON',
					});
				}
				break;
			//// TRAINER CHANGED POKEMON
			case 'CHANGED_POKEMON':
				const trainer = this.getTrainer(event.trainer)
				const currentPokemon = trainer.getActivePokemon();
				if (currentPokemon.get('currentHP') !== 0) {
					viewActions.push({
						type: 'SHOW_TEXT',
						text: event.previousPokemon + ', enough! Come back!'
					});
					viewActions.push({
						type: 'CALL_BACK_POKEMON',
						trainer
					});
				}
				viewActions.push({
					type: 'SHOW_TEXT',
					text: 'Go! ' + event.newPokemon + '!'
				});
				viewActions.push({
					type: 'SUMMON_POKEMON',
					trainer,
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
