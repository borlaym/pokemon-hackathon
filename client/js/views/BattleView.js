import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import PokemonView from './PokemonView.js';
import GameController from '../controllers/gameController.js';

let BattleView = Backbone.View.extend({
	className: 'battleView',
	initialize(options) {
		const opponent = options.gameController.getOpponent();
		const myself = options.gameController.getMyself();
		this.opponentView = new PokemonView({
			model: opponent.get('pokemon').at(opponent.get('currentPokemon')),
			side: 'opponent',
			player: opponent
		});
		this.myselfView = new PokemonView({
			model: myself.get('pokemon').at(myself.get('currentPokemon')),
			side: 'myself',
			player: myself
		});
	},
	render() {
		this.$el.append(this.opponentView.render());
		this.$el.append(this.myselfView.render());
		return this.$el;
	}
});
export default BattleView;
