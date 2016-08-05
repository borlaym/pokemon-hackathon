'use strict';

let Pokemon = require('./pokemon.js');

module.exports = class Player {
	constructor(socket) {
		this.events = {
			addName: 'addName'
		};
		this.socket = socket;
		this.socket.player = this;
		Object.keys(this.events).forEach(key => {
			this.socket.on(key, this[this.events[key]].bind(this));
		});
		this.pokemons = [Pokemon.Bulbasaur, Pokemon.Charmander, Pokemon.Squirtle, Pokemon.Pickachu, Pokemon.Pidgey, Pokemon.Rattata]
	}
	addName(name) {
		this.name = name;
	}
	serialize() {
		return {
			name: this.name,
			pokemons: this.pokemons.map(pokemon => pokemon.serialize())
		}
	}
}
