import Backbone from 'backbone';
import _ from 'underscore';

import HealthBar from './HealthBar';

let PokemonView = Backbone.View.extend({
	className: 'pokemonview',
	template: _.template('<img src="<% if (player === "opponent") { print(frontImage)  } else  { print(backImage) } %>"><div class="status"><p><%= name %></p></div>'),
	initialize(options) {
		this.player = options.player;
		this.model.on('change:currentHP', () => {
			this.$el.addClass('blink');
			window.setTimeout(() => {
				this.$el.removeClass('blink');
			}, 1000);
		});
		this.model.on('faint', () => {
			this.$el.addClass('fainted');
		})
	},
	render() {
		const model = _.extend({},
			this.model.toJSON(),
			{
				player: this.player,
				frontImage: this.model.getFrontImageSrc(),
				backImage: this.model.getBackImageSrc()
		});
		this.$el.html(this.template(model));
		this.el.classList.add(this.player);
		this.healthbar = new HealthBar({model: this.model});
		this.$('.status').append(this.healthbar.render())
		return this.$el;
	}
});
export default PokemonView;
