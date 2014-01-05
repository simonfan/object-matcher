/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	/**
	 * Lesser than (<).
	 * @method $lt
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	exports.$lt = function $lt(expected, value) {
		return value < expected;
	};

	/**
	 * Lesser than or equal (<=).
	 * @method $lte
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	exports.$lte = function $lte(expected, value) {
		return value <= expected;
	};

	/**
	 * Greater than (>).
	 * @method $gt
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	exports.$gt = function $gt(expected, value) {
		return value > expected;
	};

	/**
	 * Greater than or equal (>=).
	 * @method $gte
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	exports.$gte = function $gte(expected, value) {
		return value >= expected;
	};
});
