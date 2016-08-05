import Backbone from 'backbone';
import EventBus from '../eventBus.js';

let PokemonSelectorView = Backbone.View.extend({
	events: {
		'submit form': 'onSubmit'
	},
	onSubmit(event) {
		event.preventDefault();
		EventBus.trigger('connect', this.$('input').val());
	},
	render() {
		this.$el.html('<form><input type="text"><button type="submit">Search for opponent</button></form>');
		return this.$el;
	}
});
export default PokemonSelectorView;
