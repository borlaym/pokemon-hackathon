import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import GameController from '../controllers/gameController.js';
import HealthBar from './HealthBar.js'
import $ from 'jquery';

let PokemonSelectorView = Backbone.View.extend({
	tagName: 'ul',
	className: 'pokemonSelector',
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
		GameController.getMyself().get('pokemon').forEach(pokemon => {
			let healthBar = new HealthBar({
				model: pokemon
			});
			let image = pokemon.getSmallImageSrc();
			pokemon = pokemon.toJSON();
			let li = $('<li class="pokemon" data-name="' + pokemon.name + '"><img src="' + image + '" class="birds">' +'<span class="pokemonname">' + pokemon.name + '</span><span class="numeric">' + pokemon.currentHP + '/'+ pokemon.maxHP + '</span></li>');
			li.append(healthBar.render());
			this.$el.append(li);

		});
		return this.$el;
	}
});
export default PokemonSelectorView;
