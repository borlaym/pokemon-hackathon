'use strict';

let Types = require('./types.js');

module.exports = {
	TACKLE: {
		name: 'TACKLE',
		type: Types.NORMAL,
		power: 40,
		accuracy: 1,
		attribute: 'ATK'
	},
	EMBER: {
		name: 'EMBER',
		type: Types.FIRE,
		power: 40,
		accuracy: 1,
		attribute: 'SPATK'
	},
	VINE_WHIP: {
		name: 'VINE WHIP',
		type: Types.GRASS,
		power: 45,
		accuracy: 1,
		attribute: 'SPATK'
	},
	WATER_GUN: {
		name: 'WATER GUN',
		type: Types.WATER,
		power: 40,
		accuracy: 1,
		attribute: 'SPATK'
	},
	THUNDER_SHOCK: {
		name: 'THUNDER SHOCK',
		type: Types.ELECTRIC,
		power: 40,
		accuracy: 1,
		attribute: 'SPATK'
	},
	GUST: {
		name: 'GUST',
		type: Types.FLYING,
		power: 40,
		accuracy: 1,
		attribute: 'SPATK'
	}
}
