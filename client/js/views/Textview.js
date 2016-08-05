import Backbone from 'backbone';


let TextView = Backbone.View.extend({
	tagName: 'p',
	className: 'textview',
	initialize(text) {
		this.text = text;

	},
	render() {

		var currentStep = 0;

		function step(timestamp) {
			this.el.innerHTML += this.text[currentStep]
			currentStep += 1;
			if (currentStep < this.text.length) {
				window.requestAnimationFrame(step.bind(this));
			}
		}

		window.requestAnimationFrame(step.bind(this));

		//this.$el.html(this.text);
		return this.$el;
	}
});
export default TextView;
