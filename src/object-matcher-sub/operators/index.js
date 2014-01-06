/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		deep = require('deep'),
		containers = require('containers');

	_.extend(
		exports,
		require('./match'),
		require('./range'),
		require('./set'),
		require('./boolean')
	);

	/**
	 * Evaluates a value against criterion
	 *
	 * @method evaluateValue
	 * @param value {Any}
	 * @param criterion {String|Number|RegExp|Object}
	 *     String|Number|RegExp : simple comparison
	 *     Object               : loop through multiple criteria.
	 */
	exports.evaluateValue = function evaluateValue(criterion, value) {

		if (_.isObject(criterion) && !_.isRegExp(criterion)) {
			// Criterion is actually a group of criteria
			// that should be applied simultaneously to
			// the value. All must be satisfied.
			return _.every(criterion, function (expected, operator) {
				return exports[operator](expected, value);
			});

		} else {
			// Criterion is a single criterion.
			return exports.$match(criterion, value);
		}
	};
});
