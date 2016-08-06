import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import PokemonView from '../views/PokemonView.js';
import TextView from '../views/TextView.js';

let LoginView = Backbone.View.extend({
	className: 'loginView',
	events: {
		'submit form': 'onSubmit'
	},
	onSubmit(event) {
		event.preventDefault();
		EventBus.trigger('connect');
		this.$('button').remove();
		this.$el.append('<p>Searching for opponent...</p>');
	},
	render() {
		this.$el.html('<h4>Pokemon</h4><form><button type="submit">Search for opponent</button></form>');

		return this.$el;
	}
});
export default LoginView;
