import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import PokemonSelectorView from './PokemonSelectorView.js';

let ActionView = Backbone.View.extend({
	events: {
		'click .attack': 'onAttack',
		'click .changePokemon': 'onChangePokemon',
	},
	onAttack() {
		EventBus.trigger('command', {
			type: 'ATTACK',
			move: 'TACKLE'
		});
	},
	onChangePokemon() {
		let selectorView = new PokemonSelectorView();
		this.$el.append(selectorView.render());
	},
	render() {
		this.$el.html('<button class="attack">FIGHT</button>' + '<button class="changePokemon">PKMN</button>');
		return this.$el;
	}
});
export default ActionView;
