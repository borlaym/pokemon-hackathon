import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import PokemonSelectorView from './PokemonSelectorView.js';
import MoveSelectorView from './MoveSelectorView.js';

let ActionView = Backbone.View.extend({
	className: 'actionView',
	initialize() {
		EventBus.on('makeMeChoosePokemon', this.onChangePokemon.bind(this));
	},
	events: {
		'click .attack': 'onAttack',
		'click .changePokemon': 'onChangePokemon',
	},
	onAttack() {
		let selectorView = new MoveSelectorView();
		this.$el.append(selectorView.render());
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
