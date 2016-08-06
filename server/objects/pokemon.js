'use strict';

let Types = require('./types.js');
let Moves = require('./moves.js');

const StageMultipliers = {
	[-6]: 2/8,
	[-5]: 2/7,
	[-4]: 2/6,
	[-3]: 2/5,
	[-2]: 2/4,
	[-1]: 2/3,
	0: 1,
	1: 3/2,
	2: 4/2,
	3: 5/2,
	4: 6/2,
	5: 7/2,
	6: 8/2
}

class Pokemon {
	constructor(name, type, ATK, DEF, HP, SPATK, SPDEF, SPD, moves) {
		this.name = name;
		this.type = type;
		this.baseAttributes = {
			ATK, DEF, HP, SPATK, SPDEF, SPD
		};
		this.variables = {
			HP: this.baseAttributes.HP,
			ATKModifier: 0,
			DEFModifier: 0,
			SPATKModifier: 0,
			SPDEFModifier: 0,
			SPDModifier: 0,
			AccuracyModifier: 0,
			EvasionModifier: 0
		};
		this.moves = moves;
	}
	getATK() {
		return Math.floor(StageMultipliers[this.variables.ATKModifier] * this.baseAttributes.ATK);
	}
	getDEF() {
		return Math.floor(StageMultipliers[this.variables.DEFModifier] * this.baseAttributes.DEF);
	}
	getSPATK() {
		return Math.floor(StageMultipliers[this.variables.SPATKModifier] * this.baseAttributes.SPATK);
	}
	getSPDEF() {
		return Math.floor(StageMultipliers[this.variables.SPDEFModifier] * this.baseAttributes.SPDEF);
	}
	getSPD() {
		return Math.floor(StageMultipliers[this.variables.SPDModifier] * this.baseAttributes.SPD);
	}
	getCurrentHP() {
		return this.variables.HP;
	}
	getAccuracy() {
		return StageMultipliers[this.variables.AccuracyModifier];
	}
	getEvasion() {
		return 1 / StageMultipliers[this.variables.EvasionModifier];
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
		super('BULBASAUR', Types.GRASS, 49, 49, 45, 65, 65, 45, [Moves.TACKLE, Moves.VINE_WHIP, Moves.GROWL])
	}
}

class Charmander extends Pokemon {
	constructor() {
		super('CHARMANDER', Types.FIRE, 52, 43, 39, 60, 50, 65, [Moves.TACKLE, Moves.EMBER, Moves.GROWL, Moves.SCARY_FACE])
	}
}

class Squirtle extends Pokemon {
	constructor() {
		super('SQUIRTLE', Types.WATER, 48, 65, 44, 50, 64, 43, [Moves.TACKLE, Moves.WATER_GUN, Moves.TAIL_WHIP])
	}
}

class Pikachu extends Pokemon {
	constructor() {
		super('PIKACHU', Types.ELECTRIC, 55, 40, 35, 50, 50, 90, [Moves.TACKLE, Moves.THUNDER_SHOCK, Moves.TAIL_WHIP, Moves.PLAY_NICE])
	}
}

class Rattata extends Pokemon {
	constructor() {
		super('RATTATA', Types.NORMAL, 56, 35, 30, 25, 35, 72, [Moves.TACKLE, Moves.QUICK_ATTACK, Moves.TAIL_WHIP, Moves.HYPER_FANG])
	}
}

class Pidgey extends Pokemon {
	constructor() {
		super('PIDGEY', Types.FLYING, 45, 40, 40, 35, 35, 56, [Moves.TACKLE, Moves.GUST, Moves.SAND_ATTACK, Moves.FEATHER_DANCE])
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
