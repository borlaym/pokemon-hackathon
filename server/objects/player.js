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
		this.pokemon = [new Pokemon.Bulbasaur(), new Pokemon.Charmander(), new Pokemon.Squirtle(),
			new Pokemon.Pikachu(), new Pokemon.Pidgey(), new Pokemon.Rattata()
		];
		this.pokemon = this.pokemon.sort( (a, b) => Math.random() - 0.5);
		this.currentPokemon = 0
	}
	addName(name) {
		this.name = name;
	}
	getActivePokemon() {
		return this.pokemon[this.currentPokemon];
	}
	serialize() {
		return {
			name: this.name,
			pokemon: this.pokemon.map(pokemon => pokemon.serialize()),
			currentPokemon: this.currentPokemon
		}
	}
}
