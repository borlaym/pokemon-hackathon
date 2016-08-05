import Backbone from 'backbone';
import PokemonModel from './pokemon.js';

let PokemonCollection = Backbone.Collection.extend({
	model: PokemonModel
});

export default PokemonCollection;
