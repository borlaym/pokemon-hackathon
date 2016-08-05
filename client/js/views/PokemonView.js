import Backbone from 'backbone';
import _ from 'underscore';

import HealthBar from './HealthBar';

let PokemonView = Backbone.View.extend({
	className: 'pokemonview shake',
	template: _.template('<h1><%= name %></h1><img src="<% if (player === "opponent") { print("images/rattata-color.png")  } else  { print("images/rattata-back.png") } %>">'),
	initialize(options) {
		this.player = options.player;
	},
	render() {
		const model = _.extend({}, this.model.toJSON(), { player: this.player } );
		this.$el.html(this.template(model));
		this.el.classList.add(this.player);
		var healthbar = new HealthBar({model: this.model});
		this.$el.append(healthbar.render())
		return this.$el;
	}
});
export default PokemonView;
