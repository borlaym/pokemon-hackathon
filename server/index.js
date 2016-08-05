'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let waitingPlayer;
let games = [];

let Game = require('./objects/game.js');
let Player = require('./objects/player.js');

io.on('connection', function(socket){
	let newPlayer = new Player(socket);
  if (waitingPlayer) {
		let newGame = new Game([waitingPlayer, socket]);
		games.push(newGame);
		waitingPlayer = null;
		console.log('created new room');
	} else {
		waitingPlayer = socket;
		console.log('waiting for other player');
	}
	socket.on('disconnect', () => {
		if (waitingPlayer === socket) {
			waitingPlayer = null;
		}
	})
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
