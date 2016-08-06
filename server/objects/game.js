'use strict';

const Moves = require('./moves.js');
const _ = require('underscore');
const Types = require('./types.js');

/**
 * Resolve type strength
 * first key is the attack move's type
 * second key is the defender's type
 * @type {Object}
 */
const typeResolver = {
	'NORMAL': { 'NORMAL': 1, 'FIRE': 1, 'GRASS': 1, 'WATER': 1, 'ELECTRIC': 1, 'FLYING': 1},
	'FIRE': { 'NORMAL': 1, 'FIRE': 0.5, 'GRASS': 2, 'WATER': 0.5, 'ELECTRIC': 1, 'FLYING': 1},
	'GRASS': { 'NORMAL': 1, 'FIRE': 0.5, 'GRASS': 0.5, 'WATER': 2, 'ELECTRIC': 1, 'FLYING': 0.5},
	'WATER': { 'NORMAL': 1, 'FIRE': 2, 'GRASS': 0.5, 'WATER': 0.5, 'ELECTRIC': 1, 'FLYING': 1},
	'ELECTRIC': { 'NORMAL': 1, 'FIRE': 1, 'GRASS': 0.5, 'WATER': 2, 'ELECTRIC': 0.5, 'FLYING': 2},
	'FLYING': { 'NORMAL': 1, 'FIRE': 1, 'GRASS': 2, 'WATER': 1, 'ELECTRIC': 0.5, 'FLYING': 1},
	'ICE': { 'NORMAL': 1, 'FIRE': 0.5, 'GRASS': 2, 'WATER': 0.5, 'ELECTRIC': 1, 'FLYING': 2},
	'POISON': { 'NORMAL': 1, 'FIRE': 1, 'GRASS': 2, 'WATER': 1, 'ELECTRIC': 1, 'FLYING': 1},
};

/**
 * This class holds the players of a single game as well as current game states
 * Resolves turns
 */
class Game {
	constructor(players) {
		this.id = Math.floor(Math.random() * 900000);
		this.players = players;
		this.players.map(player => player.socket).forEach(socket => socket.join(this.id));
		this.events = {
			'command': 'onCommand'
		};
		Object.keys(this.events).forEach(key => {
			this.on(key, this[this.events[key]].bind(this));
		});
		// Send initial game state
		this.broadcast('gameStart', this.players.map(player => player.serialize()));
		this.commands = []; // commands of the current turn
	}
	broadcast(name, payload) {
		this.players.map(player => player.socket).forEach(socket => socket.emit(name, payload));
	}
	on(name, callback) {
		this.players.map(player => player.socket).forEach(socket => {
			socket.on(name, param => {
				callback(param, socket.player);
			});
		})
	}
	serialize() {
		return {
			players: this.players.map(player => player.serialize())
		}
	}
	/**
	 * Whenever a command arrives from one of the participating players, do one of two things
	 * If it is the first one, wait for the second
	 * If it is the second one, resolve the turn
	 */
	onCommand(payload, player) {
		this.commands.push(Object.assign({}, payload, {
			player
		}));
		if (this.commands.length === 2) {
			this.resolveCommands();
		}
	}
	/**
	 * Resolve the current turn, creating events to be sent to the clients
	 * This function determines what order the commands will be executed in
	 */
	resolveCommands() {
		let events = []; // This will be the event queue sent to all clients
		// First come all pokemon change events
		const changePokemonCommands = this.commands.filter(command => command.type === 'CHANGE_POKEMON');
		events = events.concat(changePokemonCommands.map(event => this.createEventsFromCommand(event)));
		// Then resolve attack events on order of SPD of the active pokemon
		let attackCommands = this.commands.filter(command => command.type === 'ATTACK');
		attackCommands = attackCommands.sort((commandA, commandB) => {
			const moveA = Moves[commandA.move.replace(' ', '_')]
			const moveB = Moves[commandB.move.replace(' ', '_')]
			// Get the SPD of the active pokemon of the player giving the command
			const SPDA = commandA.player.getActivePokemon().getSPD() + moveA.SPDModifier;
			const SPDB = commandB.player.getActivePokemon().getSPD() + moveB.SPDModifier;
			return SPDB - SPDA;
		});
		events = events.concat(attackCommands.map(event => this.createEventsFromCommand(event)));
		events = _.flatten(events);
		this.broadcast('roundEnd', {
			events,
			players: this.players.map(player => player.serialize())
		})
		this.commands = [];
	}
	/**
	 * Create resolve events from the players' commands
	 */
	createEventsFromCommand(command) {
		switch (command.type) {
			case 'ATTACK':
				return this.handleAttackCommand(command);
			case 'CHANGE_POKEMON':
				return this.handleChangePokemonCommand(command);
		}
	}
	/**
	 * Handle one of the command types, attack
	 */
	handleAttackCommand(command) {
		let events = [];
		const actingPlayer = this.players.find(player => player.socket === command.player.socket);
		const opposingPlayer = this.players.find(player => player.socket !== command.player.socket);
		const actingPokemon = actingPlayer.getActivePokemon();
		const opposingPokemon = opposingPlayer.getActivePokemon();
		if (actingPokemon.getCurrentHP() < 1) {
			return events;
		}
		const move = Moves[command.move.replace(' ', '_')]
		const attackingPokemon = actingPokemon;
		const defendingPokemon = opposingPokemon;
		const hitChance = move.accuracy * (attackingPokemon.getAccuracy() / defendingPokemon.getEvasion());
		const isHit = Math.random() < hitChance;
		if (!isHit) {
			events.push({
				type: 'POKEMON_USED_MOVE',
				pokemon: attackingPokemon.name,
				move: move.name,
				trainer: actingPlayer.socket.id,
				category: 'DAMAGE',
				missed: true
			});
			return events;
		}
		if (move.category === 'DAMAGE') {
			return events.concat(this.handleDamagingCommand(command));
		} else {
			return events.concat(this.handleStatChangingMove(command));
		}
		return events;
	}
	/**
	 * Handle a command that is a damaging move
	 */
	handleDamagingCommand(command) {
		let events = [];
		const actingPlayer = this.players.find(player => player.socket === command.player.socket);
		const opposingPlayer = this.players.find(player => player.socket !== command.player.socket);
		const actingPokemon = actingPlayer.getActivePokemon();
		const opposingPokemon = opposingPlayer.getActivePokemon();
		const move = Moves[command.move.replace(' ', '_')]
		const attackingPokemon = actingPokemon;
		const defendingPokemon = opposingPokemon;
		const ATK = move.attribute === 'SPATK' ? attackingPokemon.getSPATK() : attackingPokemon.getATK();
		const DEF = move.attribute === 'SPATK' ? defendingPokemon.getSPDEF() : defendingPokemon.getDEF();
		const baseDamage = (50/250) * (ATK/DEF) * move.power + 2;
		const typeModifier = typeResolver[move.type][defendingPokemon.type];
		const STAB = move.type === attackingPokemon.type ? 1.5 : 1;
		const finalDamage = Math.floor(baseDamage * STAB * typeModifier);
		defendingPokemon.decreaseHP(finalDamage);
		events.push({
			type: 'POKEMON_USED_MOVE',
			pokemon: attackingPokemon.name,
			damage: finalDamage,
			move: move.name,
			superEffective: typeModifier === 2 ? true : false,
			notEffective: typeModifier === 0.5 ? true : false,
			trainer: actingPlayer.socket.id,
			category: 'DAMAGE'
		});
		if (defendingPokemon.getCurrentHP() < 1) {
			events.push({
				type: 'POKEMON_FAINTED',
				pokemon: defendingPokemon.name,
				trainer: opposingPlayer.socket.id
			});
		}
		return events;
	}
	/**
	 * Handle a command that modifies the stats of a pokemon
	 */
	handleStatChangingMove(command) {
		let events = [];
		const actingPlayer = this.players.find(player => player.socket === command.player.socket);
		const opposingPlayer = this.players.find(player => player.socket !== command.player.socket);
		const actingPokemon = actingPlayer.getActivePokemon();
		const opposingPokemon = opposingPlayer.getActivePokemon();
		const attackingPokemon = actingPokemon;
		const defendingPokemon = opposingPokemon;
		const move = Moves[command.move.replace(' ', '_')]
		const targetPokemon = move.target === 'opponent' ? defendingPokemon : attackingPokemon;
		const variableName = move.attribute + 'Modifier'
		targetPokemon.variables[variableName] += move.modifier;
		if (targetPokemon.variables[variableName] < -6) {
			targetPokemon.variables[variableName] = -6;
		}
		if (targetPokemon.variables[variableName] > 6) {
			targetPokemon.variables[variableName] = 6;
		}
		events.push({
			type: 'POKEMON_USED_MOVE',
			category: 'MODIFIER',
			pokemon: attackingPokemon.name,
			trainer: actingPlayer.socket.id,
			targetTrainer: opposingPlayer.socket.id,
			move: move
		});
		return events;
	}
	/**
	 * Handle the other command type, changing the current pokemon
	 */
	handleChangePokemonCommand(command) {
		let events = [];
		const actingPlayer = this.players.find(player => player.socket === command.player.socket);
		const opposingPlayer = this.players.find(player => player.socket !== command.player.socket);
		const actingPokemon = actingPlayer.getActivePokemon();
		const opposingPokemon = opposingPlayer.getActivePokemon();
		const previousPokemon = actingPlayer.getActivePokemon();
		const pokemon = actingPlayer.pokemon.find(pokemon => pokemon.name === command.name);
		actingPlayer.currentPokemon = actingPlayer.pokemon.indexOf(pokemon);
		events.push({
			type: 'CHANGED_POKEMON',
			previousPokemon: previousPokemon.name,
			newPokemon: pokemon.name,
			trainer: actingPlayer.socket.id
		});
		return events;
	}
}

module.exports = Game;
