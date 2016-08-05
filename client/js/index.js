import io from 'socket.io-client';
import ViewController from './controllers/ViewController.js';
import $ from 'jquery';

ViewController.start();

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
