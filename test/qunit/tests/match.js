define(['document-matcher'], function (documentMatcher) {
	'use strict';

	return function () {

		QUnit.module('Match');

		test('Match', function () {
			var person = {
				name: 'Felipe',
				hobbies: ['sleep', 'skate'],
				age: 24,
				job: 'artist'
			};


			var isAnArtist = documentMatcher({
				job: 'artist'
			}, 'identical compariton');

			ok(isAnArtist(person));

			var likesToSleep = documentMatcher({
				hobbies: 'sleep'
			}, 'match against array');

			ok(likesToSleep(person));

			var nameStartsWithFe = documentMatcher({
				name: /^Fe/
			}, 'regexp matching');
		});

	}
});
