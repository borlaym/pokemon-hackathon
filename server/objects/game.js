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
};

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
		this.commands = [];
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
	onCommand(payload, player) {
		this.commands.push(Object.assign({}, payload, {
			player
		}));
		if (this.commands.length === 2) {
			this.resolveCommands();
		}
	}
	createEventsFromCommand(command) {
		const actingPlayer = this.players.find(player => player.socket === command.player.socket);
		const opposingPlayer = this.players.find(player => player.socket !== command.player.socket);
		const actingPokemon = actingPlayer.getActivePokemon();
		const opposingPokemon = opposingPlayer.getActivePokemon();
		let events = [];

		switch (command.type) {
			case 'ATTACK':
				if (actingPokemon.getCurrentHP() < 1) {
					break;;
				}
				const attackingPokemon = actingPokemon;
				const defendingPokemon = opposingPokemon;
				const move = Moves[command.move.replace(' ', '_')]
				const ATK = move.attribute === 'SPATK' ? attackingPokemon.getSPATK() : attackingPokemon.getATK();
				const DEF = move.attribute === 'SPATK' ? defendingPokemon.getSPDEF() : defendingPokemon.getDEF();
				const baseDamage = (70/250) * (ATK/DEF) * move.power + 2;
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
					trainer: actingPlayer.socket.id
				});
				if (defendingPokemon.getCurrentHP() < 1) {
					events.push({
						type: 'POKEMON_FAINTED',
						pokemon: defendingPokemon.name,
						trainer: opposingPlayer.socket.id
					});
				}
				break;
			case 'CHANGE_POKEMON':
				const previousPokemon = actingPlayer.getActivePokemon();
				const pokemon = actingPlayer.pokemon.find(pokemon => pokemon.name === command.name);
				actingPlayer.currentPokemon = actingPlayer.pokemon.indexOf(pokemon);
				events.push({
					type: 'CHANGED_POKEMON',
					previousPokemon: previousPokemon.name,
					newPokemon: pokemon.name,
					trainer: actingPlayer.socket.id
				});
				break;
		}

		return events;
	}
	resolveCommands() {
		let events = []; // This will be the event queue sent to all clients
		// First come all pokemon change events
		const changePokemonCommands = this.commands.filter(command => command.type === 'CHANGE_POKEMON');
		events = events.concat(changePokemonCommands.map(event => this.createEventsFromCommand(event)));
		// Then resolve attack events on order of SPD of the active pokemon
		let attackCommands = this.commands.filter(command => command.type === 'ATTACK');
		attackCommands = attackCommands.sort((commandA, commandB) => {
			// Get the SPD of the active pokemon of the player giving the command
			const SPDA = commandA.player.getActivePokemon().getSPD();
			const SPDB = commandB.player.getActivePokemon().getSPD();
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
}

module.exports = Game;
