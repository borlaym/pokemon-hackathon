'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let waitingPlayer;
let rooms = [];

io.on('connection', function(socket){
  if (waitingPlayer) {
		let newRoom = {
			id: Math.floor(Math.random() * 900000),
			players: [socket, waitingPlayer]
		};
		rooms.push(newRoom);
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
