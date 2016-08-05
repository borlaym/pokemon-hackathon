import LoginView from '../views/LoginView.js';
import KoPapirOlloView from '../views/KoPapirOlloView.js';
import EventBus from '../eventBus.js';
import $ from 'jquery';

let ViewController = {
	start() {
		let loginView = new LoginView();
		this.renderView(loginView);

		EventBus.on('connected', () => {
			let koPapirOlloView = new KoPapirOlloView();
			this.renderView(koPapirOlloView);
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
