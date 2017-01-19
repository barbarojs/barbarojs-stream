(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('rxjs/Subject'), require('rxjs/add/operator/filter'), require('preact')) :
	typeof define === 'function' && define.amd ? define(['rxjs/Subject', 'rxjs/add/operator/filter', 'preact'], factory) :
	(global.barbarojs-stream = factory(global.rxjs_Subject,global.rxjs_add_operator_filter,global.preact));
}(this, (function (rxjs_Subject,rxjs_add_operator_filter,preact) { 'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Stream
 * {id: 'componentId', data: {id: 'dataId', mykey: 1}}
 */

var Stream$2 = function (_Subject) {
	_inherits(Stream, _Subject);

	function Stream() {
		_classCallCheck(this, Stream);

		return _possibleConstructorReturn(this, _Subject.apply(this, arguments));
	}

	Stream.prototype.filterById = function filterById(id, dataId) {
		return this.filter(function (data) {
			return dataId ? data.id === id && data.data.id === dataId : data.id === id;
		});
	};

	Stream.prototype.filterByIds = function filterByIds(ids) {
		return this.filter(function (data) {
			return ids.includes(data.id);
		});
	};

	return Stream;
}(rxjs_Subject.Subject);

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StreamManager = function () {
	function StreamManager() {
		_classCallCheck$2(this, StreamManager);

		this.subs = [];
	}

	StreamManager.prototype.add = function add(x) {
		this.subs.push(x);
	};

	StreamManager.prototype.dispatch = function dispatch(channel, actions) {
		var actionKeys = Object.keys(actions);
		var dispatcher = channel.filter(function (x) {
			return actionKeys.includes(x.id);
		}).subscribe(function (x) {
			return actions[x.id](x.data);
		});

		this.subs.push(dispatcher);
	};

	StreamManager.prototype.destroy = function destroy() {
		this.subs.map(function (x) {
			return x.unsubscribe();
		});
		this.subs = [];
	};

	return StreamManager;
}();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StreamComponent = function (_Component) {
	_inherits$1(StreamComponent, _Component);

	function StreamComponent(props) {
		_classCallCheck$1(this, StreamComponent);

		// this holds stream constant
		var _this = _possibleConstructorReturn$1(this, _Component.call(this, props));

		_this.streams = props.streams;
		// this is the stream manager
		_this.sm = new StreamManager();
		return _this;
	}

	StreamComponent.prototype.componentWillUnmount = function componentWillUnmount() {
		this.sm.destroy();
	};

	return StreamComponent;
}(preact.Component);

return Stream;

})));
//# sourceMappingURL=index.js.map
