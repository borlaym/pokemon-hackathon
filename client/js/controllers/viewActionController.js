import EventBus from '../eventBus.js';
import ViewController from './viewController.js';

/**
 * Handle all view actions and redirect them to the proper controller/view
 * @type {Object}
 */
let ViewActionController = {
	initialize(gameController) {
		this.gameController = gameController;
		EventBus.on('viewAction:SHOW_TEXT', this.showText.bind(this));
		EventBus.on('viewAction:BLINK_POKEMON', this.blinkPokemon.bind(this));
		EventBus.on('viewAction:FAINT_POKEMON', this.faintPokemon.bind(this));
		EventBus.on('viewAction:CALL_BACK_POKEMON', this.callBackPokemon.bind(this));
		EventBus.on('viewAction:SUMMON_POKEMON', this.summonPokemon.bind(this));
		EventBus.on('viewAction:CHOOSE_POKEMON', this.choosePokemon.bind(this));
		EventBus.on('viewAction:OPPONENT_CHOOSE_POKEMON', this.opponentChoosePokemon.bind(this));
	},
	showText(action) {
		ViewController.showText(action, () => {
			EventBus.trigger('finishedAction');
		});
	},
	blinkPokemon(action) {
		let pokemon = action.trainer.getActivePokemon();
		pokemon.decreaseHP(action.damage);
		setTimeout(() => {
			EventBus.trigger('finishedAction');
		}, 1000);
	},
	faintPokemon(action) {
		let pokemon = action.trainer.getActivePokemon();
		pokemon.faint(() => {
			EventBus.trigger('finishedAction');
		})
	},
	callBackPokemon(action) {
		this.faintPokemon(action);
	},
	summonPokemon(action) {
		const newPokemon = action.trainer.get('pokemon').find(pokemon => pokemon.get('name') === action.newPokemon);
		const newIndex = action.trainer.get('pokemon').indexOf(newPokemon);
		console.log(action, newPokemon.get('name'), newIndex);
		action.trainer.set('currentPokemon', newIndex);
		setTimeout(() => {
			EventBus.trigger('finishedAction');
		}, 800);
	},
	choosePokemon() {
		EventBus.trigger('makeMeChoosePokemon');
		EventBus.trigger('finishedAction');
	},
	opponentChoosePokemon() {
		EventBus.trigger('command', {
			type: 'IDLE'
		});
		EventBus.trigger('finishedAction');
	}
}

export default ViewActionController;
