//     document-matcher
//     (c) Simon Fan
//     document-matcher is licensed under the MIT terms.

/**
 * Curry functions to match documents against a set of criteria
 * inspired on mongoDb's query language.
 *
 * @module document-matcher
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(['underscore.deep', 'underscore.contains', 'underscore'],
	function (UnderscoreDeep, UnderscoreContains, _) {
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
			_.containsAny(expected, value) :
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
			!_.containsAny(expected, value) :
			!_.contains(expected, value);
	}

	/**
	 * @method $all
	 * @param expected {Array}
	 * @param value {Array}
	 */
	function $all(expected, value) {
		return _.containsAll(value, expected);
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

	/**
	 * Evaluates a document against a set of criteria.
	 *
	 * @method evaluateDocument
	 * @param document {Object}
	 * @param criteria {Object}
	 */
	function evaluateDocument(criteria, document) {
		// loop through criteria
		return _.every(criteria, function (criterion, attribute) {

			var value = _.deep(document, attribute);

			return evaluateValue(criterion, value);
		});
	}

	/**
	 * Returns a function that compares documents according to a specific criteria.
	 *
	 * @method documentMatcher
	 * @param criteria {Object}
	 */
	function documentMatcher(criteria) {
		criteria = criteria || {};
		return _.partial(evaluateDocument, criteria);
	}

	documentMatcher.evaluateValue = evaluateValue;
	documentMatcher.evaluateDocument = evaluateDocument;

	return documentMatcher;
});
