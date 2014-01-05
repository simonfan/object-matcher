/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		containers = require('containers');

	/**
	 * @method $in
	 * @param expected {Array}
	 * @param value {String|Number|Array}
	 *     Array: returns `true` if any of the values is in `expected`.
	 */
	exports.$in = function $in(expected, value) {
		return _.isArray(value) ?
			containers.containsAny(expected, value) : _.contains(expected, value);
	};

	/**
	 * @method $nin
	 * @param expected {Array}
	 * @param value {String|Number|Array}
	 *     Array: returns `true` if any of the values is not in `expected`.
	 */
	exports.$nin = function $nin(expected, value) {
		return _.isArray(value) ?
			!containers.containsAny(expected, value) : !_.contains(expected, value);
	};

	/**
	 * @method $all
	 * @param expected {Array}
	 * @param value {Array}
	 */
	exports.$all = function $all(expected, value) {
		return containers.containsAll(value, expected);
	};
});
