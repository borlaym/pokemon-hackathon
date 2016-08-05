'use strict';

module.exports =  class Player {
	constructor(socket) {
		this.events = {
			addName: 'addName'
		};
		this.socket = socket;
		Object.keys(this.events).forEach(key => {
			this.socket.on(key, this[this.events[key]].bind(this));
		});
	}
	addName(name) {
		this.name = name;
	}
}
