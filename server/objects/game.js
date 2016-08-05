'use strict';

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
		this.broadcast('gameStart');
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

	}
	resolveCommands() {
		let events = []; // This will be the event queue sent to all clients
		// First come all pokemon change events
		const changePokemonCommands = this.commands.filter(command => command.type === 'CHANGE_POKEMON');
		events = events.concat(changePokemonCommands.map(event => createEventsFromCommand(event)));
		// Then resolve attack events on order of SPD of the active pokemon
		let attackCommands = this.commands.filter(command => command.type === 'ATTACK');
		attackCommands = attackCommands.sort((commandA, commandB) => {
			// Get the SPD of the active pokemon of the player giving the command
			const SPDA = commandA.player.getActivePokemon().getSPD();
			const SPDB = commandB.player.getActivePokemon().getSPD();
			return SPDB - SPDA;
		});
		events = events.concat(attackEvents.map(event => createEventsFromCommand(event)));
		this.broadcast('roundEnd', {
			events,
			players: this.players.map(player => player.serialize())
		})
		this.commands = [];
	}
}

module.exports = Game;
