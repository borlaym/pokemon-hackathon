'use strict';

module.exports =  class Player {
	constructor(socket) {
		this.socket = socket;
		this.socket.on('addName', name => this.name = name);
	}
	addName(name) {
		this.name = name;
	}
}
