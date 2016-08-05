import Backbone from 'backbone';

let HealthBar = Backbone.View.extend({
	className: 'health',
	initialize() {
		window._model = this.model;

		this.listenTo(this.model, "change", this.updateHealth);
	},

	render() {
		this.$el.html('<div class="healthbar" style="width:' + this.model.get('health') + '%"</div>');
		return this.$el;
	},
	updateHealth() {
		const health = this.model.get('health');
		this.el.querySelector('.healthbar').style.width = Math.max(Math.min(health, 100), 0) + "%";

		if (health <= 20) {
			this.el.querySelector('.healthbar').style.backgroundColor = 'red';
		}
		else if (health <= 50) {
			this.el.querySelector('.healthbar').style.backgroundColor = 'yellow';
		}
		else if (health <= 100) {
			this.el.querySelector('.healthbar').style.backgroundColor = 'green';
		}
	}
});
export default HealthBar;
