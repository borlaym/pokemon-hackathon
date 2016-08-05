import { GRASS, FIRE, WATER, NORMAL, FLYING } from './types.js'

export class Move {
	constructor(name, type, damage, accuracy) {
		this.name = name;
		this.type = type;
		this.damage = damage;
		this.accuracy = accuracy;
	}
}

export class Tackle extends Move {
	constructor() {
		this.super('TACKLE', NORMAL, 40, 1);
	}
}
