'use strict';

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

var documentMatcher = require('../../src/document-matcher');

exports.Set = {
	setUp: function (done) {

		process.person = {
			name: 'Lucie',
			age: 25,
			languages: ['french','english','portuguese','spanish'],
			nationality: 'France',
			interests: ['art','music']
		};



		done();
	},

	// tests:
	$in: function (test) {
		var person = process.person;

		var speaksEitherFrenchOrSpanish = documentMatcher({
			languages: { $in: ['french', 'spanish'] }
		});

		test.ok(speaksEitherFrenchOrSpanish(person));

		var isFromPortugalOrIndonesia = documentMatcher({
			nationality: { $in: ['Portugal', 'Indonesia'] }
		});

		test.ok(!isFromPortugalOrIndonesia(person));

		var isFromFranceOrArgentina = documentMatcher({
			nationality: { $in: ['Argentina', 'France'] }
		});

		test.ok(isFromFranceOrArgentina(person));

		test.done();
	},

	$nin: function (test) {
		var person = process.person;

		var isNeitherFromBrazilNorFromRussia = documentMatcher({
			nationality: { $nin: ['Brazil', 'Russia'] }
		});

		test.ok(isNeitherFromBrazilNorFromRussia(person));

		var doesNotLikeSports = documentMatcher({
			interests: { $nin: ['sports'] }
		});

		test.ok(doesNotLikeSports(person));

		test.done();
	},

	$all: function (test) {
		var person = process.person;

		var likesArtAndMusic = documentMatcher({
			interests: { $all: ['art', 'music'] }
		});

		test.ok(likesArtAndMusic(person));

		var likesArtMusicAndTech = documentMatcher({
			interests: { $all: ['art', 'music', 'tech']}
		});

		test.ok(!likesArtMusicAndTech(person));

		test.done();
	},
};
