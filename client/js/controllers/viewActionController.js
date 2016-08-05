import EventBus from '../eventBus.js';
import ViewController from './viewController.js';
import GameController from './gameController.js';

/**
 * Handle all view actions and redirect them to the proper controller/view
 * @type {Object}
 */
let ViewActionController = {
	initialize() {
		EventBus.on('viewAction:SHOW_TEXT', this.showText.bind(this));
		EventBus.on('viewAction:BLINK_POKEMON', this.blinkPokemon.bind(this));
		EventBus.on('viewAction:FAINT_POKEMON', this.faintPokemon.bind(this));
	},
	showText(action) {
		console.log(action.text);
		EventBus.trigger('finishedAction');
	},
	blinkPokemon(action) {
		console.log("Blinking pokemon");
		EventBus.trigger('finishedAction');
	},
	faintPokemon(action) {
		console.log("Fainting pokemon");
		EventBus.trigger('finishedAction');
	}
}

export default ViewActionController;
