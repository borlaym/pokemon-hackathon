import Backbone from 'backbone';
import _ from 'underscore';

import HealthBar from './HealthBar';

let PokemonView = Backbone.View.extend({
	className: 'pokemonview shake',
	template: _.template('<h1><%= name %></h1><img src="<% if (which === "opponent") { print("images/rattata-color.png")  } else  { print("images/rattata-back.png") } %>">'),
	initialize(which) {
		this.model = new Backbone.Model({
			name: 'HELLO',
			health: 10,
			which: which
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
