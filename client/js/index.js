import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import io from 'socket.io-client';

let connection = io('http://localhost:3001');

connection.on('connect', () => {
	console.log('connect');
});
connection.on('Game start', () => {
 var btn = document.createElement('button');
 btn.addEventListener('click', () => {
	 	connection.emit('msg', window.prompt())
 })
 document.body.appendChild(btn);

})
connection.on('returnMsg', (msg) => {
	alert(msg);
})

ReactDOM.render(<App />, document.getElementById('main'));
