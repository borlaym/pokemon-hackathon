/**
 * Display names for stats
 * @type {Object}
 */
const StatNames = {
		'ATK': 'ATTACK',
		'DEF': 'DEFENSE',
		'SPATK': 'SPECIAL ATTACK',
		'SPDEF': 'SPECIAL DEFENSE',
		'SPD': 'SPEED',
		'Accuracy': 'ACCURACY'
};

/**
 * Create a simple text actions
 */
const _createTextAction = text => {
	return {
		type: 'SHOW_TEXT',
		text
	};
}

/**
 * Create an action that makes a pokemon blink and take damage
 * @param  {PlayerModel} trainer The opponent
 * @param  {Number} damage
 */
const _createBlinkAction = (trainer, damage) => {
	return {
		type: 'BLINK_POKEMON',
		trainer,
		damage
	};
}

/**
 * Create an action that makes a pokemon blink
 * @type {[type]}
 */
const _createShakeAction = trainer => {
	return {
		type: 'SHAKE_POKEMON',
		trainer
	};
}

/**
 * Handle an action event if the action is a damaging move
 */
const _handleDamagingMove = (event, scope) => {
	let viewActions = [];
	let opposing = event.trainer === scope.getMyself().get('id') ? "" : "Enemy ";
	viewActions.push(_createTextAction(opposing + event.pokemon + ' used ' + event.move + '!'));
	if (event.missed) {
		viewActions.push(_createTextAction('But it missed!'))
		return viewActions;
	}
	viewActions.push(_createBlinkAction(scope.getOpponentOf(event.trainer), event.damage));
	if (event.superEffective) {
		viewActions.push(_createTextAction('It\'s super effective!'))
	}
	if (event.notEffective) {
		viewActions.push(_createTextAction('It\'s not very effective...'))
	}
	return viewActions;
}

/**
 * Handle an action event if the action modifies a stat of a pokemon
 */
const _handleStatChangingMove = (event, scope) => {
	let viewActions = [];
	let opposing = event.trainer === scope.getMyself().get('id') ? "" : "Enemy ";
	const targetTrainer = scope.getTrainer(event.targetTrainer);
	viewActions.push(_createTextAction(opposing + event.pokemon + ' used ' + event.move.name + '!'));
	if (event.missed) {
		viewActions.push(_createTextAction('But it missed!'))
		return viewActions;
	}
	viewActions.push(_createShakeAction(scope.getOpponentOf(event.trainer)));
	const direction = event.move.modifier > 0 ? 'rose' : 'fell';
	opposing = event.targetTrainer === scope.getMyself().get('id') ? "" : "Enemy ";
	let stat = StatNames[event.move.attribute];
	viewActions.push(_createTextAction(opposing + targetTrainer.getActivePokemon().get('name') + '\'s ' + stat + ' ' + direction + '!'))
	return viewActions;
}

/**
 * Create actions for when a pokemon uses a move
 */
let POKEMON_USED_MOVE = (event, scope) => {
	// Damaging moves
	if (event.category === 'DAMAGE') {
		return _handleDamagingMove(event, scope);
	} else {
		// Stat changing moves
		return _handleStatChangingMove(event, scope);
	}
}

let POKEMON_FAINTED = (event, scope) => {
	let viewActions = [];
	let opposing = event.trainer === scope.getMyself().get('id') ? "" : "Enemy ";
	viewActions.push({
		type: 'FAINT_POKEMON',
		trainer: scope.getTrainer(event.trainer)
	});
	viewActions.push(_createTextAction(opposing + event.pokemon + ' fainted!'))
	// If my pokemon fainted, make the user change a pokemon
	if (scope.getTrainer(event.trainer).get('id') === scope.myId) {
		viewActions.push({
			type: 'CHOOSE_POKEMON',
		});
	} else {
		// Make me wait for the opponent
		viewActions.push({
			type: 'OPPONENT_CHOOSE_POKEMON',
		});
	}
	return viewActions;
}

let CHANGED_POKEMON = (event, scope) => {
	let viewActions = [];
	const trainer = scope.getTrainer(event.trainer)
	const currentPokemon = trainer.getActivePokemon();
	if (currentPokemon.get('currentHP') !== 0) {
		viewActions.push(_createTextAction(event.previousPokemon + ', enough! Come back!'))
		viewActions.push({
			type: 'CALL_BACK_POKEMON',
			trainer
		});
	}
	viewActions.push(_createTextAction('Go! ' + event.newPokemon + '!'))
	viewActions.push({
		type: 'SUMMON_POKEMON',
		trainer,
		newPokemon: event.newPokemon
	});
	return viewActions;
}

export default {
	POKEMON_USED_MOVE,
	POKEMON_FAINTED,
	CHANGED_POKEMON
}
