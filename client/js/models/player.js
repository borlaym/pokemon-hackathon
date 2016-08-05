import Backbone from 'backbone';
import PokemonCollection from './pokemonCollection.js'
import PokemonModel from './pokemon.js';

let PlayerModel = Backbone.Model.extend({
	initialize(values) {
		this.set({
			id: values.id,
			currentPokemon: values.currentPokemon,
			name: values.name,
			pokemon: new PokemonCollection(values.pokemon)
		});
	},
	update(values) {
		this.set({
			id: values.id,
			currentPokemon: values.currentPokemon,
			name: values.name
		});
		this.get('pokemon').forEach((pokemon, index) => {
			pokemon.set(values.pokemon[index])
		});
	},
	getActivePokemon() {
		return this.get('pokemon').at(this.get('currentPokemon'));
	}
});

export default PlayerModel;
