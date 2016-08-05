import Backbone from 'backbone';


let TextView = Backbone.View.extend({
	tagName: 'p',
	className: 'textview',
	initialize(options) {
		this.text = options.text;
	},
	render() {

		var currentStep = 0;

		function step(timestamp) {
			this.el.innerHTML += this.text[currentStep]
			currentStep += 1;
			if (currentStep < this.text.length) {
				window.setTimeout(step.bind(this), 50);
			} else {
				window.setTimeout(() => {
					this.trigger('finished');
				}, 1000);
			}
		}

		window.setTimeout(step.bind(this), 50);

		return this.$el;
	}
});
export default TextView;
