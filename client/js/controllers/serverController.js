import io from 'socket.io-client';
import EventBus from '../eventBus.js';

let ServerController = {
	events: {
		gameStart: 'gameStart',
		roundEnd: 'roundEnd',
		myId: 'myId'
	},
	initialize() {
		EventBus.on('connect', this.connect.bind(this));
		EventBus.on('command', payload => this.connection.emit('command', payload));
	},
	connect(userName) {
		this.connection = io('http://localhost:3001');
		this.connection.emit('addName', userName);

		Object.keys(this.events).forEach(key => {
			this.connection.on(key, this[this.events[key]].bind(this))
		});
	},
	gameStart(gameState) {
		EventBus.trigger('gameStart', gameState);
	},
	roundEnd(results) {
		EventBus.trigger('roundEnd', results);
	},
	myId(id) {
		EventBus.trigger('myId', id);
	}
}

export default ServerController;
