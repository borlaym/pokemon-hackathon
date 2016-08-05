'use strict';

const Moves = require('./moves.js');
const _ = require('underscore');

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
		if (actingPokemon.getCurrentHP() < 1) {
			return [];
		}

		switch (command.type) {
			case 'ATTACK':
				const attackingPokemon = actingPokemon;
				const defendingPokemon = opposingPokemon;
				const move = Moves[command.move]
				const ATK = attackingPokemon.getATK();
				const DEF = defendingPokemon.getDEF();
				const baseDamage = (110/250) * (ATK/DEF) * move.power + 2;
				const finalDamage = Math.floor(baseDamage);
				defendingPokemon.decreaseHP(finalDamage);
				events.push({
					type: 'POKEMON_USED_MOVE',
					pokemon: attackingPokemon.name,
					move: move.name,
					superEffective: false,
					trainer: actingPlayer.socket.id
				});
				if (defendingPokemon.getCurrentHP() < 1) {
					events.push({
						type: 'POKEMON_FAINTED',
						pokemon: defendingPokemon.name,
						trainer: opposingPlayer.socket.id
					});
				}
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
