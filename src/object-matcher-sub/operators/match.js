/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * @class operators
	 * @static
	 */

	/**
	 * Effectively does the matching against a single value
	 * @method $matchSingle
	 * @param expected {String|Number|RegExp}
	 *    String|Number: expected === value
	 *    RegExp: expected.match
	 * @param value {String|Number|Boolean}
	 *    Cannot be Array!
	 * @return {Boolean} True if matches, false if not.
	 */
	exports.$matchSingle = function $matchSingle(expected, value) {
		return _.isRegExp(expected) ? expected.test(value) : expected === value;
	};

	/**
	 * Verify if `value` supplied attends the `expected`.
	 * Behaves according to the type of `expected`. See {{#crossLink 'MongoQueryOperators/$matchSingle:method'}}{{/crossLink}}.
	 * If `value` is an array of values, returns true if ANY of the
	 * values attends the `expected`.
	 *
	 * @method $match
	 * @param expected {String|Number|RegExp}
	 * @param value {String|Number|Boolean|Array}
	 * @return {Boolean} True if matches, false if not.
	 */
	exports.$match = function $match(expected, value) {
		return _.isArray(value) ?
			_.any(value, function (v) {
				return exports.$matchSingle(expected, v);
			})
			:
			exports.$matchSingle(expected, value);
	};
});
