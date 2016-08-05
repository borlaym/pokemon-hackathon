'use strict';

let Types = require('./types.js');
let Moves = require('./moves.js');

class Pokemon {
	constructor(name, type, ATK, DEF, HP, SPATK, SPDEF, SPD, moves) {
		this.name = name;
		this.baseAttributes = {
			ATK, DEF, HP, SPATK, SPDEF, SPD
		};
		this.variables = {
			HP: this.baseAttributes.HP
		};
		this.moves = moves;
	}
	getATK() {
		return this.baseAttributes.ATK;
	}
	getDEF() {
		return this.baseAttributes.DEF;
	}
	getSPD() {
		return this.baseAttributes.SPD;
	}
	getCurrentHP() {
		return this.variables.HP;
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
		super('BULBASAUR', Types.GRASS, 49, 49, 45, 65, 65, 45, [Moves.TACKLE])
	}
}

class Charmander extends Pokemon {
	constructor() {
		super('CHARMANDER', Types.FIRE, 52, 43, 39, 60, 50, 65, [Moves.TACKLE])
	}
}

class Squirtle extends Pokemon {
	constructor() {
		super('SQUIRTLE', Types.WATER, 48, 65, 44, 50, 64, 43, [Moves.TACKLE])
	}
}

class Pikachu extends Pokemon {
	constructor() {
		super('PIKACHU', Types.ELECTRIC, 55, 40, 35, 50, 50, 90, [Moves.TACKLE])
	}
}

class Rattata extends Pokemon {
	constructor() {
		super('RATTATA', Types.NORMAL, 56, 35, 30, 25, 35, 72, [Moves.TACKLE])
	}
}

class Pidgey extends Pokemon {
	constructor() {
		super('PIDGEY', Types.FLYING, 45, 40, 40, 35, 35, 56, [Moves.TACKLE])
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
