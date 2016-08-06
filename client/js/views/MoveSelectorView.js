import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import GameController from '../controllers/gameController.js';
import $ from 'jquery';

let PokemonSelectorView = Backbone.View.extend({
	className: 'moveSelector',
	tagName: 'ul',
	events: {
		'click .move': 'selectPokemon'
	},
	selectPokemon(event) {
		let name = $(event.currentTarget).data('name');
		EventBus.trigger('command', {
			type: 'ATTACK',
			move: name
		});
		this.remove();
	},
	render() {
		GameController.getMyself().getActivePokemon().get('moves').forEach(move => {
			this.$el.append('<li class="move" data-name="' + move.name + '">' + move.name + '</li>');
		});
		return this.$el;
	}
});
export default PokemonSelectorView;
