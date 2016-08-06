'use strict';

let Types = require('./types.js');

module.exports = {
	TACKLE: {
		name: 'TACKLE',
		type: Types.NORMAL,
		power: 40,
		accuracy: 1
	},
	EMBER: {
		name: 'EMBER',
		type: Types.FIRE,
		power: 40,
		accuracy: 1
	},
	VINE_WHIP: {
		name: 'VINE WHIP',
		type: Types.GRASS,
		power: 45,
		accuracy: 1
	},
	WATER_GUN: {
		name: 'WATER GUN',
		type: Types.WATER,
		power: 40,
		accuracy: 1
	},
	THUNDER_SHOCK: {
		name: 'THUNDER SHOCK',
		type: Types.ELECTRIC,
		power: 40,
		accuracy: 1
	},
	GUST: {
		name: 'GUST',
		type: Types.FLYING,
		power: 40,
		accuracy: 1
	}
}
