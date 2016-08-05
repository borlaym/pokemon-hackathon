import LoginView from '../views/LoginView.js';
import GameView from '../views/GameView.js';
import TextView from '../views/TextView.js';
import EventBus from '../eventBus.js';
import $ from 'jquery';

let ViewController = {
	start(gameController) {
		let loginView = new LoginView();
		this.renderView(loginView);

		EventBus.on('gameStart', () => {
			let gameView = new GameView({
				gameController
			});
			this.renderView(gameView);
		})
	},
	renderView(view) {
		if (this.view) {
			this.view.remove();
		}
		this.view = view;
		$('.main').html(this.view.render());
	},
	showText(action, callback) {
		this.textView = new TextView({
			text: action.text
		});
		this.textView.on('finished', () => {
			this.textView.remove();
			this.textView = null;
			callback();
		})
		$(document.body).append(this.textView.render());
	}
}

export default ViewController;
