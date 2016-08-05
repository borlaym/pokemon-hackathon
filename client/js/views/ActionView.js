import Backbone from 'backbone';
import EventBus from '../eventBus.js';

let ActionView = Backbone.View.extend({
	events: {
		'click .attack': 'onAttack',
		'click .changePokemon': 'onChangePokemon',
	},
	onAttack() {
		EventBus.trigger('command', {
			type: 'ATTACK'
		});
	},
	onChangePokemon() {
		EventBus.trigger('command', {
			type: "CHANGE_POKEMON"
		});
	},
	render() {
		this.$el.html('<button class="attack">ATTACK</button>' + '<button class="changePokemon">PKMN</button>');
		return this.$el;
	}
});
export default ActionView;
