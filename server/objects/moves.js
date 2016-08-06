'use strict';

let Types = require('./types.js');

module.exports = {
	TACKLE: {
		name: 'TACKLE',
		type: Types.NORMAL,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'ATK',
		category: 'DAMAGE'
	},
	QUICK_ATTACK: {
		name: 'QUICK ATTACK',
		type: Types.NORMAL,
		power: 40,
		accuracy: 1,
		SPDModifier: 100,
		attribute: 'ATK',
		category: 'DAMAGE'
	},
	GROWL: {
		name: 'GROWL',
		type: Types.NORMAL,
		accuracy: 1,
		SPDModifier: 0,
		category: 'MODIFIER',
		attribute: 'ATK',
		target: 'opponent',
		modifier: -1
	},
	TAIL_WHIP: {
		name: 'TAIL WHIP',
		type: Types.NORMAL,
		accuracy: 1,
		SPDModifier: 0,
		category: 'MODIFIER',
		attribute: 'DEF',
		target: 'opponent',
		modifier: -1
	},
	EMBER: {
		name: 'EMBER',
		type: Types.FIRE,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK',
		category: 'DAMAGE'
	},
	VINE_WHIP: {
		name: 'VINE WHIP',
		type: Types.GRASS,
		power: 45,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK',
		category: 'DAMAGE'
	},
	WATER_GUN: {
		name: 'WATER GUN',
		type: Types.WATER,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK',
		category: 'DAMAGE'
	},
	THUNDER_SHOCK: {
		name: 'THUNDER SHOCK',
		type: Types.ELECTRIC,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK',
		category: 'DAMAGE'
	},
	GUST: {
		name: 'GUST',
		type: Types.FLYING,
		power: 40,
		accuracy: 1,
		SPDModifier: 0,
		attribute: 'SPATK',
		category: 'DAMAGE'
	}
}
