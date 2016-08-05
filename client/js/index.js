import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import io from 'socket.io-client';

let connection = io('http://localhost:3001');

connection.on('connect', (socket) => {
	console.log('connect');
});
connection.on('Gamestart', () => {
	alert('joined game')
})

ReactDOM.render(<App />, document.getElementById('main'));
