define(['document-matcher'], function (documentMatcher) {
	'use strict';

	return function () {

		QUnit.module('Deep');

		test('Deep', function () {
			var person = {
				mother: {
					name: 'Ana',
					age: 40
				}
			};

			var whoseMotherIsAna = documentMatcher({
				'mother.name': 'Ana'
			});

			ok(whoseMotherIsAna(person));

			var whoseMotherIsYoungerThan40 = documentMatcher({
				'mother.age': { $lt: 40 }
			});

			ok(!whoseMotherIsYoungerThan40(person));
		});

	}
});
