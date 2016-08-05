import { GRASS, FIRE, WATER, NORMAL, FLYING } from './types.js'
import { TACKLE } from './moves.js';

export class Pokemon {
	constructor(name, type, HP, ATK, SATK, DEF, SDEF, SPD, moves) {
		this.name = name;
		this.attributes = {
			HP, ATK, SATK, DEF, SDEF, SPD
		};
		this.moves = moves;
	}
}

export class Pidgey extends Pokemon {
	constructor() {
		super.constructor('PIDGEY', FLYING, 30, 20, 20, 20, 20, 20, [TACKLE])
	}
}
