import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import GameController from '../controllers/gameController.js';
import $ from 'jquery';

let PokemonSelectorView = Backbone.View.extend({
	tagName: 'ul',
	events: {
		'click .pokemon': 'selectPokemon'
	},
	selectPokemon(event) {
		let name = $(event.currentTarget).data('name');
		EventBus.trigger('command', {
			type: "CHANGE_POKEMON",
			name
		});
		this.remove();
	},
	render() {
		GameController.getMyself().get('pokemon').toJSON().forEach(pokemon => {
			this.$el.append('<li class="pokemon" data-name="' + pokemon.name + '">' + pokemon.name + '</li>');
		});
		return this.$el;
	}
});
export default PokemonSelectorView;
