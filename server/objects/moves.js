'use strict';

let Types = require('./types.js');

module.exports = {
	TACKLE: {
		name: 'TACKLE',
		type: Types.NORMAL,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'ATK'
	},
	QUICK_ATTACK: {
		name: 'QUICK ATTACK',
		type: Types.NORMAL,
		power: 40,
		accuracy: 1,
		SPDModifier: 100,
		attribute: 'ATK'
	},
	EMBER: {
		name: 'EMBER',
		type: Types.FIRE,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK'
	},
	VINE_WHIP: {
		name: 'VINE WHIP',
		type: Types.GRASS,
		power: 45,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK'
	},
	WATER_GUN: {
		name: 'WATER GUN',
		type: Types.WATER,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK'
	},
	THUNDER_SHOCK: {
		name: 'THUNDER SHOCK',
		type: Types.ELECTRIC,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK'
	},
	GUST: {
		name: 'GUST',
		type: Types.FLYING,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK'
	}
}
