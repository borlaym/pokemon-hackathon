import io from 'socket.io-client';
import EventBus from '../eventBus.js';

let ServerController = {
	events: {
		gameStart: 'gameStart',
		action: 'action'
	},
	initialize() {
		EventBus.on('connect', this.connect.bind(this));
		EventBus.on('action', type => this.connection.emit('action', type));
	},
	connect(userName) {
		this.connection = io('http://localhost:3001');
		this.connection.emit('addName', userName);
		EventBus.trigger('connected');
		Object.keys(this.events).forEach(key => {
			this.connection.on(key, this[this.events[key]].bind(this))
		});
	}
}

export default ServerController;
