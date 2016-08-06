import Backbone from 'backbone';
import _ from 'underscore';

import HealthBar from './HealthBar';

let PokemonView = Backbone.View.extend({
	className: 'pokemonview',
	template: _.template('<img src="<% if (side === "opponent") { print(frontImage)  } else  { print(backImage) } %>"><div class="status"><p><%= name %></p></div>'),
	initialize(options) {
		this.side = options.side;
		this.player = options.player;
		this.player.on('change:currentPokemon', () => {
			this.changeModel(this.player.getActivePokemon());
		});
		this.bindModelEvents();
	},
	bindModelEvents() {
		this.model.on('change:currentHP', () => {
			this.$el.addClass('blink');
			window.setTimeout(() => {
				this.$el.removeClass('blink');
			}, 1000);
		});
		this.model.on('faint', () => {
			this.$el.addClass('fainted');
		});
		this.model.on('shake', () => {
			this.$el.addClass('shake');
			setTimeout(() => {
				this.$el.removeClass('shake');
			}, 800);
		});
	},
	unbindModelEvents() {
		this.model.off('change faint summon');
	},
	changeModel(model) {
		console.log('changed model to', model.get('name'));
		this.unbindModelEvents();
		this.model = model;
		this.bindModelEvents();
		this.render();
	},
	render() {
		if (this.healthbar) {
			this.healthbar.remove();
		}
		const model = _.extend({},
			this.model.toJSON(),
			{
				side: this.side,
				frontImage: this.model.getFrontImageSrc(),
				backImage: this.model.getBackImageSrc()
		});
		this.$el.html(this.template(model));
		this.$el.addClass(this.side + ' fainted');
		this.healthbar = new HealthBar({model: this.model});
		this.$('.status').append(this.healthbar.render())
		setTimeout(() => {
			this.$el.removeClass('fainted');
		}, 100);
		return this.$el;
	}
});
export default PokemonView;
