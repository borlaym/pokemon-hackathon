import Backbone from 'backbone';
import _ from 'underscore';

import HealthBar from './HealthBar';

let PokemonView = Backbone.View.extend({
	className: 'pokemonview',
	template: _.template('<h1><%= name %></h1><img src="images/rattata-color.png">'),
	initialize(which) {
		this.model = new Backbone.Model({
			name: 'HELLO',
			health: 10,
			which: opponent
		});

	},
	render() {
		this.$el.html(this.template(this.model.toJSON()));
		this.el.classList.add(this.which);
		var healthbar = new HealthBar({model: this.model});
		this.$el.append(healthbar.render())
		return this.$el;
	}
});
export default PokemonView;
