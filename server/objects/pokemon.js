'use strict';

let Types = require('./types.js');
let Moves = require('./moves.js');

class Pokemon {
	constructor(name, type, ATK, DEF, HP, SPATK, SPDEF, SPD, moves) {
		this.name = name;
		this.attributes = {
			ATK, DEF, HP, SPATK, SPDEF, SPD
		};
		this.moves = moves;
	}
	serialize() {
		return {
			name: this.name,
			type: this.type,
			moves: this.moves
		}
	}
}

class Bulbasaur extends Pokemon {
	constructor() {
		super.constructor('BULBASAUR', Types.GRASS, 49, 49, 45, 65, 65, 45, [Moves.TACKLE])
	}
}

class Charmander extends Pokemon {
	constructor() {
		super.constructor('CHARMANDER', Types.FIRE, 52, 43, 39, 60, 50, 65, [Moves.TACKLE])
	}
}

class Squirtle extends Pokemon {
	constructor() {
		super.constructor('SQUIRTLE', Types.WATER, 48, 65, 44, 50, 64, 43, [Moves.TACKLE])
	}
}

class Pikachu extends Pokemon {
	constructor() {
		super.constructor('PIKACHU', Types.ELECTRIC, 55, 40, 35, 50, 50, 90, [Moves.TACKLE])
	}
}

class Rattata extends Pokemon {
	constructor() {
		super.constructor('RATTATA', Types.NORMAL, 56, 35, 30, 25, 35, 72, [Moves.TACKLE])
	}
}

class Pidgey extends Pokemon {
	constructor() {
		super.constructor('PIDGEY', FLYING, 45, 40, 40, 35, 35, 56, [Moves.TACKLE])
	}
}

module.exports = {
	Bulbasaur,
	Charmander,
	Squirtle,
	Pikachu,
	Rattata,
	Pidgey
}
