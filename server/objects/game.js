'use strict';

class Game {
	constructor(players) {
		this.id = Math.floor(Math.random() * 900000);
		this.players = players;
		this.players.forEach(socket => socket.join(this.id));
		this.broadcast('gameStart', {});
		this.on('msg', this.foo.bind(this));
	}
	broadcast(name, payload) {
		this.players.forEach(socket => socket.emit(name, payload));
	}
	on(name, callback) {
		this.players.forEach(socket => socket.on(name, callback));
	}
	foo(payload) {
		if (this.partialMsg) {
			this.broadcast('returnMsg', payload + this.partialMsg);
			this.partialMsg = null;
		} else {
			this.partialMsg = payload;
		}
	}
}

module.exports = Game;
