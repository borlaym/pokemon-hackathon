import io from 'socket.io-client';
import EventBus from '../eventBus.js';

let ServerController = {
	events: {
		gameStart: 'gameStart',
		roundEnd: 'roundEnd'
	},
	initialize() {
		EventBus.on('connect', this.connect.bind(this));
		EventBus.on('action', type => this.connection.emit('action', type));
	},
	connect(userName) {
		this.connection = io('http://localhost:3001');
		this.connection.emit('addName', userName);

		Object.keys(this.events).forEach(key => {
			this.connection.on(key, this[this.events[key]].bind(this))
		});
	},
	gameStart() {
		EventBus.trigger('gameStart');
	},
	roundEnd(results) {
		console.log(results);
	}
}

export default ServerController;
