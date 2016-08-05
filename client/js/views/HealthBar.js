import Backbone from 'backbone';

let HealthBar = Backbone.View.extend({
	className: 'health',
	initialize() {
		this.model.on('change:currentHP', this.updateHealth.bind(this));
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
		if (healthPercent <= 20) {
			this.el.querySelector('.healthbar').style.backgroundColor = '#ca2b00';
		}
		else if (healthPercent <= 50) {
			this.el.querySelector('.healthbar').style.backgroundColor = '#f89000';
		}
		else {
			this.el.querySelector('.healthbar').style.backgroundColor = '#00f800';
		}
	}
});
export default HealthBar;
