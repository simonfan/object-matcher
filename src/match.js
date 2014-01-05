/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		deep = require('deep'),
		operators = require('./operators/index');


	var numeral = /[0-9]+/;

	var matchAny = function matchAny(criterion, objects, keys) {
		return _.any(objects, function (obj) {
			return match(criterion, obj, keys);
		});
	};

	var match = module.exports = function match(criterion, object, keys) {
		var walker = deep.walker(object, keys);

		// initialize res to undefined value
		var res;

		while (walker.hasNext()) {

			var curr = walker.next();

			if (walker.hasNext()) {
				// still not at the end.

				if (_.isArray(curr) && !numeral.test(walker.nextStep())) {
					// if the current value is an array,
					// AND
					// the next key is NOT a number
					res = matchAny(criterion, curr, walker.remainingSteps());

					break;

				} else {
					// otherwise, just keep looping
					continue;
				}

			} else {
				// at the end
				res = operators.evaluateValue(criterion, curr);

				break;
			}
		}

		return res;
	};
});









/*

BEFORE deep.walker

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