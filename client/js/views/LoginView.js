import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import PokemonView from '../views/PokemonView.js';
let LoginView = Backbone.View.extend({
	events: {
		'submit form': 'onSubmit'
	},
	onSubmit(event) {
		event.preventDefault();
		EventBus.trigger('connect', this.$('input').val());
	},
	render() {
		this.$el.html('<form><input type="text"><button type="submit">Search for opponent</button></form>');

		this.$el.append(new PokemonView('opponent').render())
		this.$el.append(new PokemonView('player').render())

		return this.$el;
	}
});
export default LoginView;
