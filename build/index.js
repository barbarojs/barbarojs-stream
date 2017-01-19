'use strict';

exports.__esModule = true;
exports.StreamManager = exports.StreamComponent = exports.Stream = undefined;

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _streamComponent = require('./stream-component');

var _streamComponent2 = _interopRequireDefault(_streamComponent);

var _streamManager = require('./stream-manager');

var _streamManager2 = _interopRequireDefault(_streamManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Stream = _stream2.default;
exports.StreamComponent = _streamComponent2.default;
exports.StreamManager = _streamManager2.default;
'use strict';

exports.__esModule = true;
exports.default = undefined;

var _preact = require('preact');

var _streamManager = require('./stream-manager');

var _streamManager2 = _interopRequireDefault(_streamManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StreamComponent = function (_Component) {
	_inherits(StreamComponent, _Component);

	function StreamComponent(props) {
		_classCallCheck(this, StreamComponent);

		// this holds stream constant
		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.streams = props.streams;
		// this is the stream manager
		_this.sm = new _streamManager2.default();
		return _this;
	}

	StreamComponent.prototype.componentWillUnmount = function componentWillUnmount() {
		this.sm.destroy();
	};

	return StreamComponent;
}(_preact.Component);

exports.default = StreamComponent;
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StreamManager = function () {
	function StreamManager() {
		_classCallCheck(this, StreamManager);

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

exports.default = StreamManager;
'use strict';

exports.__esModule = true;
exports.default = undefined;

var _Subject2 = require('rxjs/Subject');

require('rxjs/add/operator/filter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Stream
 * {id: 'componentId', data: {id: 'dataId', mykey: 1}}
 */
var Stream = function (_Subject) {
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
}(_Subject2.Subject);

exports.default = Stream;