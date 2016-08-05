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
	decreaseHP(amount) {
		var currentHP = this.get('currentHP');
		var newHP = currentHP - amount;
		if (newHP < 0) {
			newHP = 0;
		}
		this.set('currentHP', newHP);
	}
});

export default PokemonModel;
