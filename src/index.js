//     ObjectMatcher
//     (c) simonfan
//     ObjectMatcher is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module ObjectMatcher
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(["lodash", "deep", "containers"], function (_, deep, containers) {
	'use strict';

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
	function $matchSingle(expected, value) {
		return _.isRegExp(expected) ? expected.test(value) : expected === value;
	}

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
	function $match(expected, value) {
		return _.isArray(value) ? _.any(value, function (v) { return $matchSingle(expected, v); }) : $matchSingle(expected, value);
	}

	/**
	 * Lesser than (<).
	 * @method $lt
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	function $lt(expected, value) {
		return value < expected;
	}

	/**
	 * Lesser than or equal (<=).
	 * @method $lte
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	function $lte(expected, value) {
		return value <= expected;
	}

	/**
	 * Greater than (>).
	 * @method $gt
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	function $gt(expected, value) {
		return value > expected;
	}

	/**
	 * Greater than or equal (>=).
	 * @method $gte
	 * @param expected {Number|String}
	 * @param value {Number|String}
	 */
	function $gte(expected, value) {
		return value >= expected;
	}

	/**
	 * @method $in
	 * @param expected {Array}
	 * @param value {String|Number|Array}
	 *     Array: returns `true` if any of the values is in `expected`.
	 */
	function $in(expected, value) {
		return _.isArray(value) ?
			containers.containsAny(expected, value) :
			_.contains(expected, value);
	}

	/**
	 * @method $nin
	 * @param expected {Array}
	 * @param value {String|Number|Array}
	 *     Array: returns `true` if any of the values is not in `expected`.
	 */
	function $nin(expected, value) {
		return _.isArray(value) ?
			!containers.containsAny(expected, value) :
			!_.contains(expected, value);
	}

	/**
	 * @method $all
	 * @param expected {Array}
	 * @param value {Array}
	 */
	function $all(expected, value) {
		return containers.containsAll(value, expected);
	}

	/**
	 * @method $e
	 */
	function $e(expected, value) {

	}

	/**
	 * @method $ne
	 */
	function $ne(expected, value) {
		return !$match(expected, value);
	}

	/**
	 * @method $not
	 */
	function $not() {}

	/**
	 * @method $or
	 */
	function $or() {}

	/**
	 * @method $and
	 */
	function $and() {}

	/**
	 * @method $exists
	 */
	function $exists() {}

	/**
	 * @method $where
	 */
	function $where() {}

	var __operators = {
		$matchSingle: $matchSingle,
		$match: $match,

		$lt: $lt,
		$lte: $lte,
		$gt: $gt,
		$gte: $gte,
		//

		$in: $in,
		$nin: $nin,
		$all: $all,

		$e: $e,
		$ne: $ne,
		$or: $or,
		$and: $and,
		$exists: $exists,

		$where: $where
	};

	/**
	 * @class evaluators
	 * @static
	 */

	/**
	 * Evaluates a value against criterion
	 *
	 * @method evaluateValue
	 * @param value {Any}
	 * @param criterion {String|Number|RegExp|Object}
	 *     String|Number|RegExp : simple comparison
	 *     Object               : loop through multiple criteria.
	 */
	function evaluateValue(criterion, value) {

		if (_.isObject(criterion) && !_.isRegExp(criterion)) {
			// Criterion is actually a group of criteria
			// that should be applied simultaneously to
			// the value. All must be satisfied.
			return _.every(criterion, function (expected, operator) {
				return __operators[operator](expected, value);
			});

		} else {
			// Criterion is a single criterion.
			return __operators.$match(criterion, value);
		}
	}

	function ___matchAny(criterion, objects, keys) {
		return _.any(objects, function (obj) {
			return ___match(criterion, obj, keys);
		});
	}

	function ___match(criterion, object, keys) {
		var walker = deep.walker(object, keys);

		// initialize res to undefined value
		var res;

		while (walker.hasNext()) {

			var curr = walker.next();

			if (walker.hasNext()) {
				// still not at the end.

				if (_.isArray(curr) && !/[0-9]+/.test(walker.nextStep())) {
					// if the current value is an array,
					// AND
					// the next key is NOT a number
					res = ___matchAny(criterion, curr, walker.remainingSteps());

					break;

				} else {
					// otherwise, just keep looping
					continue;
				}

			} else {
				// at the end
				res = evaluateValue(criterion, curr);

				break;
			}
		}

		return res;
	}

/*
	function match(criterion, object, keys) {

		// [1] parse keys
		keys = _.isArray(keys) ? keys : deep.parseKeys(keys);

		var lastKeyIndex = keys.length - 1;


		// [2] define a response object
		var res = false;

		// [3] define a var to hold current object (for walking)
		var curr = object;

		// [4] walk over object
		_.every(keys, function (key, index) {

			// get the current value
			curr = curr[key];

			// reached the end

			if (index === lastKeyIndex) {
				// set a response
				res = evaluateValue(criterion, curr);

				// and return false to break the loop
				return false;

			} else {

				// get next key
				var nextKey = keys[index + 1];

				if (_.isArray(curr) && !numberMatcher.test(nextKey)) {
					// if the current value is an array,
					// AND
					// the next key is NOT a number
					res = _.any(curr, function (obj) {
						return match(criterion, obj, _.rest(keys, index + 1));
					});

					// break loop
					return false;

				} else {
					// otherwise, just keep walking
					// keep loop
					return true;
				}
			}

		});

		return res;
	}
*/
	/**
	 * Evaluates a document against a set of criteria.
	 *
	 * @method evaluateObject
	 * @param document {Object}
	 * @param criteria {Object}
	 */
	function evaluateObject(criteria, object) {
		// loop through criteria
		return _.every(criteria, function (criterion, keys) {

			return ___match(criterion, object, keys);
		});
	}

	/**
	 * Returns a function that compares documents according to a specific criteria.
	 *
	 * @method objectMatcher
	 * @param criteria {Object}
	 */
	function objectMatcher(criteria) {
		criteria = criteria || {};

		// create a function
		var func = _.partial(evaluateObject, criteria);

		func.filter = function filter(arr) {
			_.filter(arr, func);
		};

		return func;
	}

	return objectMatcher;
});
