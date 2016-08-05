'use strict';

let Types = require('./types.js');

class Move {
	constructor(name, type, damage, accuracy) {
		this.name = name;
		this.type = type;
		this.damage = damage;
		this.accuracy = accuracy;
	}
}

class Tackle extends Move {
	constructor() {
		this.super('TACKLE', Types.NORMAL, 40, 1);
	}
}

module.exports = {
	TACKLE: Tackle
}
