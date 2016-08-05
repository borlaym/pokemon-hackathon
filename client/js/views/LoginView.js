import Backbone from 'backbone';
let LoginView = Backbone.View.extend({
	events: {
		'submit form': 'onSubmit'
	},
	onSubmit(event) {
		event.preventDefault();
		return false;
	},
	render() {
		this.$el.html('<form><input type="text"><button type="submit">Search for opponent</button></form>');
		return this.$el;
	}
});
export default LoginView;
