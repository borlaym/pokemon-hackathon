import Backbone from 'backbone';

let HealthBar = Backbone.View.extend({
	className: 'health',
	initialize() {
		window._model = this.model;

		this.listenTo(this.model, "change", this.updateHealth);
	},

	render() {
		this.$el.html('<div class="healthbar" style="width:' + this.model.getHealthPercent() + '%"</div>');
		this.setColor();
		return this.$el;
	},
	updateHealth() {
		const healthPercent = this.model.getHealthPercent();
		this.el.querySelector('.healthbar').style.width = healthPercent + "%";
		this.setColor();
	},
	setColor() {
		const healthPercent = this.model.getHealthPercent();
		console.log(healthPercent);
		if (healthPercent <= 20) {
			this.el.querySelector('.healthbar').style.backgroundColor = 'red';
		}
		else if (healthPercent <= 50) {
			this.el.querySelector('.healthbar').style.backgroundColor = 'yellow';
		}
		else {
			this.el.querySelector('.healthbar').style.backgroundColor = 'green';
		}
	}
});
export default HealthBar;
