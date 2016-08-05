import io from 'socket.io-client';
import EventBus from '../eventBus.js';

let ServerController = {
	events: {
		gameStart: 'gameStart'
	},
	initialize() {
		EventBus.on('connect', this.connect.bind(this));
	},
	connect(userName) {
		this.connection = io('http://localhost:3001');
		this.connection.emit('addName', userName);
		Object.keys(this.events).forEach(key => {
			this.connection.on(key, this[this.events[key]].bind(this))
		});
	},
	gameStart() {
	}
}

export default ServerController;
