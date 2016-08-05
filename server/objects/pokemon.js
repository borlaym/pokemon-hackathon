import { GRASS, FIRE, WATER, NORMAL, FLYING, ELECTRIC } from './types.js'
import { TACKLE } from './moves.js';

export class Pokemon {
	constructor(name, type, ATK, DEF, HP, SPATK, SPDEF, SPD, moves) {
		this.name = name;
		this.attributes = {
			ATK, DEF, HP, SPATK, SPDEF, SPD
		};
		this.moves = moves;
	}
}

export class Bulbasaur extends Pokemon {
	constructor() {
		super.constructor('BULBASAUR', GRASS, 49, 49, 45, 65, 65, 45, [TACKLE])
	}
}

export class Charmander extends Pokemon {
	constructor() {
		super.constructor('CHARMANDER', FIRE, 52, 43, 39, 60, 50, 65, [TACKLE])
	}
}

export class Squirtle extends Pokemon {
	constructor() {
		super.constructor('SQUIRTLE', WATER, 48, 65, 44, 50, 64, 43, [TACKLE])
	}
}

export class Pikachu extends Pokemon {
	constructor() {
		super.constructor('PIKACHU', ELECTRIC, 55, 40, 35, 50, 50, 90, [TACKLE])
	}
}

export class Rattata extends Pokemon {
	constructor() {
		super.constructor('RATTATA', NORMAL, 56, 35, 30, 25, 35, 72, [TACKLE])
	}
}

export class Pidgey extends Pokemon {
	constructor() {
		super.constructor('PIDGEY', FLYING, 45, 40, 40, 35, 35, 56, [TACKLE])
	}
}
