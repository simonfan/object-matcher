/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	/**
	 * @method $e
	 */
	exports.$e = function $e(expected, value) {

	};

	/**
	 * @method $ne
	 */
	exports.$ne = function $ne(expected, value) {
	//	return !$match(expected, value);
	};

	/**
	 * @method $not
	 */
	exports.$not = function $not() {};

	/**
	 * @method $or
	 */
	exports.$or = function $or() {};

	/**
	 * @method $and
	 */
	exports.$and = function $and() {};

	/**
	 * @method $exists
	 */
	exports.$exists = function $exists() {};
});
