import Backbone from 'backbone';
import EventBus from '../eventBus.js';
import ActionView from '../views/ActionView.js';
import BattleView from '../views/BattleView.js';

let GameView = Backbone.View.extend({
	className: 'gameView',
	initialize(options) {
		this.battleView = new BattleView({
			gameController: options.gameController
		});
		this.actionView = new ActionView();
	},
	render() {
		this.$el.append(this.battleView.render());
		this.$el.append(this.actionView.render());
		return this.$el;
	}
});
export default GameView;
