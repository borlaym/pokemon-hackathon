import Backbone from 'backbone';
let LoginView = Backbone.View.extend({
	render() {
		this.$el = 'Hello World';
		return this.$el;
	}
});
export default LoginView;
