import Backbone from 'backbone';

let PokemonModel = Backbone.Model.extend({
	getHealthPercent() {
		return Math.floor(this.get('currentHP') / this.get('maxHP') * 100);
	},
	getFrontImageSrc() {
		return 'images/' + this.get('name').toLowerCase() + '.png';
	},
	getBackImageSrc() {
		return 'images/' + this.get('name').toLowerCase() + '-back.png';
	},
	getSmallImageSrc() {
		if (this.get('name') === 'PIDGEY') {
			return 'images/birdsmall.png';
		} else if (this.get('name') === 'PIKACHU') {
			return 'images/pikachusmall.png';
		} else {
			return 'images/normalsmall.png';
		}
	},
	decreaseHP(amount) {
		var currentHP = this.get('currentHP');
		var newHP = currentHP - amount;
		if (newHP < 0) {
			newHP = 0;
		}
		this.set('currentHP', newHP);
	},
	faint(callback) {
		this.trigger('faint');
		setTimeout(callback, 700);
	},
	shake() {
		this.trigger('shake');
	}
});

export default PokemonModel;
