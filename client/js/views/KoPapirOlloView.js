import Backbone from 'backbone';
import EventBus from '../eventBus.js';

let KoPapirOlloView = Backbone.View.extend({
	events: {
		'click .ko': 'onKo',
		'click .papir': 'onPapir',
		'click .ollo': 'onOllo',
	},
	onKo() {
		EventBus.trigger('action', 'ko');
	},
	onPapir() {
		EventBus.trigger('action', 'papir');
	},
	onOllo(){
		EventBus.trigger('action', 'ollo');
	},
	render() {
		this.$el.html('<button class="ko">Ko</button>' + '<button class="papir">Papir</button>' + '<button class="ollo">Ollo</button>');
		return this.$el;
	}
});
export default KoPapirOlloView;
