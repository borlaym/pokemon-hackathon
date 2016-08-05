import LoginView from '../views/LoginView.js';
import ActionView from '../views/ActionView.js';
import EventBus from '../eventBus.js';
import $ from 'jquery';

let ViewController = {
	start() {
		let loginView = new LoginView();
		this.renderView(loginView);

		EventBus.on('gameStart', () => {
			let actionView = new ActionView();
			this.renderView(actionView);
		})
	},
	renderView(view) {
		if (this.view) {
			this.view.remove();
		}
		this.view = view;
		$('.main').html(this.view.render());
	}
}

export default ViewController;
