'use strict';

let Types = require('./types.js');
let Moves = require('./moves.js');

class Pokemon {
	constructor(name, type, ATK, DEF, HP, SPATK, SPDEF, SPD, moves) {
		this.name = name;
		this.type = type;
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
	getSPATK() {
		return this.baseAttributes.SPATK;
	}
	getSPDEF() {
		return this.baseAttributes.SPDEF;
	}
	getSPD() {
		return this.baseAttributes.SPD;
	}
	getCurrentHP() {
		return this.variables.HP;
	}
	decreaseHP(amount) {
		this.variables.HP -= amount;
		if (this.variables.HP < 0) {
			this.variables.HP = 0;
		}
	}
	serialize() {
		return {
			name: this.name,
			type: this.type,
			moves: this.moves,
			currentHP: this.getCurrentHP(),
			maxHP: this.baseAttributes.HP
		}
	}
}

class Bulbasaur extends Pokemon {
	constructor() {
		super('BULBASAUR', Types.GRASS, 49, 49, 45, 65, 65, 45, [Moves.TACKLE, Moves.VINE_WHIP])
	}
}

class Charmander extends Pokemon {
	constructor() {
		super('CHARMANDER', Types.FIRE, 52, 43, 39, 60, 50, 65, [Moves.TACKLE, Moves.EMBER])
	}
}

class Squirtle extends Pokemon {
	constructor() {
		super('SQUIRTLE', Types.WATER, 48, 65, 44, 50, 64, 43, [Moves.TACKLE, Moves.WATER_GUN])
	}
}

class Pikachu extends Pokemon {
	constructor() {
		super('PIKACHU', Types.ELECTRIC, 55, 40, 35, 50, 50, 90, [Moves.TACKLE, Moves.THUNDER_SHOCK])
	}
}

class Rattata extends Pokemon {
	constructor() {
		super('RATTATA', Types.NORMAL, 56, 35, 30, 25, 35, 72, [Moves.TACKLE])
	}
}

class Pidgey extends Pokemon {
	constructor() {
		super('PIDGEY', Types.FLYING, 45, 40, 40, 35, 35, 56, [Moves.TACKLE, Moves.GUST])
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
