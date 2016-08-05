'use strict';

let resolver = {
	'kopapir': 1,
	'koollo': 0,
	'papirko': 0,
	'papirollo': 1,
	'ollopapir': 0,
	'olloko': 1
};

class Game {
	constructor(players) {
		this.id = Math.floor(Math.random() * 900000);
		this.players = players;
		this.players.map(player => player.socket).forEach(socket => socket.join(this.id));
		this.events = {
			'action': 'onAction'
		};
		Object.keys(this.events).forEach(key => {
			this.on(key, this[this.events[key]].bind(this));
		});
		this.broadcast('gameStart');
		this.actions = [];
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
	onAction(type, player) {
		this.actions.push({
			player,
			type
		});
		if (this.actions.length === 2) {
			this.resolveActions();
		}
	}
	resolveActions() {
		let winner = resolver[this.actions.map(action => action.type).join()];
		winner = actions[winner].serialize();
		this.broadcast('roundEnd', {
			actions: this.actions,
			winner
		});
		this.actions = [];
	}
}

module.exports = Game;
