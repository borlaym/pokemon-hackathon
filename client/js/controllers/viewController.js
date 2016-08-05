import LoginView from '../views/LoginView.js';
import $ from 'jquery';

let ViewController = {
	start() {
		let loginView = new LoginView();
		this.renderView(loginView);
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
